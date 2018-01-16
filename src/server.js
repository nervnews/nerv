require("env2")("./config.env");
const router = require('./router');
const logger = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./views/helpers/index');
const express = require("express");
const bodyParser = require("body-parser");
const os = require("os");
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
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

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(router);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Internal Server Error");
});

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(
    `We are listening now at http://${
      process.env.HOST ? process.env.HOST : "localhost"
    }:${app.get("port")}`
  );
});
