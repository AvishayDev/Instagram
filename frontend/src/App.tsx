import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register1 from './pages/Register/Register1';
import Register2 from './pages/Register/Register2';
import Register3 from './pages/Register/Register3';
import Feed from './pages/Feed';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Layout from './pages/Layout';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'>

              <Route element={<Layout hasNavbar={false}/>}>
                <Route path='login' element={<Login/>}/>
                <Route path='register1' element={<Register1/>}/>
                <Route path='register2' element={<Register2/>}/>
                <Route path='register3' element={<Register3/>}/>
              </Route>

              <Route path='user/:id' element={<Layout hasNavbar={true}/>}>
                <Route path='feed' element={<Feed/>}/>
                <Route path='post' element={<Post/>}/>
                <Route path='profile' element={<Profile/>}/>
              </Route>

            </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
