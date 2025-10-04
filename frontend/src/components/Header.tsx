import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-primary-600 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-600 font-bold text-lg">N</span>
            </div>
            <h1 className="text-xl font-bold">NavApp</h1>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-primary-700 active:bg-primary-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="mt-4 pb-2 border-t border-primary-500 pt-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-4 rounded-lg hover:bg-primary-700 active:bg-primary-800 transition-colors ${
                    isActive("/") ? "bg-primary-700" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/map"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-4 rounded-lg hover:bg-primary-700 active:bg-primary-800 transition-colors ${
                    isActive("/map") ? "bg-primary-700" : ""
                  }`}
                >
                  Map
                </Link>
              </li>
            </ul>

            {/* User Info & Logout */}
            <div className="mt-4 pt-4 border-t border-primary-500">
              {user && (
                <Link
                  to="/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="block mb-3 px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <p className="text-sm text-primary-100">Signed in as</p>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-primary-200 mt-1">
                    Click to manage account
                  </p>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full py-2 px-4 rounded-lg bg-primary-700 hover:bg-primary-800 active:bg-primary-900 transition-colors text-left"
              >
                Logout
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
