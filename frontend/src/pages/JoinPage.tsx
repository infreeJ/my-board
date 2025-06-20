import { useState } from "react"
import { useNavigate } from "react-router-dom";

function JoinPage() {
  
  const nav = useNavigate();

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userEmail, setUserEmail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/join", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({userId, userPw, userEmail})
        }
      )
      const result = await response.json();
      if(result.success) {
        alert("회원가입 성공!");
        nav('/login')
      } else {
        alert("회원가입 실패!");
      }
    } catch(err) {
      console.error(err);
      
    }
  }

  return (
    <>
      <div className="loginTab">
        <span className='logo'>회원가입</span>
        <form onSubmit={handleSubmit}>
          <input className="idInput" type="text" placeholder="아이디를 입력하세요."
          value={userId} onChange={(e) => {setUserId(e.target.value)}}/>
          <input className="pwInput" type="password" placeholder="비밀번호를 입력하세요"
          value={userPw} onChange={(e) => {setUserPw(e.target.value)}}/>
          <input className="pwInput" type="email" placeholder="이메일을 입력하세요"
          value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}}/>
          <button className="joinBtn" type="submit">회원가입</button>
        </form>
      </div>
    </>
    
  )
}
export default JoinPage