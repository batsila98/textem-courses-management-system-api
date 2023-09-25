const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();
require('./cron/students');
require('./cron/courses');
require('./cron/payments');

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/', (req, res) => {
    res.send('We are on home!');
});

const authRoute = require('./routes/auth');
app.use('/auth', authRoute);

const certificatesRoute = require('./routes/certificates');
app.use('/certificates', certificatesRoute);

const studentsRoute = require('./routes/students');
app.use('/students', studentsRoute);

const studentStatusesRoute = require('./routes/studentStatuses');
app.use('/student_statuses', studentStatusesRoute);

const coursesRoute = require('./routes/courses');
app.use('/courses', coursesRoute);

const courseStatusesRoute = require('./routes/courseStatuses');
app.use('/course_statuses', courseStatusesRoute);

const courseTeachingFormatsRoute = require('./routes/courseTeachingFormats');
app.use('/course_teaching_formats', courseTeachingFormatsRoute);

const courseTypesRoute = require('./routes/courseTypes');
app.use('/course_types', courseTypesRoute);

const gendersRoute = require('./routes/genders');
app.use('/genders', gendersRoute);

const invoicesRoute = require('./routes/invoices');
app.use('/invoices', invoicesRoute);

const invoiceTypesRoute = require('./routes/invoiceTypes');
app.use('/invoice_types', invoiceTypesRoute);

const languagesRoute = require('./routes/languages');
app.use('/languages', languagesRoute);

const logsRoute = require('./routes/logs');
app.use('/logs', logsRoute);

const notificationsRoute = require('./routes/notifications');
app.use('/notifications', notificationsRoute);

const paymentsRoute = require('./routes/payments');
app.use('/payments', paymentsRoute);

const teachersRoute = require('./routes/teachers');
app.use('/teachers', teachersRoute);

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

mongoose.connect(
    process.env.DB_CONNECTION_URL,
    () => console.log('Connected to MongoDB!')
);

app.listen(3000);