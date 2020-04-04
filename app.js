const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const viewRouter = require('./routes/viewRoutes');
const userRouter = require('./routes/userRoutes');
const questionRouter = require('./routes/questionRoutes');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
///////////////////////Routes
app.use('/', viewRouter);
app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/users', userRouter);


module.exports = app;