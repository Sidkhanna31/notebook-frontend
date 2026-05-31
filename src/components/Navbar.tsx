import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth.context";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    {
      title: "Dashboard",
      path: "/",
    },

    {
      title: "All Notes",
      path: "/notes",
    },

    {
      title: "Add Note",
      path: "/add-note",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="custom-navbar">

      <div className="container navbar-container">

        {/* LOGO */}
        <Link
          to="/"
          className="navbar-logo"
        >
          The Notebook
        </Link>

        {/* NAV LINKS */}
        <div className="navbar-links">

          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`navbar-link ${
                location.pathname === item.path
                  ? "active-nav-link"
                  : ""
              }`}
            >
              {item.title}
            </Link>
          ))}

        </div>

        {/* USER INFO */}
        {user && (
          <div className="navbar-user">
            <span className={`navbar-role-badge ${user.role}`}>
              {user.role === "admin" ? "👑 Admin" : "👤 User"}
            </span>
            <span className="navbar-username">{user.name}</span>
            <button className="navbar-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

      </div>

    </nav>
  );
};

export default Navbar;