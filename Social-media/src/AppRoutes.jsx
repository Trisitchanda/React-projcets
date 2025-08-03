import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from './pages/Home'
import Login from './components/Login';
import SignUp from './components/Signup';
import ForgotPassword from "./components/ForgetPass";

function AppRoutes() {
    const { user } = useAuth();
    return (
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/ForgetPassword" element={<ForgotPassword />} />
      </Routes>
    );
  }

  export default AppRoutes