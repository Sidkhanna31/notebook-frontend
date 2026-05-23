import { createRoot } from "react-dom/client";

import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import NotesProvider from "./context/Notes.context";

import DashboardProvider from "./context/dashboard.context";

import App from "./App";

import Dashboard from "./pages/Dashboard";
import AddNotePage from "./pages/AddNotePage";
import AllNotesPage from "./pages/AllNotesPage";
import UpdatePage from "./pages/UpdatePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "add-note",
        element: <AddNotePage />,
      },

      {
        path: "notes",
        element: <AllNotesPage />,
      },

      {
        path: "notes/:status",
        element: <AllNotesPage />,
      },

      {
        path: "update/:id",
        element: <UpdatePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <NotesProvider>
    <DashboardProvider>
      <RouterProvider router={router} />
    </DashboardProvider>
  </NotesProvider>,
);