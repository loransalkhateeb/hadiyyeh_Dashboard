import React from "react";
import { BiLogOut } from "react-icons/bi";

function Header() {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar bg-light" style={{ width: "250px" }}>
        <p>Sidebar</p>
      </div>

      <div className="flex-grow-1">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <img
              src={require("../Images/Logo.avif")}
              alt="logo"
              height={"80"}
            />
            <a className="navbar-brand" href="#">
              Dashboard
            </a>
            <div
              className="navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <BiLogOut size="1.4rem" />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
