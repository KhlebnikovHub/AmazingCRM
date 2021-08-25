require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');
//session
const redis = require('redis');
const session = require('express-session');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient()

const PORT = process.env.PORT || 3000;
const app = express();

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const clientsRouter = require('./routes/clients');
const ordersRouter = require('./routes/orders');
const adminRouter = require('./routes/admin');


app.set('view engine', 'hbs');
//process.env.PWD
hbs.registerPartials(__dirname + '/views/partials');


app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/clients', clientsRouter);
app.use('/orders', ordersRouter);
app.use('/admin', adminRouter);



app.listen(PORT, ()=> {
    console.log('Server start on ', PORT)
})
