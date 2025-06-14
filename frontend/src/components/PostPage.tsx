import { useEffect, useState } from 'react';
import '../css-file/PostPage.css'

function PostPage() {


  const [posts, setPosts] = useState<PostData[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/post/${page}`)
      .then((req) => {
        return req.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.error("데이터 받아오기 실패:", err)
      })
  }, [page])


  type PostData = {
    id: number;
    name: string;
    title: string;
    likes: number;
    views: number;
    created_at: string;
  };


  function pageDown () {
    if (page > 1) {
      setPage(page-1)
    }
  }

    function pageUp () {
    if (page < 3) {
      setPage(page+1)
    }
  }


  return (
    <>
      <div className='postPage-wrapper'>
        <h1>게시판</h1>
        <table>
          <thead>
            <tr>
              <th style={{ width: "8%" }}>번호</th>
              <th style={{ width: "10%" }}>작성자</th>
              <th style={{ width: "43%" }}>제목</th>
              <th style={{ width: "8%" }}>좋아요</th>
              <th style={{ width: "8%" }}>조회수</th>
              <th style={{ width: "23%" }}>작성일</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              return (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.name}</td>
                  <td style={{ textAlign: "left" }}>{post.title}</td>
                  <td>{post.likes}</td>
                  <td>{post.views}</td>
                  <td>{new Date(post.created_at).toLocaleString("ko-KR", {
                    timeZone: "Asia/Seoul",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                  })}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button onClick={() => {pageDown()}}>왼쪽</button>
          <span>{page}/3</span>
          <button onClick={() => {pageUp()}}>오른쪽</button>
        </div>
      </div>
    </>
  )
}

export default PostPage