import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes className="container container-fluid">
          <Route path="/" element={<Home />} exact />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

