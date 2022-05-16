import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';

// Cart imports
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';

// Order imports
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

// Auth or User imports
import { loadUser } from './actions/userActions';
import store from './store';
import axios from 'axios';

// Admin imports
import Dashboard from "../src/components/admin/Dashboard";
import ProductsList from "../src/components/admin/ProductsList";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { useSelector } from "react-redux";

export default function App() {

  const { isAuthenticated, user } = useSelector(state => state.auth)

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey();
  }, [])

  return (
    <Router className="App">
      <Header />
      <Routes className="container container-fluid">
        <Route index path="/" element={<Home />} exact />
        <Route path="search/:keyword" element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} exact />

        <Route path="cart" element={<Cart />} exact />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="password/forgot" element={<ForgotPassword />} exact />
        <Route path="password/reset/:token" element={<NewPassword />} exact />

        <Route path="/me" element={isAuthenticated ? (<Profile />) : (<Navigate replace to="/login" />)} />
        <Route path="/me/update" element={isAuthenticated ? (<UpdateProfile />) : (<Navigate replace to="/login" />)} />
        <Route path="/password/update" element={isAuthenticated ? (<UpdatePassword />) : (<Navigate replace to="/login" />)} />
        <Route path="/shipping" element={isAuthenticated ? (<Shipping />) : (<Navigate replace to="/login" />)} />
        <Route path="/order/confirm" element={isAuthenticated ? (<ConfirmOrder />) : (<Navigate replace to="/login" />)} />
        <Route path="/success" element={isAuthenticated ? (<OrderSuccess />) : (<Navigate replace to="/login" />)} />

        <Route path="/orders/me" element={isAuthenticated ? (<ListOrders />) : (<Navigate replace to="/login" />)} />
        <Route path="/order/:id" element={isAuthenticated ? (<OrderDetails />) : (<Navigate replace to="/login" />)} />

        <Route path="/dashboard" element={isAuthenticated && user.role !== 'admin' ? (<Dashboard />) : (<Navigate replace to="/login" />)} />
        <Route path="/admin/products" element={isAuthenticated && user.role !== 'admin' ? (<ProductsList />) : (<Navigate replace to="/login" />)} />
        <Route path="/admin/product" element={isAuthenticated && user.role !== 'admin' ? (<NewProduct />) : (<Navigate replace to="/login" />)} />
        <Route path="/admin/product/:id" element={isAuthenticated && user.role !== 'admin' ? (<UpdateProduct />) : (<Navigate replace to="/login" />)} />

        <Route path="/admin/orders/" element={isAuthenticated && user.role !== 'admin' ? (<OrdersList />) : (<Navigate replace to="/login" />)} />
        <Route path="/admin/order/:id" element={isAuthenticated && user.role !== 'admin' ? (<ProcessOrder /> ) : (<Navigate replace to="/login" />)} />

        {stripeApiKey &&
          <Route path="/payment" element={isAuthenticated ? (<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>) : (<Navigate replace to="/login" />)} />
        }


      </Routes>

      <Footer />

    </Router>
  );
}

