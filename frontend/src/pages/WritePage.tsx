import { useState } from 'react'
import '../css-file/WritePage.css'
import { useNavigate } from 'react-router-dom';

interface Props {
  userId: number
}

function WritePage({ userId }: Props) {

  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (userId != 0) {
      try {
        const response = await fetch("http://localhost:5000/write", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title, text, userId })
        })

        const result = await response.json();

        if (result.success) {
          alert("작성 완료");
          nav("/post/page/1")
        } else {
          alert("작성 실패")
        }
      } catch (err) {
        console.error("글 작성 중 에러:", err);
      }
    } else {
      alert("로그인이 필요합니다.")
    }
  }

  return (
    <>
      <form className="write-wrapper" onSubmit={handleSubmit}>
        <input type="text" placeholder='제목을 입력하세요' value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder='본문을 입력하세요' value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <button className='btn' type="submit">작성</button>
      </form>
    </>
  )
}
export default WritePage