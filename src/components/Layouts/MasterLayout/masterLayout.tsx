import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../TopNav/index";
import Footer from "../Footer/index";
import TopBar from "../TopNav/topBar";

const MasterLayout: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navigation */}
      <header>
        <TopBar />
        <NavBar />
      </header>

      {/* Main Content */}
      <main className="flex-grow-1 container my-4">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MasterLayout;
