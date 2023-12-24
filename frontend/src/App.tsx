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
import useLocalStorage from './Hooks/useLocalStorage';
import ProtectedRoute from './ProtectedRoute';
import { useLazyLoginUserQuery } from './redux/features/Api/users/usersApiSlice';
import { User } from './redux/features/Api/users/types/User';



function App() {

  const [user,setUser] = useLocalStorage<User>('user')

  const login = (user:User) => setUser(user);
  const logout = () => setUser(null);
  

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'>
              
              <Route path='test' element={<TestPage/>}/>
              
              <Route element={<ProtectedRoute isAllowed={!user} redirectPath='/feed'>
                                <Layout hasNavbar={false}/>
                              </ProtectedRoute>}>
                <Route path='login' element={<Login onLogin={login}/>}/>
                <Route path='register' element={<Register/>}/>
              </Route>

              <Route element={<ProtectedRoute isAllowed={!!user} redirectPath='/login'><Layout hasNavbar={true}/></ProtectedRoute>}>
                <Route path='feed' element={<Feed/>}/>
                <Route path='share' element={<Share/>}/>
                <Route path='profile' element={<Profile onLogout={logout}/>}/>
              </Route>

            </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
