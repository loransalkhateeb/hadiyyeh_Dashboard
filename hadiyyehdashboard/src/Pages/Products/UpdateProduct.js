import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [AllData, setFormData] = useState({
    name: '',
    sale: '',
    instock: '',
    brandID: '',
    brandName: '',
    firstImage: '',
    afterPrice: '',
    beforePrice: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(id)
        const response = await fetch(`http://localhost:1010/product/${id}`);
        if (response.ok) {          
          const Bobject = await response.json();
          const product = Bobject.product;
          setFormData({
            name: product.name || '',
            sale: product.sale || '',
            instock: product.instock || '',
            brandID: product.brandID || '',
            brand_name: product.brand_name || '',
            firstImage: product.firstImage || '',
            after_price: product.after_price || '',
            before_price: product.before_price || '',
          });
        } else {
          console.error('Failed to fetch product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...AllData, [name]: value });
  };

  const handleUpdate = async () => {
    const response = await fetch(`http://localhost:1010/product/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(AllData),
    });

    if (response.ok) {
      Swal.fire({
        title: 'Success!',
        text: 'The update has been successfully completed.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/'); 
    } else {
      console.error('Failed to update product');
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update the product. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:1010/product/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      Swal.fire({
        title: 'Deleted!',
        text: 'The product has been deleted successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/'); 
    } else {
      console.error('Failed to delete product');
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete the product. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="container mt-5">
      <h1>Update Product</h1>
      <form>
        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Sale', name: 'sale', type: 'text' },
          { label: 'In Stock', name: 'instock', type: 'number' },
          { label: 'Brand ID', name: 'brandID', type: 'text' },
          { label: 'Brand Name', name: 'brand_name', type: 'text' },
          { label: 'First Image', name: 'firstImage', type: 'text' },
          { label: 'After Price', name: 'after_price', type: 'number' },
          { label: 'Before Price', name: 'before_price', type: 'number' },
        ].map(({ label, name, type }) => (
          <div className="mb-3 row" key={name}>
            <label htmlFor={name} className="col-sm-2 col-form-label">{label}:</label>
            <div className="col-sm-10">
              <input
                type={type}
                className="form-control"
                id={name}
                name={name}
                value={AllData?.[name]} 
                onChange={handleChange}
                required
              />
            </div>
          </div>
        ))}

        <button type="button" className="btn btn-secondary" onClick={handleUpdate}>
          Update
        </button>
        <button type="button" className="btn btn-danger" onClick={handleDelete} style={{ marginLeft: '20px' }}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
