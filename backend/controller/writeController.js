const { oracledb, dbConfig } = require('../db')

const writePost = async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const { title, text, userId } = req.body;

    const result = await connection.execute(
      `INSERT INTO POSTS (id, title, content, likes, views, created_at, user_id)
      VALUES(posts_seq.NEXTVAL, :title, :text, 0, 0, SYSDATE, :userId)`,
      { title, text, userId },
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


const writeComment = async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const { commentText, postId, userId } = req.body;

    const result = await connection.execute(
      `INSERT INTO COMMENTS
      VALUES (COMMENTS_SEQ.NEXTVAL, :commentText, :postId, :userId, SYSDATE)`,
      { commentText, postId, userId },
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

module.exports = { writePost, writeComment };