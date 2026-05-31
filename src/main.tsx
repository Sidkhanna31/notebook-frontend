import { createRoot } from "react-dom/client";

import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthProvider from "./context/Auth.context";
import ProtectedRoute from "./components/ProtectedRoute";

import App from "./App";
import Dashboard from "./pages/Dashboard";
import AddNotePage from "./pages/AddNotePage";
import AllNotesPage from "./pages/AllNotesPage";
import UpdatePage from "./pages/UpdatePage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    // ProtectedRoute guards auth AND renders Outlet (child routes)
    // wrapped in NotesProvider + DashboardProvider
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "add-note", element: <AddNotePage /> },
          { path: "notes", element: <AllNotesPage /> },
          { path: "notes/:status", element: <AllNotesPage /> },
          { path: "update/:id", element: <UpdatePage /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);