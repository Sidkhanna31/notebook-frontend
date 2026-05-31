import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth.context";
import NotesProvider from "../context/Notes.context";
import DashboardProvider from "../context/dashboard.context";

// Wraps the authenticated app: guards the route AND
// mounts data providers only after auth is confirmed,
// so they never fire API calls without a token.
const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <NotesProvider>
      <DashboardProvider>
        <Outlet />
      </DashboardProvider>
    </NotesProvider>
  );
};

export default ProtectedRoute;
