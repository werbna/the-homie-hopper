const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');
const isSignedIn = require('./middleware/is-signed-in');
const passUserToView = require('./middleware/pass-user-to-view');
const userController = require('./controllers/user');
const shelterController = require('./controllers/shelter');
const animalsController = require('./controllers/animal');
const User = require('./models/user');

app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', async (req, res) => {
  try {
    let user = null;
    let favoritedAnimals = [];
    if (req.session.user) {
      user = await User.findById(req.session.user._id).populate('favorited');
      favoritedAnimals = user.favorited;
    }
    res.render('index', { user, favoritedAnimals });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

app.use(passUserToView);
app.use('/users', userController);
app.use(isSignedIn);
app.use('/shelters', shelterController);
app.use('/animals', animalsController);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
