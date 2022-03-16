const express  = require('express');
let app = express();

var cors = require('cors')

const moviesRouter = require('./routers/moviesRouter');
const membersRouter = require('./routers/membersRouter');
const subscriptionsRouter = require('./routers/subscriptionRouter');

require('./configs/database');

app.use(cors())

app.use(express.json())

app.use('/movies', moviesRouter);
app.use('/members', membersRouter);
app.use('/subscriptions', subscriptionsRouter);


app.listen(8001);
