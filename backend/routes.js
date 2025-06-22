const express = require("express");
const router = express.Router();
const { getPostsByPage } = require("./controller/postController")
const { getPost } = require("./controller/postController")
const { getComments } = require("./controller/postController")
const { getLogin } = require("./controller/userController")
const { setJoin } = require("./controller/userController")

router.get("/post/page/:pageNum", getPostsByPage);
router.get("/post/:postId", getPost);
router.get("/post/:postId/comments", getComments);
router.post("/login", getLogin);
router.post("/join", setJoin)


module.exports = router;