import { useEffect, useState } from 'react';
import '../css-file/PostView.css'
import { useParams } from 'react-router-dom';

function PostView() {

  const { id } = useParams(); // Params 값 가져오기
  let postId = Number(id);

  const [postDetail, setPostDetail] = useState<postDetailType[]>([]);

  type postDetailType = {
    id: number,
    title: string,
    name: string,
    views: number,
    likes: number,
    created_at: string,
    content: string,
  };

  useEffect(() => {
    fetch(`http://localhost:5000/post/${postId}`)
      .then((req) => {
        return req.json();
      })
      .then((data) => {
        setPostDetail(data);
      })
      .catch((err) => {
        console.error("데이터 받아오기 실패:", err)
      })
  }, [postId])



  return (
    <>
      {postDetail.map((post) => {
        return (
          <div className='postView-wrapper' key={post.id}>

            <h1>{post.title}</h1>

            <div className='postInfo'>
              <span className='postInfo-name'>{post.name}</span>
              <div className='postInfo-view'>
                <span>조회수 {post.views}</span>
                <span>좋아요 {post.likes}</span>
                <span>작성일 {new Date(post.created_at).toLocaleString("ko-KR", {
                    timeZone: "Asia/Seoul",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                  })}</span>
              </div>
            </div>

            <hr />

            <div className='postDetails'>
              {post.content}
            </div>

            <hr />

            <div className='postComment'>
              여긴 댓글이요
            </div>
          </div>
        )
      })
      }
    </>
  )
}


export default PostView