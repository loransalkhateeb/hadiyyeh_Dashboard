import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../App";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddDiscountCode() {
  const [code, setCode] = useState("");
  const [discount_percentage, setDiscount_percentage] = useState("");
  const [expiration_date, setexpiration_date] = useState("");
  const navigate = useNavigate();
  const handleAddDiscountCode = async (e) => {
    e.preventDefault();
   
    try {
      const response = await axios.post(
        `${API_URL}/discountcode/addcode`,
        {code,discount_percentage,expiration_date},
      );
      Swal.fire({
        title: "Success!",
        text: "Discount Code added successful.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/codes");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container ">
      <h1>Add Discount Code</h1>

      <form className="form_res" onSubmit={handleAddDiscountCode}>
        <div className="mb-3">
          <label htmlFor="Code" className="form-label">
            Code:
          </label>
          <input
            type="text"
            className="form-control"
            id="Code"
            required
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Code" className="form-label">
          Discount Percentage:
          </label>

          <input
            type="text"
            className="form-control"
            id="inputGroupFile02"
            required
            onChange={(e) => setDiscount_percentage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Code" className="form-label">
          Expiration Date:
          </label>

          <input
            type="date"
            className="form-control"
            id="inputGroupFile02"
            required
            onChange={(e) => setexpiration_date(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-info">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddDiscountCode;
