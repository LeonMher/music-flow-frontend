import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MusicRooms from "./pages/MusicRooms";
import MyBookingsPage from "./pages/MyBookingsPage";
import Navigation from "./components/Navigation";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Refresh the page
  };
  return (
    <Router>
      <Navigation
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/musicrooms" element={<MusicRooms />} />
          <Route path="/mybookings" element={<MyBookingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
