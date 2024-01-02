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
import { Paths } from './consts/enums/Paths';
import { useStoreSelector } from './Hooks/storeHooks';



function App() {

  const {hasTokens} = useStoreSelector(state => state.auth)

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {location.pathname === Paths.BASE && navigate(Paths.LOGIN)}, []);

  return (
    <div className="App">
        <Routes>
          <Route path={Paths.BASE}>
              
              <Route element={<ProtectedRoute isAllowed={!hasTokens} redirectPath={Paths.FEED}>
                                <Layout hasNavbar={false}/>
                              </ProtectedRoute>}>
                <Route index path={Paths.LOGIN} element={<Login />}/>
                <Route path={Paths.REGISTER} element={<Register/>}/>
              </Route>

              <Route element={<ProtectedRoute isAllowed={!!hasTokens} redirectPath={Paths.LOGIN}>
                                <Layout hasNavbar={true}/>
                              </ProtectedRoute>}>
                <Route path={Paths.FEED} element={<Feed/>}/>
                <Route path={Paths.SHARE} element={<Share/>}/>
                <Route path={Paths.PROFILE} element={<Profile />}/>
              </Route>

              <Route path={Paths.STAR} element={<HowDidYouGetHere/>}/>

            </Route>
        </Routes>
    </div>
  );
}

export default App;
