require('env2')('./config.env');
const Strategy = require('passport-facebook').Strategy;
const router = require('./router');
const routerOauth = require('./routerOauth');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./views/helpers/index');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new Strategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://nervenews.herokuapp.com/auth/facebook/callback',
    profileFields: ['id', 'name', 'email'],
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() =>  done(null, profile));
  }
));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    helpers,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.use('/', router);
app.use('/oauth', ensureAuthenticated, routerOauth);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Internal Server Error');
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`We are listening now at http://${process.env.HOST ? process.env.HOST : 'localhost'}:${app.get('port')}`);
});
