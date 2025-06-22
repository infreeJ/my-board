import { Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import PostView from './pages/PostView';
import JoinPage from './pages/JoinPage';


import './App.css'
import WritePage from './pages/WritePage';

function App() {


  const [userId, setUserId ] = useState("");


  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<LoginPage userId={userId} setUserId={setUserId} />} />
        <Route path='/join' element={<JoinPage/>} />
        <Route path='/post/page/:page' element={<PostPage userId={userId}/>} />
        <Route path='/post/:id' element={<PostView />} />
        <Route path='/write' element={<WritePage />} />
      </Routes>
    </>
  )
}

export default App
