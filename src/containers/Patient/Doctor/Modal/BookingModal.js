import React, { useState } from "react";
import "./BookingModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { postBookingAppointment } from "../../../../store/actions";
import { toast } from "react-toastify";
import { translateMessage } from "../../../../utils/translateMessage";
import { FormattedMessage } from "react-intl";

const BookingModal = ({ show, onClose, doctor, slot, date }) => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.app.language);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    reason: "",
    forWhom: "self",
    gender: "",
    birthday: ""
  });

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await dispatch(postBookingAppointment({
      ...formData,
      doctorId: doctor.id,
      timeType: slot?.value,
      date: date,
      doctorName: `${doctor.lastName} ${doctor.firstName}`
    }));
    setIsLoading(false);

    if (res && res.errorCode === 0) {
      toast.success(
        translateMessage(
          "Please check your email to confirm booking / Vui lòng kiểm tra email để xác nhận đặt lịch",
          language
        )
      );
      onClose();
    } else {
      toast.error(
        translateMessage("Booking failed! / Đặt lịch thất bại!", language)
      );
    }
  };

  // Dữ liệu bác sĩ
  const doctorName = `${doctor.lastName} ${doctor.firstName}`;
  const description = doctor?.markdownData?.description || '';
  const clinicName = doctor?.doctorInfo?.nameClinic || '';
  const clinicAddress = doctor?.doctorInfo?.addressClinic || '';
  const province = language === 'vi'
    ? doctor?.doctorInfo?.provinceData?.valueVi || 'Chưa có'
    : doctor?.doctorInfo?.provinceData?.valueEn || 'Unknown';
  const price = language === 'vi'
    ? `${doctor?.doctorInfo?.priceData?.valueVi || 'Chưa có giá'} VND`
    : `${doctor?.doctorInfo?.priceData?.valueEn || 'No price'} USD`;
  const imageUrl = doctor?.image
    ? `http://localhost:8080/uploads/${doctor.image}`
    : "/default-avatar.png";

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}

        <h2><FormattedMessage id="booking.modalTitle" /></h2>

        {/* Thông tin bác sĩ */}
        <div className="doctor-profile">
          <img src={imageUrl} alt={doctorName} className="doctor-avatar" />
          <div className="doctor-info">
            <h3>{doctorName}</h3>
          </div>
        </div>

        {/* Thông tin slot */}
        <p className="slot-time">
          <FormattedMessage id="booking.slotTime" />
          <strong> {date} {slot?.label}</strong>
        </p>

        {/* Form đặt lịch */}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label><FormattedMessage id="booking.fullName" /></label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label><FormattedMessage id="booking.email" /></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><FormattedMessage id='booking.gender' /></label>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="male">{translateMessage('Male / Nam', language)}</option>
                <option value="female">{translateMessage('Female / Nữ', language)}</option>
                <option value="other">{translateMessage('Other / Khác', language)}</option>
              </select>
            </div>
            <div className="form-group">
              <label><FormattedMessage id="booking.birthday" /></label>
              <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><FormattedMessage id="booking.address" /></label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label><FormattedMessage id="booking.phoneNumber" /></label>
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
          </div>



          <div className="form-actions">
            <button type="submit" className="btn-submit">
              <FormattedMessage id="booking.confirm" />
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              <FormattedMessage id="booking.cancel" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
