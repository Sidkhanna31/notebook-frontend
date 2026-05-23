import { Link } from "react-router-dom";

import { useDashboard } from "../context/dashboard.context";

const Dashboard = () => {
  const { stats} = useDashboard();

  const dashboardCards = [
  {
    title: "Total Notes",
    value: stats.total_notes,
    className: "primary-card",
    path: "/notes/all",
  },

  {
    title: "Pending",
    value: stats.pending,
    className: "warning-card",
    path: "/notes/pending",
  },

  {
    title: "In Progress",
    value: stats.in_progress,
    className: "info-card",
    path: "/notes/in_progress",
  },

  {
    title: "Paused",
    value: stats.paused,
    className: "secondary-card",
    path: "/notes/paused",
  },

  {
    title: "Delayed",
    value: stats.delayed,
    className: "danger-card",
    path: "/notes/delayed",
  },

  {
    title: "Completed",
    value: stats.completed,
    className: "success-card",
    path: "/notes/completed",
  },
];

  return (
    <div className="dashboard-page">

      {/* HERO SECTION */}
      <section className="dashboard-hero">

        <div>
          <h1 className="dashboard-title">
            Welcome Back 👋
          </h1>

          <p className="dashboard-subtitle">
            Track your learning progress,
            manage notes, and stay productive.
          </p>
        </div>

        <Link
          to="/add-note"
          className="btn btn-dark add-note-btn"
        >
          + Add Note
        </Link>
      </section>

      {/* STATS */}
      <section className="dashboard-stats">

        <div className="row g-4">

          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-lg-4"
            >
              <Link
                to={card.path}
                className="dashboard-card-link"
              >
                <div
                  className={`dashboard-card ${card.className}`}
                >
                  <div className="dashboard-card-content">

                    <h2>
                      {card.value}
                    </h2>

                    <p>
                      {card.title}
                    </p>

                  </div>
                </div>
              </Link>
            </div>
          ))}

        </div>

      </section>

      {/* QUICK ACTIONS */}
      <section className="quick-actions-section">

        <div className="quick-actions-card">

          <h3>
            Quick Actions
          </h3>

          <div className="quick-actions-buttons">

            <Link
              to="/add-note"
              className="btn btn-dark"
            >
              Create New Note
            </Link>

            <Link
              to="/notes/all"
              className="btn btn-outline-dark"
            >
              View All Notes
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Dashboard;