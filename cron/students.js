const Notification = require('../models/Notification');
const Student = require('../models/Student');
const Course = require('../models/Course');
const cron = require('node-cron');

const EndStudentCourseAccess = cron.schedule('0 0 0 * * *', async () => {
    const dateCurrent = new Date();

    try {
        const studentsWithEndedAccess = await Student.find({
            courses: {
                $elemMatch: {
                    access: true,
                    date_access_end: {
                        $lte: dateCurrent,
                    },
                },
            },
        });

        if (studentsWithEndedAccess.length === 0) {
            return null;
        }

        const studentsUpdated = await Student.updateMany(
            {
                courses: {
                    $elemMatch: {
                        access: true,
                        date_access_end: {
                            $lte: dateCurrent,
                        },
                    },
                },
            },
            {
                $set: {
                    'courses.$.access': false,
                }
            },
        );

        studentsWithEndedAccess.forEach(async (student) => {
            const studentData = {
                _id: student._id,
                full_name: student.full_name,
            };

            const coursesWithEndedAccess = student.courses.filter(course => {
                return course.date_access_end < dateCurrent && course.access === true;
            });

            coursesWithEndedAccess.forEach(async (course) => {
                const { _id, name } = await Course.findById(course.course).select('name');
                studentData.course = {
                    _id: _id,
                    name: name,
                    date_access_end: course.date_access_end,
                };

                const notificationData = {
                    element: 'student',
                    item: studentData,
                    text: 'The student has expired access to the course!',
                    type: 'info',
                    viewed: false,
                };
    
                const notification = new Notification(notificationData);
                const notificationSaved = await notification.save();
            });
        });
    }
    catch (err) {
        console.log(err);
    }
});