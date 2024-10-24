import React, { useEffect, useState } from "react";
import "../../Styles/Brands.css"; 
import axios from "axios";
import { API_URL } from "../../App";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import DeleteModule from "../../Components/DeleteModule";

function Brands() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [brandIdToDelete, setBrandIdToDelete] = useState(null); // Store the ID of the brand to delete

  const handleShow = (id) => {
    setBrandIdToDelete(id); // Set the brand ID to delete
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setBrandIdToDelete(null); // Reset the ID when closing
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/get/brands`);
      setBrands(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/product/delete/brand/${id}`);
      setBrands(brands.filter((b) => b.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div>
      <Link to="/addbrand">
        <button type="button" className="btn btn-info d-flex justify-content-start px-4 py-2">
          Add Brand
        </button>
      </Link>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Brand Name</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.brand_name}</td>
                <td>
                  <img
                    src={`${API_URL}/${brand.brand_img}`}
                    alt="brand"
                    height={"80"}
                  />
                </td>
                <td>
                  <MdDelete
                    size="1.5rem"
                    className="delete_icon"
                    onClick={() => handleShow(brand.id)} // Pass the brand ID to handleShow
                  />
                  <FaEdit
                    size="1.5rem"
                    className="edit_icon"
                    onClick={() => navigate(`/updatebrand/${brand.id}`)}
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
       id={brandIdToDelete} // Pass the brand ID to DeleteModule
      />
    </div>
  );
}

export default Brands;
