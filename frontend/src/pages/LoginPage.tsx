import '../css-file/LoginPage.css'


function LoginPage () {
  return(
    <>
    <div className="loginTab">
      <span></span>
      <input className="idInput" type="text" placeholder="아이디를 입력하세요."/>
      <input className="pwInput" type="password" placeholder="비밀번호를 입력하세요"/>
      <button className="loginBtn">로그인</button>
      <button className="joinBtn">회원가입</button>
    </div>
    </>
  )
}

export default LoginPage