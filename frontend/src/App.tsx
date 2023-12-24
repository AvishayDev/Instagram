import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import RegisterStep1 from './pages/Register/RegisterStep1';
import RegisterStep2 from './pages/Register/RegisterStep2';
import RegisterStep3 from './pages/Register/RegisterStep3';
import Feed from './pages/Feed';
import Share from './pages/Share';
import Profile from './pages/Profile';
import Layout from './pages/Layout';
import Register from './pages/Register/Register';
import TestPage from './pages/TestPage';
import useLocalStorage from './Hooks/useLocalStorage';



function App() {

  // const [user, _] = useLocalStorage('user');

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'>
              
              <Route path='test' element={<TestPage/>}/>
              
              <Route element={<Layout hasNavbar={false}/>}>
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Register/>}/>
              </Route>

              <Route element={<Layout hasNavbar={true}/>}>
                <Route path='feed' element={<Feed/>}/>
                <Route path='share' element={<Share/>}/>
                <Route path='profile' element={<Profile/>}/>
              </Route>

            </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
