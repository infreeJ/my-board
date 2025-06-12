const express = require("express");
const cors = require("cors");
const oracledb = require("oracledb");

oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_21_18" });

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

const dbConfig = {
  user: 'MYBOARD',
  password: 'myboard0507',
  connectString: 'localhost:1521/XE'
};

app.get('/posts', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM POSTS');
    res.json(result.rows);
  } catch (err) {
    console.error("DB 연결 또는 쿼리 에러:", err);
    res.status(500).json({ error: 'DB 오류', message: err.message });
  } finally {
    if (connection) await connection.close();
  }
});


app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('백엔드 서버가 잘 작동 중입니다!');
});