import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from './pages/Home'
import Login from './components/Login';

function AppRoutes() {
    const { user } = useAuth();
    return (
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  export default AppRoutes