import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Products from './Pages/Products/Products';
import './App.css'
import AddProduct from "./Pages/Products/AddProduct";
import UpdateProduct from "./Pages/Products/UpdateProduct";
import Users from "./Pages/Users/users";
import Orders from "./Pages/Orders/orders";
import Brands from "./Pages/Brands/Brands";
import DiscountCode from "./Pages/DiscountCode/DiscountCode";
import AddBrand from "./Pages/Brands/AddBrand";
import UpdateBrand from "./Pages/Brands/UpdateBrand";
import AddUser from "./Pages/Users/AddUser";
import UpdateUser from "./Pages/Users/UpdateUser";
import AddDiscountCode from "./Pages/DiscountCode/AddDiscountCode";
import UpdateDiscountCode from "./Pages/DiscountCode/UpdateDiscountCode";
import Slider from "./Pages/Slider/Slider";
import AddSlider from "./Pages/Slider/AddSlide";
import UpdateSlide from "./Pages/Slider/UpdateSlide";
export const API_URL="http://localhost:1010";


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="updateuser/:id" element={<UpdateUser />} />
            <Route path="orders" element={<Orders />} />
            <Route path="brands" element={<Brands />} />
            <Route path="addbrand" element={<AddBrand />} />
            <Route path="updatebrand/:id" element={<UpdateBrand />} />
            <Route path="codes" element={<DiscountCode />} />
            <Route path="addcode" element={<AddDiscountCode />} />
            <Route path="updatecode/:id" element={<UpdateDiscountCode />} />
            <Route path="/addproducts" element={<AddProduct />} />
            <Route path="/updateproduct/:id" element={<UpdateProduct />} />
            <Route path="slider" element={<Slider />} />
            <Route path="addslider" element={<AddSlider />} />
            <Route path="updateslide/:id" element={<UpdateSlide />} />

          </Route>
        </Routes>
    </div>
  );
}

export default App;
