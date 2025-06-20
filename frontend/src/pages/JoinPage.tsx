import { useState } from "react"


function JoinPage() {




  return (
    <>
      <div className="loginTab">
        <span className='logo'>회원가입</span>
        <form>
          <input className="idInput" type="text" placeholder="아이디를 입력하세요."/>
          <input className="pwInput" type="password" placeholder="비밀번호를 입력하세요"/>
          <input className="pwInput" type="password" placeholder="다시 비밀번호를 입력하세요"/>
          <button className="joinBtn">회원가입</button>
        </form>
      </div>
    </>
    
  )
}
export default JoinPage