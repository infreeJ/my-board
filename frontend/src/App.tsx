import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PostPage from './components/PostPage';


import './App.css'

function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/post' element={<PostPage/>}/>
    </Routes>
    </>
  )
}

export default App
