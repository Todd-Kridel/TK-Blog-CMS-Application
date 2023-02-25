

const seedUser = require("./user-seed"); 
const seedCategory = require("./category-seed"); 
const seedBlog = require("./blog-seed"); 
const seedBlogComment = require("./blog-comment-seed"); 

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({force: true});
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUser();
  console.log("\n----- USERS SEEDED -----\n");
 
  //await seedCategory();
  //console.log("\n----- CATEGORIES SEEDED -----\n");
  
  await seedBlog();
  console.log("\n----- BLOGS SEEDED -----\n");

  await seedBlogComment();
  console.log("\n----- BLOG COMMENTS SEEDED -----\n");
  
  process.exit(0); 
}

seedAll();


// HEROKU DATABASE: heroku run node ./seeds/index.js

