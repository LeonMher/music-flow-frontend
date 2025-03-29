// components/Navigation.tsx
import { Link } from "react-router-dom";
import { useState } from "react";

interface NavigationProps {
  isAuthenticated: boolean;
  handleLogout: () => void;
}

function Navigation({ isAuthenticated, handleLogout }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-lg font-bold">
          Logo
        </Link>
      </div>
      {isAuthenticated ? (
        <ul className="hidden md:flex items-center space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/mybookings" className="hover:text-gray-300">
              My Bookings
            </Link>
          </li>
          <li>
            <Link to="/musicrooms" className="hover:text-gray-300">
              Music Rooms
            </Link>
          </li>
          <li>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      ) : (
        <ul className="hidden md:flex items-center space-x-4">
          <li>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </li>
        </ul>
      )}
      <button
        className="md:hidden flex justify-center w-8 h-8 bg-gray-600 hover:bg-gray-500 text-gray-200"
        onClick={handleToggle}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div className={`md:hidden mobile-nav ${isOpen ? "block" : "hidden"}`}>
        {isAuthenticated ? (
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/mybookings" className="hover:text-gray-300">
                My Bookings
              </Link>
            </li>
            <li>
              <Link to="/musicrooms" className="hover:text-gray-300">
                Music Rooms
              </Link>
            </li>
            <li>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
