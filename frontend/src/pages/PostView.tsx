import { useState } from 'react';
import '../css-file/PostView.css'
import { useParams } from 'react-router-dom';


function PostView() {


  const { id } = useParams(); // Params 값 가져오기

  const [postId, setPostId] = useState(id); // Params 값을 State로 지정

  fetch(`http://localhost:5000/post/${postId}`)
    .then((req) => {
      return req.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error("데이터 받아오기 실패:", err)
    })

    




  return (
    <>
      <div className='postView-wrapper'>

        <h1>여기에 제목 들어가요</h1>

        <div className='postInfo'>
          <span className='postInfo-name'>여긴 닉네임</span>
          <div className='postInfo-view'>
            <span>조회수 5</span>
            <span>좋아요 1</span>
            <span>작성일 2025.06.17</span>
          </div>
        </div>

        <hr />

        <div className='postDetails'>
          여긴 본문이요
        </div>

        <hr />

        <div className='postComment'>
          여긴 댓글이요
        </div>
      </div>
    </>
  )
}

export default PostView

