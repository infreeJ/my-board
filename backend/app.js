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



app.get('/post/page/:pageNum', async (req, res) => {
    let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT p.id, u.name, p.title, p.likes, p.views, p.created_at
      FROM users u JOIN posts p ON u.id = p.user_id
      ORDER BY p.id ASC`)

      const pageNum = Number(req.params.pageNum)

      const tenPost = result.rows.slice(pageNum*10-10, pageNum*10)

      const post = tenPost.map((row) => {
        return {
          id: row[0],
          name: row[1],
          title: row[2],
          likes: row[3],
          views: row[4],
          created_at: row[5],
        }
      })
    res.json(post);
    
    
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
