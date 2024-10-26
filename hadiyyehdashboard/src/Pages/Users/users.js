import React, { useEffect, useState } from "react";
import "../../Styles/Brands.css"; 
import axios from "axios";
import { API_URL } from "../../App";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import DeleteModule from "../../Components/DeleteModule";

function Users() {
  const navigate = useNavigate();
  const [users, setusers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setuserIdToDelete] = useState(null); // Store the ID of the user to delete

  const handleShow = (id) => {
    setuserIdToDelete(id); // Set the user ID to delete
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setuserIdToDelete(null); // Reset the ID when closing
  };

  const fetchusers = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/getalluser`);
      setusers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/auth/deleteuser/${id}`);
      setusers(users.filter((b) => b.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchusers();
  }, []);

  return (
    <div>
      <Link to="/adduser">
        <button type="button" className="btn btn-info d-flex justify-content-start px-4 py-2 mb-3">
          Add User
        </button>
      </Link>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">role</th>
              <th scope="col">Balance</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.balance}</td>
              
                <td>
                  <MdDelete
                    size="1.5rem"
                    className="delete_icon"
                    onClick={() => handleShow(user.id)} // Pass the user ID to handleShow
                  />
                  <FaEdit
                    size="1.5rem"
                    className="edit_icon"
                    onClick={() => navigate(`/updateuser/${user.id}`)}
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
       id={userIdToDelete} // Pass the user ID to DeleteModule
      />
    </div>
  );
}

export default Users;
