import './App.css'
import Home from './Components/Home/Home.jsx';
import Login from './Components/LoginSignUp/Login.jsx';
import Register from './Components/LoginSignUp/Register.jsx';
import About from './Components/About/About.jsx';
import Contact from './Components/Contact/Contact.jsx';
import ForgotPassword from './Components/LoginSignUp/ForgotPassword.jsx';
import ResetPassword from './Components/LoginSignUp/ResetPassword.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Dashboard from './Components/ActivityLog/Dashboard.jsx';
import ProtectedRoute from './Components/ActivityLog/ProtectedRoute.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './Components/UserProfile/UserProfile.jsx';
import Settings from './Components/Settings/Settings.jsx';
import SearchUser from './Components/ActivityLog/SearchUser.jsx';
import PublicProfile from './Components/UserProfile/PublicProfile.jsx';

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
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path='/users/:id' element={<PublicProfile />} />
        <Route path='/search' element={<SearchUser />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App
