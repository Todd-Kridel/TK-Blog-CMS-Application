

const authenticate = (req, res, next) => {
  // If the user is not logged-in and having "loggedIn" status...then redirect the user to the logon page. 
  // The "loggedIn" status is established during the logon process and put on-record in the session system
  // components of the application.
  if (!req.session.loggedIn) {
    res.redirect('/logon');
  } else {
    // If the user is logged-in...then execute the route function that is at the next position in the call 
    // stack of the computer; with that next-position function being called through the usage of the "next" 
    // Express/Node function call of the application.
    next();
  }
};


module.exports = authenticate;

