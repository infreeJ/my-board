import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import '../css-file/PostPage.css'

interface Props {
  userName: string,
}

function PostPage({ userName }: Props) {

  const nav = useNavigate();

  const { page } = useParams(); // URL로 페이지 값 받기
  let pageNum = Number(page); // type 지정하고 pageNum에 선언


  // 페이지 업/다운 함수
  function pageDown() {
    if (pageNum > 1) {
      pageNum = pageNum - 1
    }
    return pageNum
  }

  function pageUp() {
    if (pageNum < 3) {
      pageNum = pageNum + 1
    }
    return pageNum
  }


  // 받을 데이터의 타입 명시
  type PostData = {
    id: number;
    name: string;
    title: string;
    likes: number;
    views: number;
    created_at: string;
  };

  // 데이터를 받을 빈 배열 만들기
  const [posts, setPosts] = useState<PostData[]>([]);


  // 페이지가 넘어가면 해당 페이지의 데이터 요청
  useEffect(() => {
    fetch(`http://localhost:5000/post/page/${pageNum}`)
      .then((req) => {
        return req.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.error("데이터 받아오기 실패:", err)
      })
  }, [pageNum])


  return (
    <>
      <div className='postPage-wrapper'>
        <p className='nickname'>반갑습니다! {userName}님</p>

        <div className='header-wrapper'>
          <div className='header-left'>
            
            <button onClick={() => { nav('/write')}}>글쓰기</button>
          </div>
          <h1>게시판</h1>
          <div className='search-wrapper'>
            <input type="text" />
            <button type="submit" style={{width: "70px"}}>검색</button>
          </div>
        </div>

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
                <tr key={post.id} onClick={() => { nav(`/post/${post.id}`) }}>
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
          <button onClick={() => { nav(`/post/page/${pageDown()}`) }}>왼쪽</button>
          <span>{pageNum}/3</span>
          <button onClick={() => { nav(`/post/page/${pageUp()}`) }}>오른쪽</button>
        </div>
      </div>
    </>
  )
}

export default PostPage