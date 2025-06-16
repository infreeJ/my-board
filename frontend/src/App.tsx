import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import PostView from './pages/PostView';


import './App.css'

function App() {

  

  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/post/page/:page' element={<PostPage/>}/>
      <Route path='/post/1' element={<PostView/>}/>
    </Routes>
    </>
  )
}

export default App
