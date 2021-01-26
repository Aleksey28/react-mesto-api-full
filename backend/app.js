const express = require('express');
const cookieParser  = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cards = require('./routes/cards');
const users = require('./routes/users');
const { createUser } = require("./controllers/users");
const { login } = require("./controllers/users");
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.user = {
    _id: '5fd3f4da730a4b61f8e0152c', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', cards);
app.use('/', users);

app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'Server was broken =('
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
