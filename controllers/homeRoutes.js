

const router = require("express").Router();
//const authenticate = require("../utils/Authenticate");
const User = require("../models/User");
const Category = require("../models/Category");
const Blog = require("../models/Blog");
const Blog_Comment = require("../models/Blog_Comment");
// router.use("/", homeRoutes);
const { Sequelize, Op } = require("sequelize");


router.get("/", async (req, res) => {
try {
  res.render("homepage", {      
    loggedIn: req.session.loggedIn, 
    //
    loggedOnUserEmailAddress: req.session.loggedOnUserEmailAddress, 
    loggedOnUserID: req.session.loggedOnUserID, 
    loggedOnUserFirstName: req.session.loggedOnUserFirstName, 
    loggedOnUserLastName: req.session.loggedOnUserLastName, 
    loggedOnUserFullName: req.session.loggedOnUserFullName, 
    //
  });
} 
catch(err) {
  res.status(500).json({"message": "A logon process error occurred. Try again or contact Tech Support."});
  return;
}
});


// GET all blog main entire records for the public gallery display without including comments.
router.get("/blog", async (req, res) => {
try {
  const blogData = await Blog.findAll({
    //include: {model: Blog, attributes: ["id", "title", "blog_message", "blog_author", "post_date"]},  
  });
  if (blogData) { 
    const blogs = blogData.map((blog) => blog.get({plain: true}));
    //console.log(JSON.parse(blogs));
    //console.table(blogs);
    res.render("blog-gallery", {blogs});
  }
  else {
    res.status(400).json({"message": "There are not any records that match the selected search criteria."});
    return;
  }
} 
catch(err) {
  res.status(500).json(err);
}
});


// GET all blog IDs for gallery display.
router.get("/blog/gallery/id", async (req, res) => {
try {
  const blogData = await Blog.findAll();
  if (blogData) {
    const blogs = blogData.map((blog) => blog.get({plain: true}));
    //console.log(JSON.parse(blogs));
    //console.table(blogs);
    res.render("blog-id-gallery", {blogs});
  }
  else {
    res.status(400).json({"message": "There are not any records that match the selected search criteria."});
    return;
  }
}
catch(err) {
  res.status(500).json(err);
  return;
}
});


// GET a blog record by specific blog ID for detail display and get any associated comments.
router.get("/blog/detail/:id", async (req, res) => {
try {
  //console.log("blog ID: " + req.params.id);
  //const blogData = await Blog.findByPk(req.params.id);
  const blogData = await Blog.findOne({
    where: {id: req.params.id},
    include: User
  });
  //console.log("User ID: " + blogData.id + "; " + blogData.user.first_name + " " + blogData.user.last_name);
  const blogCommentData = await Blog_Comment.findAll({
    where: {blog_id: req.params.id}, 
    include: User
  });
  let blogComments;
  let blogDetail;
  if (blogData) {
    const blog = blogData.get({plain: true});
    //console.log(blog);
    if (blogCommentData) {
      //console.table(blogCommentData);
      //console.log(blogCommentData[0]);
      if ((blogCommentData[0] != undefined)  && (blogCommentData.length > 0)) {
        blogComments = blogCommentData.map((blogComment) => blogComment.get({plain: true}));
      }
      else {
        blogComments = "";  // "There currently are not any comments for the selected blog."
      }
      //console.log(blogComments);
      //console.table(blogComments);
    }
    else {
      blogComments = "";  // "There currently are not any comments for the selected blog."
      //console.table(blogComments);
    }
    blogDetail = Object.assign({blogComments}, {blog})
    //console.table(blogDetail);
    res.render("blog-detail", {blogDetail});
  } 
  else {
    res.status(400).redirect("/blog/gallery/id");
    //res.status(400);
    //res.status(400).json({"message": "There are not any records that match the selected search criteria."});
    return;
  }
}
catch(err) {
  res.status(500).json(err);
  return;
}
});


