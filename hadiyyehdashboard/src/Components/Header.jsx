import React from "react";
import { BiLogOut } from "react-icons/bi";
import '../Styles/Header.css';
import { IoMenu } from "react-icons/io5";
import { MdMenuOpen } from "react-icons/md";
import {Link,Outlet} from 'react-router-dom'
import { useState } from "react";

function Header() {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="wrapper ">
      <nav id="sidebar" className={isActive ? "active" : ""}>
        <div className="sidebar-header">
        <img
              src={require("../Images/Logo.avif")}
              alt="logo"
              // height={"20"}
              className="img-fluid logo_header" 
            />
          <h3>Hadiyyeh</h3>
        </div>

        <ul className="list-unstyled components">
          {/* <li className="active">
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>
            <ul className="collapse list-unstyled" id="homeSubmenu">
              <li><a href="#">Home 1</a></li>
              <li><a href="#">Home 2</a></li>
              <li><a href="#">Home 3</a></li>
            </ul>
          </li> */}
          <li><Link to ="/products">Products</Link></li>
          {/* <li>
            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
            <ul className="collapse list-unstyled" id="pageSubmenu">
              <li><a href="#">Page 1</a></li>
              <li><a href="#">Page 2</a></li>
              <li><a href="#">Page 3</a></li>
            </ul>
          </li> */}
          <li><Link to ="/orders">Orders</Link></li>
          <li><Link to ="/users">Users</Link></li>
          <li><Link to ="/brands">Brands</Link></li>
          <li><Link to ="/codes">Discount Code</Link></li>
        </ul>

       
      </nav>

      <div id="content">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            
            <button type="button" id="sidebarCollapse" className="btn btn_togglesidebar" onClick={toggleSidebar}>
            <MdMenuOpen style={{color:"#fff"}}/>
            </button>
            <BiLogOut size="1.4rem" />

            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <IoMenu />            </button>
          </div>
        </nav>
        <Outlet />

      
      </div>
    </div>
  );
}

export default Header;

