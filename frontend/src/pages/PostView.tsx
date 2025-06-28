import { useEffect, useState } from 'react';
import '../css-file/PostView.css'
import { useParams } from 'react-router-dom';

interface Props {
  userId: number;
}

function PostView({ userId }: Props) {

  const { id } = useParams(); // Params 값 가져오기
  let postId = Number(id);


  // 게시글 데이터 가져오기
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
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/post/${postId}`)
        const data = await response.json();
        setPostDetail(data);
      } catch (err) {
        console.error(err);

      }
    }
    fetchData();
  }, [postId])


  // 댓글 데이터 가져오기
  const [commentDetail, setCommentDetail] = useState<commentDetailType[]>([]);

  type commentDetailType = {
    id: number,
    name: string,
    content: number,
    created_at: string
  };

  // 댓글 작성 시 리렌더링하기 위해 따로 뺌
  async function fetchComment() {
    try {
      const response = await fetch(`http://localhost:5000/post/${postId}/comments`)
      const data = await response.json();
      setCommentDetail(data);
    } catch (err) {
      console.error(err);
    }
  }


  useEffect(() => {
    fetchComment();
  }, [postId])



  // 댓글 작성
  const [commentText, setCommentText] = useState("");

  async function writeComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/post/${postId}/writeComment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentText, postId, userId })
      })

      const result = await response.json();

      if (result.success) {
        alert("작성 완료")
        fetchComment();
      } else {
        alert("작성 실패")
      }
    } catch (err) {
      console.error("서버 연결 실패" + err);
    }
  }




  return (
    <>
      {postDetail.map((post) => {
        return (
          <div className='postView-wrapper' key={post.id}>
            <h1>{post.title}</h1>
            <div className='postInfo'>
              <span className='postInfo-name'>작성자 : {post.name}</span>
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
            <form className='comment-form' onSubmit={writeComment}>
              <input type="text" placeholder='댓글을 작성하세요' value={commentText} onChange={(e) => { setCommentText(e.target.value) }} />
              <button type="submit">작성</button>
            </form>
            {commentDetail.map((comment) => {
              return (
                <div className='postComment' key={comment.id}>
                  <span style={{ width: "10%" }}>{comment.name}</span>
                  <span style={{ width: "70%" }}>{comment.content}</span>
                  <span style={{ width: "20%" }}>{new Date(comment.created_at).toLocaleString("ko-KR", {
                    timeZone: "Asia/Seoul",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                  })}</span>
                </div>
              )
            })}
          </div>
        )
      })
      }
    </>
  )
}


export default PostView