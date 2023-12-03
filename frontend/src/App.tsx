import React from 'react';
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
import { RegisterProvider } from './pages/Register/RegisterContext';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'>
          
              <Route element={<RegisterProvider><Layout hasNavbar={false}/></RegisterProvider>}>
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Register/>}>
                  <Route path='1' element={<RegisterStep1/>}/>
                  <Route path='2' element={<RegisterStep2/>}/>
                  <Route path='3' element={<RegisterStep3/>}/>
                </Route>
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
