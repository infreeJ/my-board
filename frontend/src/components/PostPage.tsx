import { useEffect, useState } from 'react';
import '../css-file/PostPage.css'

function PostPage() {


  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/post/${page}`)
      .then((req) => {
        return req.json();
      })
      .then((data) => {
        console.log("받은 데이터", data);
        setPosts(data);
      })
      .catch((err) => {
        console.error("데이터 받아오기 실패:", err)
      })
  }, [page])




  return (
    <>
      <div className='postPage-wrapper'>
        <h1>게시판</h1>
        <table>
          <thead>
            <tr>
              <th style={{ width: "7%" }}>번호</th>
              <th style={{ width: "10%" }}>작성자</th>
              <th style={{ width: "49%" }}>제목</th>
              <th style={{ width: "7%" }}>좋아요</th>
              <th style={{ width: "7%" }}>조회수</th>
              <th style={{ width: "20%" }}>작성일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>test</td>
              <td>test</td>
              <td style={{ textAlign: "left" }}>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
          </tbody>
        </table>
        <div>
          <button>왼쪽</button>
          <span>1/7</span>
          <button>오른쪽</button>
        </div>
      </div>
    </>
  )
}

export default PostPage