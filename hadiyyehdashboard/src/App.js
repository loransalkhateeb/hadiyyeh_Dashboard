import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Products from './Pages/Products/Products';
import './App.css'
import Users from "./Pages/Users/Users";
import Orders from "./Pages/Orders/Orders";
import Brands from "./Pages/Brands/Brands";
import DiscountCode from "./Pages/DiscountCode/DiscountCode";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="brands" element={<Brands />} />
            <Route path="codes" element={<DiscountCode />} />
            {/* Add other routes here if needed */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
