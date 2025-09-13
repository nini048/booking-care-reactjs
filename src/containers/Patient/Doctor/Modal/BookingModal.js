import React, { useEffect, useState } from "react";
import "./BookingModal.scss";
import ProfileDoctor from '../ProfileDoctor'
import { useDispatch, useSelector } from "react-redux";
import { postBookingAppointment, postScheduleDoctor } from "../../../../store/actions";
import { toast } from "react-toastify";
import { translateMessage } from "../../../../utils/translateMessage";
import { FormattedMessage } from "react-intl";
const BookingModal = (props) => {
  const dispatch = useDispatch()
  const language = useSelector(state => state.app.language)
  const { show, onClose, doctor, slot, date, setIsBookingSuccess } = props
  const genders = useSelector(state => state.admin.genders)
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
  console.log('slot', slot)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(postBookingAppointment({
      ...formData,
      doctorId: doctor.id,
      timeType: slot?.value,
      date: date
    }));

    if (res && res.errorCode === 0) {

      const res1 = await dispatch(postScheduleDoctor({
        doctorId: doctor.id,
        date: date,
        time: [slot.value]
      }));
      setIsBookingSuccess(true)

      toast.success(translateMessage("Booking successful! / Đặt lịch khám thành công!", language));
    } else {
      toast.error(translateMessage("Booking failed! / Đặt lịch thất bại!", language));
    }

    onClose(); // đóng modal sau khi thông báo

  };
  if (!show) return null;

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">
        <h2><FormattedMessage id="booking.modalTitle" /></h2>

        <ProfileDoctor doctor={doctor} />
        {/* Form đặt lịch */}
        <p className="slot-time">
          <FormattedMessage id="booking.slotTime" />
          <strong> {date} {slot.label}</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label><FormattedMessage id="booking.fullName" /></label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label><FormattedMessage id="booking.email" /></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><FormattedMessage id='booking.gender' /></label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="male">{translateMessage('Male / Nam', language)}</option>
                <option value="female">{translateMessage('Female / Nữ', language)}</option>
                <option value="other">{translateMessage('Other / Khác', language)}</option>
              </select>
            </div>
            <div className="form-group">
              <label><FormattedMessage id="booking.birthday" /></label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label><FormattedMessage id="booking.address" /></label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label><FormattedMessage id="booking.phoneNumber" /></label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-group">
            <label><FormattedMessage id="booking.reason" /></label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label><FormattedMessage id="booking.forWhom" /></label>
            <select
              name="forWhom"
              value={formData.forWhom}
              onChange={handleChange}
            >
              <option value="self">{translateMessage('Self / Bản thân', language)}</option>
              <option value="relative">{translateMessage('Relative / Người thân ', language)}</option>
            </select>
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
