const express = require("express");
const cors = require("cors");
const routes = require("./routes")

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
