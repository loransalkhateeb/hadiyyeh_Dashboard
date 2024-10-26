import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../App";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddUser() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [balance, setBalance] = useState("");
  const navigate = useNavigate();
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/signup/post`, {
        first_name,
        last_name,
        password,
        email,
        role,
        balance,
      });
      Swal.fire({
        title: "Success!",
        text: "User added successful.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/users");
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
    <div className="container">
        <h1 className="mb-5">Add User</h1>
      <form  onSubmit={handleAddUser}>
        <div className="row" style={{textAlign:"left"}}>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="mb-3">
              <label htmlFor="brandName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required
                onChange={(e) => {
                  setFirst_name(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="mb-3">
              <label htmlFor="brandName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
                onChange={(e) => {
                  setLast_name(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="row"style={{textAlign:"left"}}>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="mb-3">
              <label htmlFor="brandName" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="mb-3">
              <label htmlFor="brandName" className="form-label">
                Email:
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="row" style={{textAlign:"left"}}>
          <div className="col-lg-6 col-md-12 col-sm-12 mb-3 ">
            <label htmlFor="brandName" className="form-label">
              Role:
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="role"
              id="role"
              onChange={(e) => {
                setRole(e.target.value);
              }}
              required
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
            <label htmlFor="brandName" className="form-label">
              Balance:
            </label>
            <input
              type="text"
              className="form-control"
              id="balance"
              onChange={(e) => {
                setBalance(e.target.value);
              }}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-info mt-5">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddUser;
