import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../TopNav/index";
import Footer from "../Footer/index";
import TopBar from "../TopNav/topBar";

const MasterLayout = () => {
  return (
    <>
      <TopBar />
      <NavBar />
      <main className="container my-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MasterLayout;
