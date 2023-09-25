const Notification = require('../models/Notification');
const Course = require('../models/Course');
const CourseStatus = require('../models/CourseStatus');
const cron = require('node-cron');

const startCourses = cron.schedule('0 0 0 * * *', async () => {
    const dateCurrent = new Date();

    try {
        const courseStatusCreated = await CourseStatus.findOne({
            name: 'Created',
        });
        const courseStatusRunning = await CourseStatus.findOne({
            name: 'Running',
        });

        const coursesStarted = await Course.find({
            date_start: {
                $lte: dateCurrent
            },
            status: courseStatusCreated,
        });

        if (coursesStarted.length === 0) {
            return null;
        }

        const coursesUpdated = await Course.updateMany(
            {
                date_start: {
                    $lte: dateCurrent
                },
                status: courseStatusCreated,
            },
            {
                $set: {
                    status: courseStatusRunning._id,
                },
            },
        );

        coursesStarted.forEach(async (course) => {
            const courseData = {
                _id: course._id,
                name: course.name,
                date_start: course.date_start,
            };

            const notificationData = {
                element: 'course',
                item: courseData,
                text: 'The course has started!',
                type: 'success',
                viewed: false,
            };

            const notification = new Notification(notificationData);
            const notificationSaved = await notification.save();
        });
    } catch (err) {
        console.log(err);
    }
});

const endCourses = cron.schedule('0 0 0 * * *', async () => {
    const dateCurrent = new Date();

    try {
        const courseStatusEnded = await CourseStatus.findOne({
            name: 'Ended',
        });
        const courseStatusRunning = await CourseStatus.findOne({
            name: 'Running',
        });

        const coursesEnded = await Course.find({
            date_end: {
                $lte: dateCurrent
            },
            status: courseStatusRunning,
        });

        if (coursesEnded.length === 0) {
            return null;
        }

        const coursesUpdated = await Course.updateMany(
            {
                date_end: {
                    $lte: dateCurrent
                },
                status: courseStatusRunning,
            },
            {
                $set: {
                    status: courseStatusEnded._id,
                },
            },
        );

        coursesEnded.forEach(async (course) => {
            const courseData = {
                _id: course._id,
                name: course.name,
                date_end: course.date_end,
            };

            const notificationData = {
                element: 'course',
                item: courseData,
                text: 'The course has ended!',
                type: 'info',
                viewed: false,
            };

            const notification = new Notification(notificationData);
            const notificationSaved = await notification.save();
        });
    } catch (err) {
        console.log(err);
    }
});