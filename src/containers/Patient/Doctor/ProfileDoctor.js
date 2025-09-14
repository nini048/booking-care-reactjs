
import React from "react";
import "./ProfileDoctor.scss";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
const ProfileDoctor = ({ doctor }) => {
  const language = useSelector(state => state.app.language)
  const price = language === 'vi'
    ? `${doctor.doctorInfo.priceData.valueVi} VND`
    : `${doctor.doctorInfo.priceData.valueEn} USD`
  const provinvce = language === 'vi'
    ? doctor.doctorInfo.provinceData.valueVi
    : doctor.doctorInfo.provinceData.valueEn
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
        <p className="doctor-clinic">{doctor.doctorInfo.nameClinic}</p>

        <div className="doctor-detail">
          <p className="doctor-price">
            <FormattedMessage id='manage-doctor.price' />
            <span> {price}</span>
          </p>
          <p className="doctor-location">
            <FormattedMessage id='manage-doctor.address' />
            <span> {doctor.doctorInfo.addressClinic}</span>
          </p>
        </div>
      </div>
    </div >
  );
};

export default ProfileDoctor;
