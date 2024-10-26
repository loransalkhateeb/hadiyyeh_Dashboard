import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../App";
import axios from "axios";
import Swal from "sweetalert2";

function UpdateBrand() {
  const [brand_name, setBrandName] = useState("");
  const [brand_img, setBrandImg] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/product/get/brandsbyid/${id}`
        );
        setBrandName(response.data.brand_name);
        setBrandImg(response.data.brand_img); // Assuming the response includes the image URL
      } catch (error) {
        console.error(error);
      }
    };

    fetchBrand();
  }, [id]);
  const handleUpdateBrand = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brand_name", brand_name);
    if (brand_img) {
      formData.append("brand_img", brand_img);
    }

    try {
      await axios.put(`${API_URL}/product/updatebrand/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Brand Updated successful.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/brands"); // Redirect to the brands page or any other page
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });    }
  };
  return (
    <div className="container ">
            <h1>Update Brand</h1>

      <form className="form_res" onSubmit={handleUpdateBrand}>
        <div className="mb-3">
          <label htmlFor="brandName" className="form-label">
            Brand Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="brandName"
            required
            value={brand_name}
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
          <label htmlFor="brandName" className="form-label">
            {brand_img}
          </label>
        </div>
        <button type="submit" className="btn btn-info">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateBrand;
