import React, { useEffect, useState } from "react";
import "../../Styles/Brands.css"; 
import axios from "axios";
import { API_URL } from "../../App";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import DeleteModule from "../../Components/DeleteModule";

function DiscountCode() {
  const navigate = useNavigate();
  const [DiscountCode, setDiscountCode] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [codeIdToDelete, setcodeIdToDelete] = useState(null); // Store the ID of the codes to delete

  const handleShow = (id) => {
    setcodeIdToDelete(id); // Set the codes ID to delete
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setcodeIdToDelete(null); // Reset the ID when closing
  };

  const fetchDiscountCode = async () => {
    try {
      const response = await axios.get(`${API_URL}/discountcode/getcodes`);
      setDiscountCode(response.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/discountcode/deletecode/${id}`);
      setDiscountCode(DiscountCode.filter((b) => b.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDiscountCode();
  }, []);

  return (
    <div>
      <Link to="/addcode">
        <button type="button" className="btn btn-info d-flex justify-content-start px-4 py-2 mb-3">
          Add Discount Code
        </button>
      </Link>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Discount Percentage</th>
              <th scope="col">Expiration Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {DiscountCode.map((codes) => (
              <tr key={codes.id}>
                <td>{codes.code}</td>
                <td>{codes.discount_percentage}</td>
                <td>{codes.expiration_date}</td>
              
                <td>
                  <MdDelete
                    size="1.5rem"
                    className="delete_icon"
                    onClick={() => handleShow(codes.id)} // Pass the codes ID to handleShow
                  />
                  <FaEdit
                    size="1.5rem"
                    className="edit_icon"
                    onClick={() => navigate(`/updatecode/${codes.id}`)}
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
       id={codeIdToDelete} // Pass the codes ID to DeleteModule
      />
    </div>
  );
}

export default DiscountCode;
