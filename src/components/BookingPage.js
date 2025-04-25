import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingPage = () => {
  const location = useLocation();
  const doctor = location.state?.doctor;

  if (!doctor) {
    return <div>No doctor information available</div>;
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1>Book Appointment with {doctor.name}</h1>
        <div className="doctor-info">
          <img src={doctor.photo} alt={doctor.name} className="doctor-photo" />
          <div className="doctor-details">
            <h2>{doctor.name}</h2>
            <p>{doctor.specialities.map(s => s.name).join(', ')}</p>
            <p>{doctor.experience}</p>
            <p>Consultation Fee: {doctor.fees}</p>
            <p className="doctor-introduction">{doctor.doctor_introduction}</p>
          </div>
        </div>
        
        <form className="booking-form">
          <div className="form-group">
            <label>Select Date:</label>
            <input type="date" required />
          </div>
          
          <div className="form-group">
            <label>Select Time Slot:</label>
            <select required>
              <option value="">Choose a time slot</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">02:00 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="16:00">04:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label>Patient Name:</label>
            <input type="text" required />
          </div>

          <div className="form-group">
            <label>Contact Number:</label>
            <input type="tel" required />
          </div>

          <button type="submit" className="submit-btn">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;