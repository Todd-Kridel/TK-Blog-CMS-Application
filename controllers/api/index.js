

const router = require("express").Router();

const userRoutes = require("./userRoutes");
//const categoryRoutes = require("./categoryRoutes");
const blogRoutes = require("./blogRoutes");
const blogCommentRoutes = require("./blogCommentRoutes");

router.use("/user", userRoutes);
//router.use("/category", categoryRoutes); 
router.use("/blog", blogRoutes);
router.use("/blog/comment", blogCommentRoutes);


module.exports = router;

