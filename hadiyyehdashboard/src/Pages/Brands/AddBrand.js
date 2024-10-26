import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../App";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddBrand() {
  const [brand_name, setBrandName] = useState("");
  const [brand_img, setBrandImg] = useState(null);
  const navigate = useNavigate();
  const handleAddBrand = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brand_name", brand_name);
    formData.append("brand_img", brand_img);

    try {
      const response = await axios.post(
        `${API_URL}/product/addbrand`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "Brand added successful.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/brands");
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
      <h1>Add Brand</h1>

      <form className="form_res" onSubmit={handleAddBrand}>
        <div className="mb-3">
          <label htmlFor="brandName" className="form-label">
            Brand Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="brandName"
            required
            onChange={(e) => {
              setBrandName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brandName" className="form-label">
            Brand Image:
          </label>

          <input
            type="file"
            className="form-control"
            id="inputGroupFile02"
            required
            onChange={(e) => setBrandImg(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-info">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddBrand;
