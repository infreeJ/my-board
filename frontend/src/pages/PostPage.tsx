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
    if (pageNum < Math.ceil(maxPost / 10)) {
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
  const [maxPost, setMaxPost] = useState(0);



  // 페이지 목록 가져오기
  async function fetchPost() {
    try {
      const response = await fetch(`http://localhost:5000/post/page/${pageNum}`)
      const data = await response.json();
      setPosts(data.post);
      setMaxPost(data.maxPost);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {

    fetchPost();
  }, [pageNum])



  // 검색 기능
  const [searchText, setSearchText] = useState("");

  async function searchPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/searchPost', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchText })
      })
      const data = await response.json();
      setPosts(data.searchData)
      setMaxPost(data.searchMaxPage)
      pageNum = 1;
    } catch (err) {
      console.error(err);
    }
  }



  return (
    <>
      <div className='postPage-wrapper'>
        <div className='postPage-top'>
          <p className='nickname'>반갑습니다! {userName}님</p>
          <button onClick={fetchPost}>전체 글 보기</button>
        </div>

        <div className='header-wrapper'>
          <div className='header-left'>

            <button onClick={() => { nav('/write') }}>글쓰기</button>
          </div>
          <h1>게시판</h1>
          <form className='search-wrapper' onSubmit={searchPost}>
            <input type="text" value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
            <button type="submit" style={{ width: "70px" }}>검색</button>
          </form>

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
          <span>{pageNum}/{Math.ceil(maxPost / 10)}</span>
          <button onClick={() => { nav(`/post/page/${pageUp()}`) }}>오른쪽</button>
        </div>
      </div>
    </>
  )
}

export default PostPage