

const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkAuthentication(logonPassword) {
    return bcrypt.compareSync(logonPassword, this.password);
  }
}

User.init(
{
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true, 
    onDelete: "CASCADE"  // or onDelete="CASCADE" ?
  }, 
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  email_address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  }, 
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8],
      // future to-do: add/enhance more validation processing
    },
  }, 
}, 
{
  hooks: {
    beforeCreate: async (newUserData) => {
      // automatic generation of the next-available user record ID (to be stored in session information) 
      // automatic storing of user data per passed request body information
      // automatic creation-date time-stamp (to be later displayed per "moment().toDate()" function
      //
      // loggedIn: req.session.loggedIn, 
      // loggedOnUserEmailAddress: req.session.loggedOnUserEmailAddress, 
      // loggedOnUserID: req.session.loggedOnUserID, 
      // loggedOnUserFirstName: req.session.loggedOnUserFirstName, 
      // loggedOnUserLastName: req.session.loggedOnUserLastName, 
      // loggedOnUserFullName: req.session.loggedOnUserFullName, 
      //
      // Encrypt the user's specified password and store it in the user's new user record.
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
      return newUserData;
    },
    // future option capability for a user to change their password:
    // beforeUpdate: async (updatedUserData) => {
    // updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
    // return updatedUserData;
    // }  
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "user",
}
);


module.exports = User;

