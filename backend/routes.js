const express = require("express");
const router = express.Router();
const { getPostsByPage } = require("./controller")
const { getPost } = require("./controller")

router.get("/post/page/:pageNum", getPostsByPage);
router.get("/post/:postId", getPost);

module.exports = router;