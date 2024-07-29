const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
<<<<<<< HEAD
const path = require('path')

const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view.js')

// CONTROLLERS
const ordersCtrl = require('./controllers/orders.js')
=======

>>>>>>> 5deddf55c5b9e8a1737e658408e3a128da081bf7
const authController = require('./controllers/auth.js');

const port = process.env.PORT ? process.env.PORT : '3000';

<<<<<<< HEAD

=======
>>>>>>> 5deddf55c5b9e8a1737e658408e3a128da081bf7
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

<<<<<<< HEAD
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
=======
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
>>>>>>> 5deddf55c5b9e8a1737e658408e3a128da081bf7
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
<<<<<<< HEAD
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
=======

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});

app.use('/auth', authController);
>>>>>>> 5deddf55c5b9e8a1737e658408e3a128da081bf7

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
<<<<<<< HEAD

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
=======
>>>>>>> 5deddf55c5b9e8a1737e658408e3a128da081bf7