// GET all blog records by specific user ID for dashboard display and get any current comments (if any) of the user.
router.get("/blog/dashboard/:id", async (req, res) => {
try {
  //console.log("author ID: " + req.params.id);
  const blogData = await Blog.findAll({
    where: {author_id: req.params.id}
  });
  const blogCommentData = await Blog_Comment.findAll({
    where: {author_id: req.params.id}
  });
  //console.table(blogData);
  let blogs;
  let blogComments;
  let blogDetail;
  if (blogData) {
    if ((blogData[0] != undefined)  && (blogData.length > 0)) {
      blogs = blogData.map((blog) => blog.get({plain: true}));
      //console.table(blogs);
    }
    else {
      blogs = "";  // "There currently are not any blog records for the selected user ID."
    }
  }
  else {
    res.status(400).json({"message": "There are not any records that match the selected search criteria."});
    return;
  }
  if (blogCommentData) {
    //console.table(blogCommentData);
    //console.log(blogCommentData[0]);
    if ((blogCommentData[0] != undefined)  && (blogCommentData.length > 0)) {
      blogComments = blogCommentData.map((blogComment) => blogComment.get({plain: true}));
    }
    else {
      blogComments = "";  // "There currently are not any comments for the selected blog."
    }
    //console.log(blogComments);
    //console.table(blogComments);
  }
  else {
    blogComments = "";  // "There currently are not any comments for the selected blog.""
    //console.table(blogComments);
  }
  blogDetail = Object.assign({blogComments}, {blogs})
  //console.table(blogDetail);
  res.render("blog-dashboard", {blogDetail});
}
catch(err) {
  res.status(500).json(err);
  return;
}
});


// GET a blog record by specific blog ID for detail display.
router.get("/blog/id/:id", async (req, res) => {
try {
  const blogData = await Blog.findOne({
    where: {id: req.params.id}
    //include: [{model: Blog, attributes: ["id", "title", "blog_message", "blog_author", "post_date"]},  
  });
  if (blogData) { 
    const blogs = blogData.map((blog) => blog.get({plain: true}));
    //console.log(blogs);
    //console.table(blogs);
    res.render("blog-detail", {blogs}); 
  }
  else {
    res.status(400).json({"message": "There are not any records that match the selected search criteria."});
    return;
  }
}
catch(err) {
  res.status(500).json(err);
  return;
}
});


// GET all blog author records for gallery display.
router.get("/blog/author/id", async (req, res) => {
try {
  const userData = await User.findAll();
  //console.table(userData);
  if (userData) { 
    const users = userData.map((user) => user.get({plain: true}));
    //console.log(JSON.parse(users));
    //console.table(users);
    res.render("author-gallery", {users});
  }
  else {
    res.status(400).json({"message": "There are not any records that match the selected search criteria."});
    return;
  }
} 
catch(err) {
  res.status(500).json(err);
  return;
}
});


// GET all blog main records for a specific user ID for gallery display.
router.get("/blog/user/:id", async (req, res) => {
//console.log(req.params.id);
try {
  const blogData = await Blog.findAll({
    //attributes: ["id", "title", "message_text", "author_id", "post_date"],
    where: {author_id: req.params.id},  
    //include: [{model: Blog_Comment}]
    //{model: Blog_Comment, attributes: ["blog_comment", "comment_post_date"]}
  });
  if (blogData) {
    const blogs = blogData.map((blog) => blog.get({plain: true}));
    //console.log(JSON.parse(blogs));
    //const blogComments = blogs.comment((blogComment) => JSON.parse(blogComment.get({plain: true})));
    //console.table(blogs);
    //console.table(blogComments);
    res.render("blog-gallery", {blogs});
  }
  else {
    res.status(400).json({"message": "There are not any records that match the selected search criteria."});
    return;
  }
} 
catch(err) {
  res.status(500).json(err);
  return;
}
});


// GET a blog record by specific blog ID for gallery display and get any associated comments. 
router.get("/blog/comment/:id", async (req, res) => {
try {
  const blogData = await Blog.findAll({
    //attributes: [""], 
    where: {id: req.params.blog_id}, 
    include: [{model: Blog_Comment, where: {author_id: req.params.author_id}}]
  });
  if (blogData) {
    const blogs = blogData.map((blog) => blog.get({plain: true}));
    //const blogs = blogData.get({plain: true});
    res.render("blog-gallery", {blogs});
    //res.status(200).json(blogs);
  } 
  else {
    res.status(400).json({"message": "There are not any records that match the selected search criteria."});
    return;
  }
} 
catch(err) {
  res.status(500).json(err);
  return;
}
});


