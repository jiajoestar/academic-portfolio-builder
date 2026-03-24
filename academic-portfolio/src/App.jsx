import './App.css'
import Home from './Components/Home/Home.jsx';
import Login from './Components/LoginSignUp/Login.jsx';
import Register from './Components/LoginSignUp/Register.jsx';
import About from './Components/About/About.jsx';
import Contact from './Components/Contact/Contact.jsx';
import ForgotPassword from './Components/LoginSignUp/ForgotPassword.jsx';
import ResetPassword from './Components/LoginSignUp/ResetPassword.jsx';
import Footer from './Components/Footer/Footer.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App
