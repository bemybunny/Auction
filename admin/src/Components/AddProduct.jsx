import React, { useState } from 'react';
import '../CSS/addproduct.css';
import uploadImage from '../assets/upload_area.svg'
import axios from 'axios';

const AddProduct = () => {
  const [formField, setFormField] = useState({
    name: '',
    basePrice: '',
    credits: '',
    recentPerformance: '',
    file:null,
  });
  
  const handleChange = (e) => {
    const { name, value ,files} = e.target;
    if(name==='file' && files && files.length > 0){
      setFormField({
        ...formField,
        [name]: files[0],
      });
    }else{
      setFormField({
        ...formField,
        [name]:value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', formField.name);
    formData.append('basePrice', formField.basePrice);
    formData.append('credits', formField.credits);
    formData.append('recentPerformance', formField.recentPerformance);
    formData.append('file', formField.file);
  
    try {
      const response = await axios.post('http://localhost:4000/addproduct', formData);
      setFormField({
        name: '',
        basePrice: '',
        credits: '',
        recentPerformance: '',
        file: null,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <div className="addProduct">
      <form className="form" onSubmit={handleSubmit}>
        <div className="formele">
          <span>Name</span>
          <input
            type="text"
            name="name"
            placeholder="Enter Player Name"
            value={formField.name}
            onChange={handleChange}
          />
        </div>
        <div className="formele">
          <span>Base Price</span>
          <input
            type="text"
            name="basePrice"
            placeholder="Enter Base Price"
            value={formField.basePrice}
            onChange={handleChange}
          />
        </div>
        <div className="formele">
          <span>Credits</span>
          <input
            type="text"
            name="credits"
            placeholder="Enter Credit score"
            value={formField.credits}
            onChange={handleChange}
          />
        </div>
        <div className="formele">
          <span>Recent Performance</span>
          <input
            type="text"
            name="recentPerformance"
            placeholder="Enter Recent Performance"
            value={formField.recentPerformance}
            onChange={handleChange}
          />
        </div>
        <div className="formele">
            <span>Upload Image</span>
            <div className="formelebox">
              <input className="simpleinput" type="file" name="file" accept="image/*" onChange={handleChange}/>
              {formField.image === null ? (
                <img className="formfieldImage" src={uploadImage} alt="Upload Area" />
              ) : (
                <></>
                // <img className="formfieldImage" src={URL.createObjectURL(formField.image)} alt="Uploaded" />
              )}
            </div>
         
        </div>
        <button className="formbtn" type="submit">
            Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
