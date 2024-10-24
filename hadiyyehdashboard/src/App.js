
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from './Components/SideBar'; // Adjust the path as necessary
import Home from './Pages/Home';       // Your Home component
import Orders from './Pages/Orders/orders';   // Your Orders component
import Products from './Pages/Products/Products'; // Your Products component
import Users from './Pages/Users/users';     // Your Users component
import Codes from './Pages/Codes/codes';     // Your Codes component

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<Products />} />
                <Route path="/users" element={<Users />} />
                <Route path="/codes" element={<Codes />} />
            </Routes>
        <SideBar/>
        </>
    );

import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes></Routes>
      </Router>
    </div>
  );
}

export default App;
