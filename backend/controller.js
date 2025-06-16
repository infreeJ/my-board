const oracledb = require("oracledb");

oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_21_18" });


const dbConfig = {
  user: 'MYBOARD',
  password: 'myboard0507',
  connectString: 'localhost:1521/XE'
};

const getPostsByPage = async (req, res) => {
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
};


// 이건 바꿔도 되는건가?
module.exports = { getPostsByPage };