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

    const tenPost = result.rows.slice(pageNum * 10 - 10, pageNum * 10)

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


const getPost = async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const postId = Number(req.params.postId)

    const result = await connection.execute(
      `SELECT p.id, p.title, u.name, p.views, p.likes, p.created_at, p.content
      FROM users u JOIN posts p ON u.id = p.user_id
      WHERE p.id = :postId`, [postId])

    const postDetail = result.rows.map((row) => {
      return {
        id: row[0],
        title: row[1],
        name: row[2],
        views: row[3],
        likes: row[4],
        created_at: row[5],
        content: row[6],
      }
    })
    res.json(postDetail);

  } catch (err) {
    console.error("DB 연결 또는 쿼리 에러:", err);
    res.status(500).json({ error: 'DB 오류', message: err.message });
  } finally {
    if (connection) await connection.close();
  }
}


const getComments = async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const postId = Number(req.params.postId)

    const result = await connection.execute(
      `SELECT c.id, u.name, c.content, c.created_at
      FROM users u JOIN comments c ON u.id = c.user_id
      JOIN posts p ON p.id = c.post_id
      WHERE p.id = :postId`, [postId])

    const commentDetail = result.rows.map((row) => {
      return {
        id: row[0],
        name: row[1],
        content: row[2],
        created_at: row[3]
      }
    })
    res.json(commentDetail);

  } catch (err) {
    console.error("DB 연결 또는 쿼리 에러:", err);
    res.status(500).json({ error: 'DB 오류', message: err.message });
  } finally {
    if (connection) await connection.close();
  }
}


const getLogin = async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const { userId, password } = req.body;

    const result = await connection.execute(
      `SELECT name
      FROM users
      WHERE name = :userId AND pw = :password`, [userId, password])

    if (result.rows.length > 0) {
      res.json({ success: true, name: result.rows[0][0] });
    } else {
      res.json({ success: false });
    }

  } catch (err) {
    console.error("DB 연결 또는 쿼리 에러:", err);
    res.status(500).json({ error: 'DB 오류', message: err.message });
  } finally {
    if (connection) await connection.close();
  }
}

const setJoin = async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const {userId, userPw, userEmail} = req.body;
    
    const result = await connection.execute(
      `INSERT INTO users
      VALUES (users_seq.NEXTVAL, :userId, :userPw, :userEmail)`,
      [userId, userPw, userEmail],
    { autoCommit: true })

    if (result.rowsAffected == 1) {
      res.json({ success: true })
    }
    
  } catch (err) {
    console.error("DB 연결 또는 쿼리 에러:", err);
    res.status(500).json({ error: 'DB 오류', message: err.message });
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = { getPostsByPage, getPost, getComments, getLogin, setJoin };