import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    sale: '',
    instock: '',
    brandID: '',
    brandName: '',
    firstImage: '',
    afterPrice: '',
    beforePrice: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:1010/product/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      Swal.fire({
        title: 'Success!',
        text: 'The product addition is successful.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/'); 
    } else {
      console.error('Failed to add product');
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add the product. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:1010/product/delete/${formData.brandID}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Product deleted successfully');
      navigate('/'); 
    } else {
      console.error('Failed to delete product');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add Product</h1>
      <form>
        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Sale', name: 'sale', type: 'number' },
          { label: 'In Stock', name: 'instock', type: 'number' },
          { label: 'Brand ID', name: 'brandID', type: 'text' },
          { label: 'Brand Name', name: 'brandName', type: 'text' },
          { label: 'First Image', name: 'firstImage', type: 'text' },
          { label: 'After Price', name: 'afterPrice', type: 'number' },
          { label: 'Before Price', name: 'beforePrice', type: 'number' },
        ].map(({ label, name, type }) => (
          <div className="mb-3 row" key={name}>
            <label htmlFor={name} className="col-sm-2 col-form-label">{label}:</label>
            <div className="col-sm-10">
              <input
                type={type}
                className="form-control"
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        ))}

        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Add Product
        </button>
        <button type="button" className="btn btn-danger" onClick={handleDelete} style={{ marginLeft: '20px' }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
