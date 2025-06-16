const express = require("express");
const router = express.Router();
const { getPostsByPage } = require("./controller")

router.get("/post/page/:pageNum", getPostsByPage);

module.exports = router;