

const router = require("express").Router();
const Blog_Comment = require("../../models/Blog_Comment");


// GET all blog comment records.
router.get("/", async (req, res) => {
try {
  const blogCommentData = await Blog_Comment.findAll();
  if (blogCommentData) {
    res.status(200).json(blogCommentData);
    return;
  }
  else {
    res.status(404).json({"message": "There are not any records that match the selected criteria."});
    return;
  }
} 
catch(err) {
  res.status(500).json(err);
  return;
}
});


// GET a blog comment record by specific ID.
router.get("/:id", async (req, res) => {
try {
  const blogCommentData = await Blog_Comment.findByPk(req.params.id);
  if (blogCommentData){
    res.status(200).json(blogCommentData);
    return;
  }
  else {
    res.status(404).json({"message": "There are not any records that match the selected criteria."});
    return;
  }
} 
catch(err) {
  res.status(500).json(err);
}
})


// POST-create a new blog comment record.
router.post("/", async (req, res) => { 
//console.log("!!!! BLOG COMMENT POST SERVER PROCESSING: " + req.body.comment_text);
try {
  const commentData = await Blog_Comment.create(req.body);
  if (commentData) {
    const comment = commentData.get({plain: true});  // commentData.map((comment) => 
    res.status(200).json(comment);
    return;
  }
  else {
    res.status(404).json({"message": "There are not any records that match the selected criteria."});
    return;
  }
} 
catch (err) {
  console.log(err);
  res.status(500).json(err);
  return;
}
});


// PUT-update a blog comment record.
router.put("/:id", async (req, res) => {
//console.log("!!!! BLOG COMMENT PUT SERVER PROCESSING: comment ID: " + req.params.id);
//console.log(req.body);
try {
  const commentData = await Blog_Comment.update(req.body, {
    where: {id: req.params.id}
  });
  if (commentData) {
    res.status(200).json(commentData);
    return;
  }
  else {
    res.status(404).json({"message": "There are not any records that match the selected criteria."});
    return;
  }
} 
catch (err) {
  console.log(err);
  res.status(500).json(err);
  return;
}
});


// FUTURE ENHANCEMENT
// DELETE a blog comment record.
// router.delete("/:id", async (req, res) => {  // check for authentication?
// try {
//   const blogCommentData = await Blog_Comment.destroy({
//     where: {id: req.params.id}
//   });
//   if (blogCommentData) {
//     res.status(200).json({"message": "The selected blog comment record was deleted."});
//     return;
//   }
//   else {
//     res.status(404).json({"message": "There are not any records that match the selected criteria."});
//     return;
//   }
// } 
// catch (err) {
//   res.status(500).json(err);
//   return;
// }
// });


module.exports = router;

