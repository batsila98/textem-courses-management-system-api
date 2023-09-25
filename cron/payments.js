const Notification = require('../models/Notification');
const Payment = require('../models/Payment');
const cron = require('node-cron');

const task = cron.schedule('0 0 0 * * *', async () => {
    try {
        const paymentsOverdue = await Payment.find({
            payment_plan: {
                $elemMatch: {
                    date_deadline: {
                        $lt: new Date(),
                    },
                    status: 'not paid',
                }
            },
        })
            .populate({ path: 'student', select: 'full_name' })
            .populate({ path: 'course', select: 'name' });

        if (paymentsOverdue.length === 0) {
            return null;
        }

        const paymentsUpdated = await Payment.updateMany(
            {
                payment_plan: {
                    $elemMatch: {
                        date_deadline: {
                            $lt: new Date(),
                        },
                        status: 'not paid',
                    }
                },
            },
            {
                $set: {
                    'payment_plan.$.status': 'overdue',
                }
            },
        );

        paymentsOverdue.forEach(async (payment) => {
            const paymentData = {
                _id: payment._id,
                student: {
                    _id: payment.student._id,
                    full_name: payment.student.full_name,
                },
                course: {
                    _id: payment.course._id,
                    name: payment.course.name,
                },
            };

            const notificationData = {
                element: 'payment',
                item: paymentData,
                text: 'The student has an overdue payment!',
                type: 'warning',
                viewed: false,
            };

            const notification = new Notification(notificationData);
            const notificationSaved = await notification.save();
        });
    } catch (err) {
        console.log(err);
    }
});
