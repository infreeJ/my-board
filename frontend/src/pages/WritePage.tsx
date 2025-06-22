import '../css-file/WritePage.css'


function WritePage() {



  return(

    <>
    <div className="write-wrapper">
        <input type="text" placeholder='제목을 입력하세요'/>
      <textarea name="" id="" placeholder='본문을 입력하세요'></textarea>
      <button className='btn' type="submit">작성</button>
    </div>
    
    
    </>
  )
}
export default WritePage