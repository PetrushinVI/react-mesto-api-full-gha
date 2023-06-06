const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { createUser, login } = require('./controllers/users');
const { signInValidation, signUpValidation } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use(cookieParser());

const { PORT = 3000 } = process.env;

app.use(limiter);

app.use(requestLogger);

app.post('/signup', signUpValidation, createUser);
app.post('/signin', signInValidation, login);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on Port: ${PORT}`);
});
