
import React from "react";
import "./ProfileDoctor.scss";

const ProfileDoctor = ({ doctor }) => {
  if (!doctor) return null;

  console.log('doctor', doctor)
  return (
    <div className="profile-doctor">
      <img
        src={doctor.image ? `http://localhost:8080/uploads/${doctor.image}` : "/default-avatar.png"}
        alt={doctor.name}
        className="doctor-avatar"
      />

      <div className="doctor-info">
        <h3 className="doctor-name">{doctor.lastName} {doctor.firstName}</h3>
        <p className="doctor-desc">{doctor.markdownData.description}</p>
        <p className="doctor-price">
          Giá khám: <span>{doctor?.doctorInfo?.priceData?.valueVi || "Liên hệ"}</span>
        </p>
        <p className="doctor-location">
          Thành phố: <span>{doctor?.doctorInfo?.provinceData?.valueVi || "Liên hệ"}</span>
        </p>

      </div>
    </div>
  );
};

export default ProfileDoctor;
