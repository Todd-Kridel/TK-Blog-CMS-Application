

const router = require("express").Router();
const User = require("../../models/User");
const Blog = require("../../models/Blog");
const bcrypt = require("bcrypt"); 
//const authenticate = require("../../utils/Authenticate");  
  // for access to the "checkAuthentication" password-authentication function


// GET all users.
router.get("/",  async (req, res) => {
try {
  const userData = await User.findAll({
    include: {model: Blog}
  });
  res.status(200).json(userData);
} 
catch (err) {
  res.status(500).json(err);
}
});
  

// GET a specific user by ID.
router.get("/:id", async (req, res) => {
try {
  const userData = await User.findByPk(req.params.id, {
    include: {model: Blog}
  });
  if (!userData) {
    res.status(404).json({"message": "There is not a user record that has the specified ID."});
    return;
  }
  res.status(200).json(userData);
} 
catch (err) {
  res.status(500).json(err);
}
});


// POST-create a new user.
router.post("/create", async (req, res) => { 
  //console.log("TEST USER CREATE");
  //console.log(req.body);
try {
  const userData = await User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email_address,
    password: req.body.password  // with and auto-interface with Bcrypt in the User model/table
  });
  if (userData) {
    //console.log(userData);
    res.status(200).json(userData);
  }
  else {
    res.status(400).json(err);
  }
} 
catch (err) {
  res.status(500).json(err);
}
});


// FUTURE ENHANCEMENT: FOR UPDATING USER RECORD INFORMATION SUCH AS CHANGING A PASSWORD
// PUT-update a user.
router.put("/:id",  async (req, res) => {
try {
  const userData = await User.update(req.body, {
    where: {id: req.params.id},
  });
  if (userData) {  // [0] ?
    res.status(200).json({"message": "The selected user record was updated."});
    return;
  }
  else {
    res.status(404).json({"message": "There is not a user record that has the specified ID."});
    return;
  }
} 
catch (err) {
  res.status(500).json(err);
  return;
}
});


// FUTURE ENHANCEMENT:
// DELETE a user.
// router.delete("/:id",  async (req, res) => {
// try {
//   const userData = await User.destroy({
//     where: {id: req.params.id},
//   });
//   if (!userData) {
//     res.status(404).json({message: "There is not a user record that has the specified ID."});
//     return;
//   }
//   res.status(200).json({message: "The selected user record was deleted."});
// } 
// catch (err) {
//   res.status(500).json(err);
// }
// });


router.post("/logon", async (req, res) => {
//console.log("LOGON AUTHENTICATION: START");
let anAuthenticationErrorOccurred = false;
let userAuthentication;
try {
  anAuthenticationErrorOccurred = true;
  userAuthentication = await User.findOne({
    where: {email_address: req.body.email_address}
  });
  if (!userAuthentication) {
    anAuthenticationErrorOccurred = true;
  }
  else {
    anAuthenticationErrorOccurred = false
    const validPassword = userAuthentication.checkAuthentication(req.body.password);
    //console.log(validPassword);
    //console.log(userDb.password)
    if (!validPassword) {
      anAuthenticationErrorOccurred = true;
    }
  }
  if (anAuthenticationErrorOccurred) {
    res.status(404).json({"message": "The provided logon information is not valid. Try again or create a new user account."})
    return; 
  }
  else {
    // Create a new set of session components for the current usage session of the application...and save the current user's 
    // logon information.
    req.session.save(() => {
      //
      req.session["loggedOnUserEmailAddress"] = userAuthentication.email_address;
      req.session["loggedOnUserID"] = userAuthentication.id;
      req.session["loggedOnUserFirstName"] = userAuthentication.first_name;
      req.session["loggedOnUserLastName"] = userAuthentication.last_name;
      req.session["loggedOnUserFullName"] = userAuthentication.first_name + " " + userAuthentication.last_name;
      //
      //console.log(req.session["loggedOnUserEmailAddress"]);
      //console.log(req.session["loggedOnUserID"]);
      //console.log(req.session["loggedOnUserFirstName"]);
      //console.log(req.session["loggedOnUserLastName"]);
      //console.log(req.session["loggedOnUserFullName"]);
      //
      req.session.loggedIn = true;
      res.session = req.session;
      res.status(200).json({"message": "The logon was successful."});
    });
  }
} 
catch(err) {
  //console.log(anAuthenticationErrorOccurred);
  //if (anAuthenticationErrorOccurred) {
    //console.log("A logon processing error occurred. Please try again. If the problem persists...then contact Tech Support.");
    //res.status(404).json({message: "The provided logon information is not valid. Try again or create a new user account."})
    //return; 
  //}
  res.status(500).json(
    {message: "A logon processing error occurred. Please try again. If the problem persists...then contact Tech Support." + 
    JSON.stringify(err)});
}
});
  

// router.get("/logoff", (req, res) => {
// if (req.session.loggedIn) {
//   req.session.destroy(() => {
//     res.status(204).end();
//  });
// } 
// else {
//  res.status(404).end();
// }
// });


module.exports = router;

