const express = require('express');
let app = express();

var cors = require('cors');

const subscriptionsRouter = require('./routers/subscriptionsRouter');
const usersRouter = require('./routers/usersRouter');
const authRouter = require('./routers/authRouter');

require('./configs/database');
app.use(cors())

app.use(express.json())

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/subscriptions', subscriptionsRouter);

app.listen(8004);