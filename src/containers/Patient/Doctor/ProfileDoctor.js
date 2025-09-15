import React from "react";
import "./ProfileDoctor.scss";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

const ProfileDoctor = ({ doctor }) => {
  const language = useSelector(state => state.app.language);

  const price = language === 'vi'
    ? `${doctor?.doctorInfo?.priceData?.valueVi ?? 'Chưa có giá'} VND`
    : `${doctor?.doctorInfo?.priceData?.valueEn ?? 'No price'} USD`;

  const province = language === 'vi'
    ? doctor?.doctorInfo?.provinceData?.valueVi ?? 'Chưa có'
    : doctor?.doctorInfo?.provinceData?.valueEn ?? 'Unknown';

  const description = doctor?.markdownData?.description ?? '';
  const clinicName = doctor?.doctorInfo?.nameClinic ?? '';
  const clinicAddress = doctor?.doctorInfo?.addressClinic ?? '';

  const imageUrl = doctor?.image
    ? `http://localhost:8080/uploads/${doctor.image}`
    : "/default-avatar.png";

  return (
    <div className="profile-doctor">
      <img
        src={imageUrl}
        alt={doctor?.name ?? 'doctor'}
        className="doctor-avatar"
      />

      <div className="doctor-info">
        <h3 className="doctor-name">{doctor?.lastName} {doctor?.firstName}</h3>
        <p className="doctor-desc">{description}</p>
        <p className="doctor-clinic">{clinicName}</p>

        <div className="doctor-detail">
          <p className="doctor-price">
            <FormattedMessage id='manage-doctor.price' />
            <span> {price}</span>
          </p>
          <p className="doctor-location">
            <FormattedMessage id='manage-doctor.address' />
            <span> {clinicAddress}</span>
          </p>
          <p className="doctor-province">
            <FormattedMessage id='manage-doctor.city' />
            <span> {province}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDoctor;
