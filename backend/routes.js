const express = require("express");
const router = express.Router();
const { getPostsByPage } = require("./controller")
const { getPost } = require("./controller")
const { getComments } = require("./controller")
const { getLogin } = require("./controller")
const { setJoin } = require("./controller")

router.get("/post/page/:pageNum", getPostsByPage);
router.get("/post/:postId", getPost);
router.get("/post/:postId/comments", getComments);
router.post("/login", getLogin);
router.post("/join", setJoin)


module.exports = router;