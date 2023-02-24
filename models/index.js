

// Table data model associations
//
const User = require("./User");  // for the "User" table data model association
//const Category = require("./Category");  // for the "Category" table data model association
const Blog = require("./Blog");  // for the "Blog" table data model association
const Blog_Comment = require("./Blog_Comment");  // for the "Blog_Comment" table data model association


// "User" data/table relationships:

// for the one-to-many relationship with the "Blog" table
User.hasMany(Blog, {
  foreignKey: "author_id"
});
  
// for the one-to-many relationship with the "Blog_Comment" table
User.hasMany(Blog_Comment, {
  foreignKey: "author_id"
});


// "Category" data/table relationships:

// for the one-to-many relationship with the "Blog" table
//Category.hasMany(Blog, { 
//  foreignKey: "category_id"
//});


// "Blog" data/table relationships:

// for the many-to-one relationship with the "Category" table
//Blog.belongsTo(Category, { 
//  foreignKey: "category_id", 
//});

// for the one-to-many relationship with the "User" table
Blog.belongsTo(User, {
  foreignKey: "author_id"
});

// for the one-to-many relationship with the "Blog_Comment" table
Blog.hasMany(Blog_Comment, { 
  foreignKey: "blog_id"
});


// "Blog Comment" data/table relationships:

// for the many-to-one relationship with the "User" table
Blog_Comment.belongsTo(User, {
  foreignKey: "author_id"
});


// data models exports

module.exports = { User, Blog, Blog_Comment };  // Category

