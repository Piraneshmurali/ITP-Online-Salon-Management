import React, { useState } from "react";
import "./addProduct.css";
import close from "./images/close.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [rquantity, setRquantity] = useState("");
  const [uquantity, setUquantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation for name
    if (!/^[A-Za-z\s]+$/.test(name)) {
      return toast.error("Name must contain only letters and spaces");
    }

    // Validation for remaining quantity
    if (!/^\d*$/.test(rquantity)) {
      return toast.error("Remaining quantity must be a positive integer");
    }

    // Validation for total price
    if (!/^\d*$/.test(totalPrice)) {
      return toast.error("Total price must be a positive integer");
    }

    const imageUrl = await uploadImage(uquantity);

    const inventoryData = {
      name,
      type,
      category,
      date,
      rquantity,
      uquantity: imageUrl,
      totalPrice,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/Product/add",
        inventoryData
      );

      console.log(inventoryData);

      if (response.status === 201) {
        console.log(response);
        navigate("/InventoryMnagement");
        toast.success("Product added successfully!");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to add product. Please try again.");
    }
  };

  const uploadImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append("myimage", image);
      const response = await fetch(
        "http://localhost:8000/image/uploadimage",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully:", data);
        return data.imageUrl;
      } else {
        console.error("Failed to upload the image.");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="addProduct-page">
      <div className="addProduct-container">
        <form onSubmit={handleSubmit}>
          <button className="close-button">
            <img onClick={navigateBack} className="close-icon" src={close} />
          </button>

          <h1>Add Products</h1>

          <div className="addProduct-input-box">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="addProduct-select-box">
            <select
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="Not Selected">Select type</option>
              <option value="Mens">Mens</option>
              <option value="Womens">Womens</option>
              <option value="Kids">Kids</option>
              <option value="Hair coloring products">
                Hair coloring products
              </option>
              <option value="Furniture">Furniture</option>
              <option value="Brushes">Brushes</option>
            </select>
          </div>

          <div className="addProduct-select-box">
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Not Selected">Select Category</option>
              <option value="Product">Product</option>
              <option value="Equipment">Equipment</option>
            </select>
          </div>

          <div className="addProduct-date-input">
            <label htmlFor="date">Date</label> <br />
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="addProduct-input-box">
            <input
              type="text"
              id="rquantity"
              name="rquantity"
              value={rquantity}
              onChange={(e) => setRquantity(e.target.value)}
              required
            />
            <label htmlFor="rquantity">Remaining quantity</label>
          </div>

          <div className="addProduct-input-box">
            <input
              type="file"
              id="uquantity"
              name="uquantity"
              accept="image/*"
              onChange={(e) => setUquantity(e.target.files[0])}
              required
            />
          </div>

          <div className="addProduct-input-box">
            <input
              type="text"
              id="totalPrice"
              name="totalPrice"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              required
            />
            <label htmlFor="totalPrice">Total Price</label>
          </div>

          <button type="submit" className="addProduct-button">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
