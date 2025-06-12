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

app.get('/users', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM USERS');
    res.json(result.rows);
    

  } catch (err) {
    console.error("DB 연결 또는 쿼리 에러:", err);
    res.status(500).json({ error: 'DB 오류', message: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.get('/posts', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT p.id, u.name, p.title, p.likes, p.views, p.created_at
      FROM users u JOIN posts p ON u.id = p.user_id
      ORDER BY p.id ASC`)
    res.json(result.rows);
    
    const postId = result.rows[0][0]
    const userName = result.rows[0][1]
    const postTitle = result.rows[0][2]
    const postLikes = result.rows[0][3]
    const postViews = result.rows[0][4]
    const postCreated_at = result.rows[0][5]

    console.log(postId);
    console.log(userName);
    console.log(postTitle);
    console.log(postLikes);
    console.log(postViews);
    console.log(postCreated_at);
    

    // console.log("쿼리 결과:", result.rows[0][1]);
    
  } catch (err) {
    console.error("DB 연결 또는 쿼리 에러:", err);
    res.status(500).json({ error: 'DB 오류', message: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.get('/comments', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM COMMENTS');
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