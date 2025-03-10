import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MusicRooms from "./pages/MusicRooms";
import MyBookingsPage from "./pages/MyBookingsPage";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Refresh the page
  };
  return (
    <Router>
      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/mybookings">My Bookings</Link>
              </li>
              <li>
                <Link to="/musicrooms">Music Rooms</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
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
