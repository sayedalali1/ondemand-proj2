const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path')

const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view.js')

const passDriverToView = require('./middleware/pass-driver-to-view.js')
const isSignedInDriver = require('./middleware/is-signed-in-driver.js')

const authRoutes = require('./controllers/auth.js');


// CONTROLLERS
const ordersCtrl = require('./controllers/orders.js')
const authController = require('./controllers/auth.js');

const port = process.env.PORT ? process.env.PORT : '3000';


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUserToView)

// LINK TO PUBLIC DIRECTORY
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/orders`)
  } else {
    res.render('index.ejs')
  }
});


app.use('/auth', authController);
app.use(isSignedIn)
app.use('/users/:userId/orders', ordersCtrl)

app.use(isSignedInDriver)
app.use('/users/:userId/orders-driver', ordersCtrl)


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

// server.js

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));

// new code below this line ---
app.use(express.static(path.join(__dirname, 'public')));
// new code above this line ---

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passDriverToView)