// GET all blog title records for gallery display. 
router.get("/blog/title", async (req, res) => {
try {
  const blogData = await Blog.findAll();
  if (blogData) {
    const blogs = blogData.map((blog) => blog.get({plain: true}));
    //const blogs = blogData.get({plain: true});
    res.render("title-gallery", {blogs});
    //res.status(200).json(blogs);
  } 
  else {
    res.status(400).json({"message": "There are not any records that match the selected search criteria."});
    return;
  }
}
catch(err) {
  res.status(500).json(err);
  return;
}
});


// GET all blog record[s] by a specific blog title text keyword/phrase for gallery display. 
router.get("/blog/title/:search_string", async (req, res) => {
try {
  //console.log(req.params.search_string);
  const blogData = await Blog.findAll({
    where: {title: {[Op.substring]: `%${req.params.search_string}%`}}  // `${req.params.search_string}`}}
    // where: {title: { [Op.like]: `%${req.params.search_string}%`}}
    // [Op.like]: `%${<string>}%`  // For case sensitive searching
  });
  if (blogData) {
    const blogs = blogData.map((blog) => blog.get({plain: true}));
    //console.table(blogs);
    //const blogs = blogData.get({plain: true});
    res.render("title-gallery", {blogs});
    //res.status(200).json(blogs);
  } 
  else {
    res.status(400).json({"message": "There are not any records that match the selected search criteria."});
    return;
  }
}
catch(err) {
  res.status(500).json(err);
  return;
}
});


// GET a blog record by specific ID for the update detail display without including comments.
// Respond the data without rendering a new image of a webpage.
router.get("/blog/update/message/:id", async (req, res) => {
try {
  //console.log("!!!! current record detail fetch: " + req.params.id);
  const blogData = await Blog.findOne({
    //include: {model: Blog, attributes: ["id", "title", "blog_message", "blog_author", "post_date"]},  
    where: {id: req.params.id}
  });
  if (blogData) { 
    const blog = blogData.get({plain: true});  // blogData.map((blog) => blog.get({plain: true}));
    //console.log(JSON.parse(blogs));
    //console.table(blogs);
    res.status(200).json(blog);
    return;
  }
  else {
    res.status(400).json({"message": "There are not any records that match the selected search criteria."});
    return;
  }
} 
catch(err) {
  res.status(500).json(err);
}
});
  
  
// GET a comment record by specific ID for the update detail display.
// Respond the data without rendering a new image of a webpage.
router.get("/blog/update/comment/:id", async (req, res) => {
try {
  //console.log("!!!! current record detail fetch: " + req.params.id);
  const commentData = await Blog_Comment.findOne({
    //include: {model: Blog, attributes: ["id", "title", "blog_message", "blog_author", "post_date"]},  
    where: {id: req.params.id}
  });
  if (commentData) { 
    const comment = commentData.get({plain: true});  // commentData.map((comment) => comment.get({plain: true}));
    //console.log(JSON.parse(comments));
    //console.table(comments);
    res.status(200).json(comment);
    return;
  }
  else {
    res.status(400).json({"message": "There are not any records that match the selected search criteria."});
    return;
  }
} 
catch(err) {
  res.status(500).json(err);
}
});


router.get("/logon", async (req, res) => {  // handled through the API user route
try {
  res.render("logon");
  return;
}
catch {
  res.status(500).json(err);
  return;
}
});


router.get("/logoff", async (req, res) => { 
try {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).end();
      //res.status(204).end();
    });
    res.render("logoff", {layout: false});  // for the desired page style and content display without glitches
    //res.redirect("/");
    //res.render("logoff", {layout: "index"});
    //res.render("logoff");
    //redirect("/logoff");
    return;
  } 
  else {
    res.status(404).end();
    return;
  }
}
catch(err) {
  res.status(500).json(err);
  return;
}
});


router.get("/signup", async (req, res) => { 
try {
  res.render("signup");
  return;
}
catch(err) {
  res.status(500).json(err);
  return;
}
});


module.exports = router;

