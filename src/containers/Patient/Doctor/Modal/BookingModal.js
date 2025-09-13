import React, { useState } from "react";
import "./BookingModal.scss";
import ProfileDoctor from '../ProfileDoctor'

const BookingModal = (props) => {
  const { show, onClose, doctor, slot, date } = props
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    reason: "",
    forWhom: "self",
  });
  console.log('slot', slot)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking data:", formData);
    onClose();
  };

  // Nếu không show thì return null luôn
  if (!show) return null;

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">
        {/* Header bác sĩ */}
        <h2>Đặt lịch khám</h2>

        <ProfileDoctor doctor={doctor} />
        {/* Form đặt lịch */}
        <p className="slot-time">
          Thời gian: <strong>{date} {slot.label}</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Họ tên</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Lý do khám</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Đặt cho</label>
            <select
              name="forWhom"
              value={formData.forWhom}
              onChange={handleChange}
            >
              <option value="self">Bản thân</option>
              <option value="relative">Người thân</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Xác nhận
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
