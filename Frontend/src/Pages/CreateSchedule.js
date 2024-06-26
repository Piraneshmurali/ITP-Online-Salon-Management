import React, { useState } from "react";
import "./createSchedule.css";
import close from "./images/close.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateSchedule() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setcontact] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState(""); // Add description state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scheduleData = {
      name,
      contact,
      date,
      time,
      service,
      description, // Include description in the schedule data
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/schedu/make",
        scheduleData
      );

      if (response.status === 201) {
        navigate("/ScheduleManagement");
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
    <div className="createSchedule-page">
      <div className="createSchedule-container">
        <form onSubmit={handleSubmit}>
          <button onClick={navigteBack} className="close-button">
            <img className="close-icon" src={close} alt="close" />
          </button>

          <h1>Create a Schedule</h1>

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
              id="contact"
              name="contact"
              value={contact}
              onChange={(e) => setcontact(e.target.value)}
              required
            />
            <label htmlFor="contact">Contact</label>
          </div>

          <div className="schedule-date-input">
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

          <div className="schedule-time-input">
            <label htmlFor="time">Time</label> <br />
            <input
              type="time"
              id="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          
          {/* Add input for description */}
          <div className="input-box">
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label htmlFor="description">Description</label>
          </div>

          <button type="submit" className="createSchedule-button">
            Create Schedule
          </button>
        </form>
      </div>
    </div>
  );
}
