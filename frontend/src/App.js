import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

import Login from './components/user/login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';


import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import store from './store';

import { useSelector } from "react-redux";

export default function App() {

  const { isAuthenticated, loading, user } = useSelector(state => state.auth)

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Router className="App">
      <Header />
      <Routes className="container container-fluid">
        <Route path="/" element={<Home />} exact />
        <Route path="/search/:keyword" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} exact />
        <Route path="/password/reset/:token" element={<NewPassword />} exact />


// TODO: How to make this route more consise?

        <Route path="/me" element={
          isAuthenticated ? (
            <Profile />
          ) : (
            <Navigate replace to="/login" />
          )
        } />

        <Route path="/me/update" element={
          isAuthenticated ? (
            <UpdateProfile />
          ) : (
            <Navigate replace to="/login" />
          )
        } />

        <Route path="/password/update" element={
          isAuthenticated ? (
            <UpdatePassword />
          ) : (
            <Navigate replace to="/login" />
          )
        } />



      </Routes>
      <Footer />
    </Router>
  );
}

