import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Share from './pages/Share';
import Profile from './pages/Profile';
import Layout from './pages/Layout';
import Register from './pages/Register/Register';
import TestPage from './pages/TestPage';



function App() {


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
