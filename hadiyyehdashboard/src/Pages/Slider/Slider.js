import React, { useEffect, useState } from "react";
import "../../Styles/Brands.css"; 
import axios from "axios";
import { API_URL } from "../../App";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import DeleteModule from "../../Components/DeleteModule";

function Slider() {
  const navigate = useNavigate();
  const [Slider, setSlider] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sliderIdToDelete, setsliderIdToDelete] = useState(null); // Store the ID of the slide to delete

  const handleShow = (id) => {
    setsliderIdToDelete(id); // Set the slide ID to delete
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setsliderIdToDelete(null); // Reset the ID when closing
  };

  const fetchSlider = async () => {
    try {
      const response = await axios.get(`${API_URL}/slider`);
      setSlider(response.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/slider/delete/${id}`);
      setSlider(Slider.filter((b) => b.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSlider();
  }, []);

  return (
    <div>
      <Link to="/addslider">
        <button type="button" className="btn btn-info d-flex justify-content-start px-4 py-2 mb-3">
          Add Slide
        </button>
      </Link>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Subtitle</th>
              <th scope="col">Link To</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Slider.map((slide) => (
              <tr key={slide.id}>
                <td>{slide.title}</td>
                <td>{slide.subtitle}</td>
                <td>{slide.link_to}</td>
                <td><img src={`${API_URL}/${slide.img}`} alt="slider" height={"100"}/></td>
              
                <td>
                  <MdDelete
                    size="1.5rem"
                    className="delete_icon"
                    onClick={() => handleShow(slide.id)} // Pass the slide ID to handleShow
                  />
                  <FaEdit
                    size="1.5rem"
                    className="edit_icon"
                    onClick={() => navigate(`/updateslide/${slide.id}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteModule 
        showModal={showModal} 
        handleClose={handleClose} 
        handleDelete={handleDelete} 
       id={sliderIdToDelete} // Pass the slide ID to DeleteModule
      />
    </div>
  );
}

export default Slider;
