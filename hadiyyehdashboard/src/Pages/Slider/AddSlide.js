import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../App";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddSlider() {
  const [title, settitle] = useState("");
  const [subtitle, setsubtitle] = useState("");
  const [link_to, setlink_to] = useState("");
  const [img, setImg] = useState(null);
  const navigate = useNavigate();
  const handleAddSlider = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("link_to", link_to);
    formData.append("img", img);

  
    try {
        const response = await axios.post(
          `${API_URL}/slider/add`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      Swal.fire({
        title: "Success!",
        text: "Slide added successful.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/slider");
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
      <h1>Add Slide</h1>

      <form className="form_res" onSubmit={handleAddSlider}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
          Subtitle:
          </label>

          <input
            type="text"
            className="form-control"
            id="inputGroupFile02"
            required
            onChange={(e) => setsubtitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
          Link To:
          </label>

          <input
            type="text"
            className="form-control"
            id="inputGroupFile02"
            required
            onChange={(e) => setlink_to(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brandName" className="form-label">
             Image:
          </label>

          <input
            type="file"
            className="form-control"
            id="inputGroupFile02"
            required
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-info">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddSlider;
