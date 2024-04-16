import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import PostJob from "./pages/PostJob";
import { Toaster } from "react-hot-toast";
import MyJobs from "./pages/MyJobs";
import EditJob from "./pages/EditJob";
import SalaryEstimate from "./pages/SalaryEstimate";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-job" element={<ProtectedRoute><MyJobs /></ProtectedRoute>} />
          <Route path="/post-job" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
          <Route path="/edit-job/:id" element={<ProtectedRoute><EditJob /></ProtectedRoute>} />
          <Route path="/salary" element={<SalaryEstimate />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
