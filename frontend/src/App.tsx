import { Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import PostView from './pages/PostView';
import JoinPage from './pages/JoinPage';


import './App.css'
import WritePage from './pages/WritePage';

function App() {


  const [userName, setUserName ] = useState("");
  const [ userId, setUserId ] = useState(0);


  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<LoginPage userName={userName} setUserName={setUserName} setUserId={setUserId}/>} />
        <Route path='/join' element={<JoinPage/>} />
        <Route path='/post/page/:page' element={<PostPage userName={userName}/>} />
        <Route path='/post/:id' element={<PostView />} />
        <Route path='/write' element={<WritePage userId={userId}/>} />
      </Routes>
    </>
  )
}

export default App
