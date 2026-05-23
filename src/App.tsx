import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <div className="container py-5">
        <Outlet />
      </div>
    </>
  );
}

export default App;