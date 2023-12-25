import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Share from './pages/Share';
import Profile from './pages/Profile';
import Layout from './pages/Layout';
import Register from './pages/Register/Register';
import useLocalStorage from './Hooks/useLocalStorage';
import ProtectedRoute from './ProtectedRoute';
import { User } from './redux/features/Api/users/types/User';
import HowDidYouGetHere from './pages/How Did You Get Here/How did You Get Here';
import { useNavigate } from 'react-router-dom';



function App() {

  const [user,setUser] = useLocalStorage<User>('user');

  const login = (user:User) => setUser(user);
  const logout = () => setUser(null);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {location.pathname === '/' && navigate('/login')}, []);

  return (
    <div className="App">
        <Routes>
          <Route path='/'>
              
              <Route element={<ProtectedRoute isAllowed={!user} redirectPath='/feed'>
                                <Layout hasNavbar={false}/>
                              </ProtectedRoute>}>
                <Route index path='login' element={<Login onLogin={login}/>}/>
                <Route path='register' element={<Register onRegister={login}/>}/>
              </Route>

              <Route element={<ProtectedRoute isAllowed={!!user} redirectPath='/login'>
                                <Layout hasNavbar={true}/>
                              </ProtectedRoute>}>
                <Route path='feed' element={<Feed/>}/>
                <Route path='share' element={<Share/>}/>
                <Route path='profile' element={<Profile onLogout={logout}/>}/>
              </Route>

              <Route path='*' element={<HowDidYouGetHere/>}/>

            </Route>
        </Routes>
    </div>
  );
}

export default App;
