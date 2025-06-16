import { useState } from 'react';
import '../css-file/PostView.css'


function PostView() {





  const [id, setId] = useState();

  fetch(`http://localhost:5000/post/${id}`)
  .then((req) => {
    return req.json();
  })
  .then((data) => {
    console.log(data);
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

