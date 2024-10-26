// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { API_URL } from "../../App";
// import axios from "axios";
// import Swal from "sweetalert2";

// function UpdateDiscountCode() {
//     const [code, setCode] = useState("");
//     const [discount_percentage, setDiscount_percentage] = useState("");
//     const [expiration_date, setexpiration_date] = useState("");
//   const navigate = useNavigate();
//   const { id } = useParams();
//   useEffect(() => {
//     const fetchDiscountCode= async () => {
//       try {
//         const response = await axios.get(
//           `${API_URL}/discountcode/getcodebyid/${id}`
//         );
//       setCode(response.data.code)
//       setDiscount_percentage(response.data.discount_percentage)
//       setexpiration_date(response.data.expiration_date)
//       } catch (error) {
//         console.error(error);
     
//       }
//     };

//     fetchDiscountCode();
//   }, [id]);
//   const handleUpdateDiscountCode = async (e) => {
//     e.preventDefault();
  
//     try {
//       await axios.put(`${API_URL}/product/updateDiscountCode/${id}`, {}, {
      
//       });
//       Swal.fire({
//         title: "Success!",
//         text: "Discount Code updated successful.",
//         icon: "success",
//         confirmButtonText: "OK",
//       });
//       navigate('/codes')
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         title: "Error!",
//         text: "Failed to add. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });    }
//   };
//   return (
//     <div className="container ">
//             <h1>Update Brand</h1>

//       <form className="form_res" onSubmit={handleUpdateDiscountCode}>
//         <div className="mb-3">
//           <label htmlFor="brandName" className="form-label">
//             Code:
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="brandName"
//             required
//             value={code}
//             onChange={(e) => {
//               setCode(e.target.value);
//             }}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="Code" className="form-label">
//           Discount Percentage:
//           </label>

//           <input
//             type="text"
//             className="form-control"
//             id="inputGroupFile02"
//             required
//             value={discount_percentage}
//             onChange={(e) => setDiscount_percentage(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="Code" className="form-label">
//           Expiration Date:
//           </label>

//           <input
//             type="date"
//             className="form-control"
//             id="inputGroupFile02"
//             required
//             value={expiration_date}
//             onChange={(e) => setexpiration_date(e.target.value)}
//           />
//         </div>
//         <button type="submit" className="btn btn-info">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default UpdateDiscountCode;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../App";
import axios from "axios";
import Swal from "sweetalert2";

function UpdateDiscountCode() {
    const [discountCode, setDiscountCode] = useState({
        code: "",
        discount_percentage: "",
        expiration_date: "",
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchDiscountCode = async () => {
            try {
                const response = await axios.get(`${API_URL}/discountcode/getcodebyid/${id}`);
                setDiscountCode(response.data); // Assuming the API response has the same structure
            } catch (error) {
                console.error(error);
            }
        };

        fetchDiscountCode();
    }, [id]);

    const handleUpdateDiscountCode = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`${API_URL}/discountcode/updatecode/${id}`, discountCode);
            Swal.fire({
                title: "Success!",
                text: "Discount Code updated successfully.",
                icon: "success",
                confirmButtonText: "OK",
            });
            navigate('/codes');
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
        setDiscountCode({
            ...discountCode,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="container">
            <h1>Update Discount Code</h1>
            <form className="form_res" onSubmit={handleUpdateDiscountCode}>
                <div className="mb-3">
                    <label htmlFor="code" className="form-label">Code:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="code"
                        name="code"
                        required
                        value={discountCode.code}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="discount_percentage" className="form-label">Discount Percentage:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="discount_percentage"
                        name="discount_percentage"
                        required
                        value={discountCode.discount_percentage}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="expiration_date" className="form-label">Expiration Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="expiration_date"
                        name="expiration_date"
                        required
                        value={discountCode.expiration_date}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-info">Submit</button>
            </form>
        </div>
    );
}

export default UpdateDiscountCode;
