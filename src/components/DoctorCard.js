import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/booking', { state: { doctor } });
  };

  return (
    <div className="doctor-card" data-testid="doctor-card">
      <div className="doctor-image">
        <img 
          src={doctor.photo || '/placeholder-doctor.png'} 
          alt={doctor.name} 
          className="doctor-profile-pic"
        />
      </div>
      
      <div className="doctor-info">
        <h2 data-testid="doctor-name">{doctor.name}</h2>
        <p className="doctor-specialities" data-testid="doctor-specialty">
          {doctor.specialities?.map(spec => spec.name).join(', ')}
        </p>
        <p className="doctor-experience" data-testid="doctor-experience">
          {doctor.experience}
        </p>
        
        {doctor.clinic && (
          <div className="clinic-info">
            <h3>{doctor.clinic.name}</h3>
            <p>{doctor.clinic.address.locality}, {doctor.clinic.address.city}</p>
          </div>
        )}

        <div className="doctor-footer">
          <span data-testid="doctor-fee" className="fee">
            {doctor.fees}
          </span>
          <button onClick={handleBookAppointment} className="book-btn">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;