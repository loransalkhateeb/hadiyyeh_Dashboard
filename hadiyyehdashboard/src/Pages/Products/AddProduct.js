import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../Styles/AddProductStyle.css';

const AddProducts = () => {
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [watchData, setWatchData] = useState({
    name: '',
    description: '',
    sale: '',
    main_product_type: '',
    product_type: '',
    season: '',
    brandID: '',
    WatchTypeID: '',
    available: '',
    before_price: '',
    after_price: '',
    instock: '',
    img: null,
  });

  const [fragranceData, setFragranceData] = useState({
    name: '',
    description: '',
    sale: '',
    main_product_type: '',
    product_type: '',
    season: '',
    brandID: '',
    FragranceTypeID: '',
    size: '',
    available: '',
    before_price: '',
    after_price: '',
    instock: '',
    img: null,
  });

  const handleWatchChange = (e) => {
    const { id, value, type, files } = e.target;
    setWatchData({ ...watchData, [id]: type === 'file' ? files[0] : value });
  };

  const handleFragranceChange = (e) => {
    const { id, value, type, files } = e.target;
    setFragranceData({ ...fragranceData, [id]: type === 'file' ? files[0] : value });
  };

  const handleWatchSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append all watch data
    for (const key in watchData) {
      formDataToSend.append(key, watchData[key] || '');
    }

    fetch('http://localhost:1010/product/add', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        Swal.fire({
          title: 'Successfully Adding!',
          text: 'The watch has been added successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
        });

        
        setWatchData({
          name: '',
          description: '',
          sale: '',
          main_product_type: '',
          product_type: '',
          season: '',
          brandID: '',
          WatchTypeID: '',
          available: '',
          before_price: '',
          after_price: '',
          instock: '',
          img: null,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem adding the watch. Please try again.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  };

  const handleFragranceSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in fragranceData) {
      formDataToSend.append(key, fragranceData[key] || '');
    }

    fetch('http://localhost:1010/product/add', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        Swal.fire({
          title: 'Successfully Adding!',
          text: 'The fragrance has been added successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        
        setFragranceData({
          name: '',
          description: '',
          sale: '',
          main_product_type: '',
          product_type: '',
          season: '',
          brandID: '',
          FragranceTypeID: '',
          size: '',
          available: '',
          before_price: '',
          after_price: '',
          instock: '',
          img: null,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem adding the fragrance. Please try again.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  };

  const showForm = (type) => {
    setSelectedProductType(type);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5"> Add Products</h1>
      <div className="text-center mt-4 mb-4">
        <button className="btn btn-primary mx-2" onClick={() => showForm('watches')}>Watches</button>
        <button className="btn btn-primary mx-2" onClick={() => showForm('fragrance')}>Fragrance</button>
        <button className="btn btn-primary mx-2" onClick={() => showForm('bags')}>Bags</button>
      </div>

      {selectedProductType === 'watches' && (
        <div className="mt-4">
          <form onSubmit={handleWatchSubmit}>
            {Object.keys(watchData).map((key) => (
              <div className="form-group row" key={key}>
                <label htmlFor={key} className="col-sm-3 col-form-label">{key.replace(/_/g, ' ')}</label>
                <div className="col-sm-9">
                  {key === 'img' ? (
                    <input
                      type="file"
                      className="form-control"
                      id={key}
                      onChange={handleWatchChange}
                      style={{ marginBottom: '20px' }}
                      required={true}
                    />
                  ) : (
                    <input
                      type={key === 'available' || key === 'before_price' || key === 'after_price' ? 'number' : 'text'}
                      className="form-control"
                      id={key}
                      value={watchData[key]}
                      onChange={handleWatchChange}
                      style={{ marginBottom: '20px' }}
                    />
                  )}
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-success mx-2" style={{ flex: 1, maxWidth: '150px' }}>Confirm</button>
              <button type="button" className="btn btn-danger mx-2" onClick={() => setSelectedProductType(null)} style={{ flex: 1, maxWidth: '150px' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {selectedProductType === 'fragrance' && (
        <div className="mt-4">
          <form onSubmit={handleFragranceSubmit}>
            {Object.keys(fragranceData).map((key) => (
              <div className="form-group row" key={key}>
                <label htmlFor={key} className="col-sm-3 col-form-label">{key.replace(/_/g, ' ')}</label>
                <div className="col-sm-9">
                  {key === 'img' ? (
                    <input
                      type="file"
                      className="form-control"
                      id={key}
                      onChange={handleFragranceChange}
                      style={{ marginBottom: '20px' }}
                      required={true}
                    />
                  ) : (
                    <input
                      type={key === 'available' || key === 'before_price' || key === 'after_price' ? 'number' : 'text'}
                      className="form-control"
                      id={key}
                      value={fragranceData[key]}
                      onChange={handleFragranceChange}
                      style={{ marginBottom: '20px' }}
                    />
                  )}
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-success mx-2" style={{ flex: 1, maxWidth: '150px' }}>Confirm</button>
              <button type="button" className="btn btn-danger mx-2" onClick={() => setSelectedProductType(null)} style={{ flex: 1, maxWidth: '150px' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProducts;
