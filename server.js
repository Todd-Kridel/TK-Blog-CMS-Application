

// Require Express for running as a service.
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");

// Include the Express Handlebars rendering system code.
const exphbs = require("express-handlebars");

// Include helper files/code.
// const helpers = require("./utils/handlebarshelpers");

// Specify the database connection for the ORM.
const sequelize = require("./config/connection");

// Initialize the session state/system.
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");
const helpers = require('./utils/helperFunctions');

// Activate the Express middleware process.
const app = express();

// Set-up the connection port that is for the local host or the Heroku system.
const PORT = process.env.PORT || 3001;  // for Heroku JAWSDB compatibility which does not use port 3001.

// Set-up the session object.
const session_object = {
  secret: "hash my password",
  cookie: { maxAge: 1200000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Activate the session middleware systems.
app.use(session(session_object));
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
})

// Set-up and initialize the Handlebars rendering system middleware.
const hbs = exphbs.create({helpers});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Enable POST handling in Express.
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

// Enable/Activate the Routes system middleware.
app.use(routes);

// Synchronize the ORM to the application data-source and start the application server process.
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log("!!!! The Blog CMS application server is now listening. !!!!"));
});

