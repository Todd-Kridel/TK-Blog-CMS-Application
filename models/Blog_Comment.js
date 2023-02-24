

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

var moment = require("moment");
moment().format();

class Blog_Comment extends Model {}

Blog_Comment.init(
{
  id: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    primaryKey: true, 
    autoIncrement: true, 
  }, 
  blog_id: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: {
      model: "blog", 
      key: "id", 
    }, 
  }, 
  comment_text: {
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
  comment_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  }, 
}, 
{
  hooks: {
    beforeCreate: async (commentData) => {
      // Access and include user ID information from the passed session data.
      // author_id: passed from session.loggedOnUserID;
      // commentData.comment_date = moment().toDate();
      //
      //console.log(commentData);
      // access user ID information from the passed session data 
      // author_id = <auto-transferred from session.loggedOnUserID>
      commentData.comment_date = moment().toDate();
      //console.log("new comment date: " + commentData.comment_date);
      //console.log(commentData);
      //
      // loggedIn: req.session.loggedIn, 
      // loggedOnUserEmailAddress: req.session.loggedOnUserEmailAddress, 
      // loggedOnUserID: req.session.loggedOnUserID, 
      // loggedOnUserFirstName: req.session.loggedOnUserFirstName, 
      // loggedOnUserLastName: req.session.loggedOnUserLastName, 
      // loggedOnUserFullName: req.session.loggedOnUserFullName, 
      //
      return commentData;
    },
  }, 
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "blog_comment",
}
);

module.exports = Blog_Comment; 

