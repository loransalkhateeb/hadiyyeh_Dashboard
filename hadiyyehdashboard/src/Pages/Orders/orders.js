import React, { useEffect, useState } from "react";
import "../../Styles/Brands.css";
import axios from "axios";
import { API_URL } from "../../App";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import DeleteModule from "../../Components/DeleteModule";
import Swal from "sweetalert2";

function Orders() {
  const navigate = useNavigate();
  const [Orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [codeIdToDelete, setcodeIdToDelete] = useState(null); // Store the ID of the order to delete

  const handleShow = (id) => {
    setcodeIdToDelete(id); // Set the order ID to delete
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setcodeIdToDelete(null); // Reset the ID when closing
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/getallorders`);
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`${API_URL}/Orders/deletecode/${id}`);
  //     setOrders(Orders.filter((b) => b.id !== id));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    fetchOrders();
  }, []);
  const handleStatusOrder = async (order_id, status) => {
    try {
      const response = await axios.post(`${API_URL}/orders/confirmorrejectorder`, {
        order_id,
        status
      });
      console.log(response.data);
      Swal.fire({
        title: "Success!",
        text: "Order status updated successful.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === order_id ? { ...order, order_status: status } : order
        )
      );
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      Swal.fire({
        title: "Error!",
        text: "Failed to update Order status. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  
  return (
    <div>
      {/* <Link to="/addcode">
        <button type="button" className="btn btn-info d-flex justify-content-start px-4 py-2 mb-3">
          Add Discount Code
        </button>
      </Link> */}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">address</th>
              <th scope="col">address optional</th>
              <th scope="col">city</th>
              <th scope="col">country</th>
              <th scope="col">phone</th>
              <th scope="col" style={{width:"300px"}}>Order Items</th>
              <th scope="col">shipping method</th>
              <th scope="col">payment method</th>
              <th scope="col">total price</th>
              <th scope="col">order status</th>
              <th scope="col"> status</th>
              {/* <th scope="col">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {Orders.map((order) => (
              <tr key={order.order_id}>
                <td>
                  {order.first_name} {order.last_name}
                </td>
                <td>{order.email}</td>
                <td>{order.address}</td>
                <td>{order.addressoptional}</td>
                <td>{order.city}</td>
                <td>{order.country}</td>
                <td>{order.phone}</td>
                <td>{order.items.map((item)=>(
                 <li key={item.order_item_id}>
                 {item.product_name} (Qty: {item.quantity}, Price: {item.price} JD
                 {item.color && `, Color: ${item.color}`}
                 {item.size && `, Size: ${item.size}`}
                 {item.message && `, Message: ${item.message}`}
                 {item.wrap_type && `, Wrap Type: ${item.wrap_type}`}
                 {item.delivery_date && `, Delivery Date: ${item.delivery_date}`}
                 )
             </li>
                ))}</td>
                <td>{order.shipping_method}</td>
                <td>{order.payment_method}</td>
                <td>{order.total_price} JD</td>
                <td>{order.order_status}</td>
                {order.order_status === "Pending" ? (
                  <div>
                    <button
                      type="button"
                      className="btn btn-success d-flex justify-content-center px-3 py-2 mb-3" onClick={()=>{handleStatusOrder(order.order_id,'Confirmed')}}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger d-flex justify-content-center px-4 py-2 mb-3" onClick={()=>handleStatusOrder(order.order_id,'Rejected')}
                    >
                      Reject
                    </button>
                  </div>
                ):  <td></td>}

                {/* <td>
                  <MdDelete
                    size="1.5rem"
                    className="delete_icon"
                    onClick={() => handleShow(order.id)} // Pass the order ID to handleShow
                  />
                  <FaEdit
                    size="1.5rem"
                    className="edit_icon"
                    onClick={() => navigate(`/updatecode/${order.id}`)}
                  />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <DeleteModule
        showModal={showModal}
        handleClose={handleClose}
        handleDelete={handleDelete}
        id={codeIdToDelete} // Pass the order ID to DeleteModule
      /> */}
    </div>
  );
}

export default Orders;
