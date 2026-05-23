import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

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

      </div>

    </nav>
  );
};

export default Navbar;