import React, { useState } from "react";
import "./addEmployee.css";
import close from "./images/close.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [NIC, setNIC] = useState("");
  const [joinedDate, setJoinedDate] = useState("");
  const [position, setPosition] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      id,
      name,
      NIC,
      joinedDate,
      position,
      address,
      phoneNo,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/employees/add",
        employeeData
      );

      console.log(employeeData);

      if (response.status === 201) {
        console.log(response);
        navigate("/EmployeeManagement");
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
    <div className="addEmployee-page">
      <div className="addEmployee-container">
        <form onSubmit={handleSubmit}>
          <button className="close-button">
            <img onClick={navigteBack} className="close-icon" src={close} />
          </button>

          <h1>Add new employee</h1>

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
              id="id"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <label htmlFor="id">Employee ID</label>
          </div>

          <div className="input-box">
            <input
              type="text"
              id="NIC"
              name="NIC"
              value={NIC}
              onChange={(e) => setNIC(e.target.value)}
              required
            />
            <label htmlFor="NIC">NIC</label>
          </div>

          <div className="updateEmployee-date-input">
            <label htmlFor="joinedDate">Joined date</label> <br />
            <input
              type="date"
              id="joinedDate"
              name="joinedDate"
              value={joinedDate}
              onChange={(e) => setJoinedDate(e.target.value)}
              required
            />
          </div>

          <div className="select-position-box">
            <select
              id="position"
              name="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            >
              <option value="Not Selected">Select Position</option>
              <option value="Hair dresser">Hair dresser</option>
              <option value="Nail technicial">Nail technicial</option>
              <option value="Wax specialist">Wax specialist</option>
              <option value="Colorist">Colorist</option>
            </select>
          </div>

          <div className="input-box">
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <label htmlFor="address">Address</label>
          </div>

          <div className="input-box">
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
            <label htmlFor="phoneNo">Contact No</label>
          </div>

          <button type="submit" className="addEmployee-button">
            Add employee
          </button>
        </form>
      </div>
    </div>
  );
}
