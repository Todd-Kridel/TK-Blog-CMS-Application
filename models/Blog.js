

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

var moment = require("moment");
moment().format();

class Blog extends Model {}

Blog.init(
{
  id: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    primaryKey: true, 
    autoIncrement: true, 
  }, 
  title: {
    type: DataTypes.STRING, 
    allowNull: false, 
  }, 
  message_text: {
    type: DataTypes.TEXT, 
    allowNull: false, 
  }, 
  author_id: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: {
      model: "user", 
      key: "id", 
    },
  }, 
  post_date: {
    type: DataTypes.DATEONLY, 
    allowNull: true
  }
}, 
{
  hooks: {
    beforeCreate: async (blogData) => {
      //console.log(blogData);
      // access user ID information from the passed session data 
      // author_id = <auto-transferred from session.loggedOnUserID>
      blogData.post_date = moment().toDate();
      //console.log("new blog message date: " + blogData.post_date);
      //console.log(blogData);
      //
      // loggedIn: req.session.loggedIn, 
      // loggedOnUserEmailAddress: req.session.loggedOnUserEmailAddress, 
      // loggedOnUserID: req.session.loggedOnUserID, 
      // loggedOnUserFirstName: req.session.loggedOnUserFirstName, 
      // loggedOnUserLastName: req.session.loggedOnUserLastName, 
      // loggedOnUserFullName: req.session.loggedOnUserFullName, 
      //
      return blogData;
    }, 
  }, 
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "blog",
}, 
);

module.exports = Blog; 

