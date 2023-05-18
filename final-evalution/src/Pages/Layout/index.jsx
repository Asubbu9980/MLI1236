import React from "react";
import { Outlet } from "react-router-dom";
import InvoiceNavbar from "../../Components/InvoiceNavbar";

function Layout() {
  return (
    <>
      <InvoiceNavbar />
      <Outlet></Outlet>
    </>
  );
}

export default Layout;
