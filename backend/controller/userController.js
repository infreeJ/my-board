const { oracledb, dbConfig } = require('../db')

const getLogin = async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const { userName, password } = req.body;
    
    const result = await connection.execute(
      `SELECT name, id
      FROM users
      WHERE name = :userName AND pw = :password`, [userName, password])

    if (result.rows.length > 0) {
      res.json({ success: true, name: result.rows[0][0], id: result.rows[0][1] });
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

    const {userName, userPw, userEmail} = req.body;
    
    const result = await connection.execute(
      `INSERT INTO users
      VALUES (users_seq.NEXTVAL, :userName, :userPw, :userEmail)`,
      [userName, userPw, userEmail],
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

module.exports = { getLogin, setJoin };