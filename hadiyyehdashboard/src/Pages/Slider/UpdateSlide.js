import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../App";
import axios from "axios";
import Swal from "sweetalert2";

function UpdateSlide() {
  const [updateslide, setUpdateSlide] = useState({
    title: "",
    subtitle: "",
    link_to: "",
    img: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const response = await axios.get(`${API_URL}/slider/getbyid/${id}`);
        console.log(response.data[0].title);
        setUpdateSlide({
          title: response.data[0].title,
          subtitle: response.data[0].subtitle,
          link_to: response.data[0].link_to,
          img: response.data[0].img, // Set this to null initially; will update with file input
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchSlider();
  }, [id]);

  const handleUpdateSlide = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", updateslide.title);
    formData.append("subtitle", updateslide.subtitle);
    formData.append("link_to", updateslide.link_to);
    if (updateslide.img) {
      formData.append("img", updateslide.img);
    }

    try {
      await axios.put(`${API_URL}/slider/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Slide updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/slider");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setUpdateSlide({
      ...updateslide,
      [name]: type === "file" ? files[0] : value,
    });
  };

  return (
    <div className="container">
      <h1>Update Slide</h1>

      <form className="form_res" onSubmit={handleUpdateSlide}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            required
            value={updateslide.title}  // Use updateslide for value
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="subtitle" className="form-label">SubTitle:</label>
          <input
            type="text"
            className="form-control"
            id="subtitle"
            name="subtitle"
            required
            value={updateslide.subtitle}  // Use updateslide for value
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="link_to" className="form-label">Link To:</label>
          <input
            type="text"
            className="form-control"
            id="link_to"
            name="link_to"
            required
            value={updateslide.link_to}  // Use updateslide for value
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="img" className="form-label">Image:</label>
          <input
            type="file"
            className="form-control"
            id="img"
            name="img"
            onChange={handleChange}  // Update image when file is selected
          />
          {updateslide.img && <label className="form-label">{updateslide.img}</label>}
        </div>
        <button type="submit" className="btn btn-info">Submit</button>
      </form>
    </div>
  );
}

export default UpdateSlide;
