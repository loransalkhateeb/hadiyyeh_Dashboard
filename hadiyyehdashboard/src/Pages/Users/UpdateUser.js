import axios from "axios";
import React, { useState,useEffect } from "react";
import { API_URL } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateUser() {
  const { id } = useParams();
const [user,setUser]=useState([])
  const [balance, setBalance] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/auth/getuserbyid/${id}`
        );
        setUser(response.data[0].balance);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserById();
  }, [id]);
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/auth/updateuser/${id}`, {
        balance,
      });
      Swal.fire({
        title: "Success!",
        text: "User Updated successful.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/users");
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

  return (
    <div className="container">
      <h1 className="mb-5">Update User</h1>
      <form className="form_res" onSubmit={handleUpdateUser}>
        <label htmlFor="brandName" className="form-label">
          Balance:
        </label>
        <input
          type="text"
          className="form-control"
          id="balance"
          value={user}
          onChange={(e) => {
            setBalance(e.target.value);
          }}
        />

        <button type="submit" className="btn btn-info mt-5">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
