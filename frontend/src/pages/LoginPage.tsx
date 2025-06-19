import { useState } from 'react'
import '../css-file/LoginPage.css'
import { useNavigate } from 'react-router-dom'


function LoginPage() {

  const nav = useNavigate();

  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password })
      })

      const result = await response.json();
      console.log("서버 응답:", result);
      


      if (result.success) {
        alert("로그인 성공!")
        nav(`/post/page/1`)
      } else {
        alert("로그인 실패!");
      }
    } catch (err) {
      console.error("로그인 요청 중 에러:", err);
    }
  }


  return (
    <>
      <div className="loginTab">
        <span className='logo'>게시판 이름 추천좀</span>
        <form onSubmit={handleSubmit}>
          <input className="idInput" type="text" placeholder="아이디를 입력하세요." value={userId} onChange={(e) => setUserId(e.target.value)} />
          <input className="pwInput" type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="loginBtn">로그인</button>
        </form>
        <button className="joinBtn">회원가입</button>
      </div>
    </>
  )
}
export default LoginPage