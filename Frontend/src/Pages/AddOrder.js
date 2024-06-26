import React, { useState } from "react";
import "./addOrder.css";
import close from "./images/close.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddOrder() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      name,
      product,
      date,
      quantity,
      price,
      status,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/Ord/add",
        orderData
      );

      console.log(orderData);

      if (response.status === 201) {
        console.log(response);
        navigate("/OrderDetails");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const navigteBack = () => {
    navigate(-1);
  };

  return (
    <div className="addOrder-page">
      <div className="addOrder-container">
        <form onSubmit={handleSubmit}>
          <button onClick={navigteBack} className="close-button">
            <img className="close-icon" src={close} />
          </button>

          <h1>Add new order</h1>

          <div className="input-box">
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

          <div className="input-box">
            <input
              type="text"
              id="product"
              name="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
            />
            <label htmlFor="product">Product</label>
          </div>

          <div className="order-date-input">
            <label htmlFor="">Date</label> <br />
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <label htmlFor="quantity">Quantity</label>
          </div>

          <div className="input-box">
            <input
              type="text"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <label htmlFor="price">Price (LKR)</label>
          </div>

          <div className="select-order-box">
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Not Selected">Select Status</option>
              <option value="Recieved">Recieved</option>
              <option value="Not Recieved">Not Recieved</option>
            </select>
          </div>

          <button type="submit" className="addOrder-button">
            Add order
          </button>
        </form>
      </div>
    </div>
  );
}
