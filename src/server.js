const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').config()

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test-db';

const studentRoutes = require('./routes/student_route');
const teacherRoutes = require('./routes/teacher_route');

app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB Success -- Database Connection Successfully Done!'));
connection.on('error', (err) => {
    console.log('MongoDB Error -- Connection Error: ' + err);
    process.exit();
});

app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);

app.listen(port, () => console.log(`Server is running on ${port} `));

