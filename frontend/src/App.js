import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

import Login from './components/user/login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import store from './store';

export default function App() {

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
        <Route path="/me" element={<Profile />} exact />
        <ProtectedRoute path="/me" component={Profile} exact />
      </Routes>
      <Footer />
    </Router>
  );
}

