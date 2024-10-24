import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const DataFetchingComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:1010/product/get/allproducts'); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const handleDelete = async (productId) => {
    console.log('Deleting:', productId);
    const response = await fetch(`http://localhost:1010/product/delete/${productId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
     
      setData((prevData) => prevData.filter(product => product.id !== productId));
    } else {
      const errorMessage = await response.text(); 
      console.error('Failed to delete the product:', errorMessage);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  };
  
  const cellStyle = {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
  };
  
  const headerStyle = {
    ...cellStyle,
    backgroundColor: '#f2f2f2',
  };

  return (
    <div>
      <h1>
        Get All Products
        <button type="button" className="btn btn-primary" style={{ marginLeft: '20px' }} onClick={() => navigate('/addproducts')}>
          Add Product
        </button>
      </h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>ID</th>
            <th style={headerStyle}>Name</th>
            <th style={headerStyle}>Sale</th>
            <th style={headerStyle}>In Stock</th>
            <th style={headerStyle}>Brand ID</th>
            <th style={headerStyle}>Brand Name</th>
            <th style={headerStyle}>First Image</th>
            <th style={headerStyle}>After Price</th>
            <th style={headerStyle}>Before Price</th>
            <th style={headerStyle}>Settings</th>
          </tr>
        </thead>
        <tbody>
          {data.map(product => (
            <tr key={product.id}>
              <td style={cellStyle}>{product.id}</td>
              <td style={cellStyle}>{product.name}</td>
              <td style={cellStyle}>{product.sale}</td>
              <td style={cellStyle}>{product.instock}</td>
              <td style={cellStyle}>{product.brandID}</td>
              <td style={cellStyle}>{product.brand_name}</td>
              <td style={cellStyle}>{product.first_image}</td>
              <td style={cellStyle}>{product.after_price}</td>
              <td style={cellStyle}>{product.before_price}</td>
              <td style={cellStyle}>
                <button type="button" className="btn btn-secondary" style={{ marginRight: '20px' }} onClick={() => navigate(`/updateproduct/${product.id}`)}>
                  Update
                </button>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataFetchingComponent;
