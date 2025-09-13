// DoctorSchedule.js
import React, { useEffect, useState } from "react";
import "./DoctorSchedule.scss";
import { fetchAllCodeStart, fetchScheduleDoctor } from '../../../store/actions';
import { useDispatch, useSelector } from "react-redux";
import BookingModal from "./Modal/BookingModal";
import { ThreeDots } from "react-loader-spinner";
const DoctorSchedule = (props) => {
  const dispatch = useDispatch();
  const { doctorId } = props
  const isLoading = useSelector((state) => state.admin.isLoading);
  const [isBookingSucces, setIsBookingSuccess] = useState(false)
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const times = useSelector((state) => state.admin.times || []);
  const scheduleDoctor = useSelector(state => state.admin.scheduleDoctor?.data || []);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const doctor = useSelector(state => state.admin.infoDoctor || {});
  // Tạo 7 ngày tiếp theo
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return { label: `${day}/${month}/${year}`, value: `${year}-${month}-${day}` };
  });

  useEffect(() => {
    dispatch(fetchAllCodeStart("TIME"));
    if (doctorId && selectedDate) {
      dispatch(fetchScheduleDoctor(doctorId, selectedDate));
      setSelectedTimes([]); // reset khi đổi ngày
    }
  }, [dispatch, doctorId, selectedDate, isBookingSucces]);

  // Tạo map {T1: true/false} để biết bận/rảnh
  const availabilityMap = times.reduce((acc, t) => {
    acc[t.keyMap] = scheduleDoctor.some(s => s.timeType === t.keyMap);
    // console.log('acc', acc)
    return acc;
  }, {});

  const handleTimeClick = (slotKey, slotLabel) => {
    if (availabilityMap[slotKey]) return; // giờ đã bận
    setSelectedSlot({
      value: slotKey,
      label: slotLabel
    });
    setShowModal(true);
    setIsBookingSuccess(false)
  };

  console.log('times', times)
  return (
    <div className="doctor-schedule">
      {/* Chọn ngày */}
      <div className="date-picker-wrapper">
        <div
          className="date-display"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedDate || "Chọn ngày"}
          <span className="arrow">{showDropdown ? "▲" : "▼"}</span>
        </div>
        {showDropdown && (
          <ul className="date-dropdown">
            {next7Days.map(d => (
              <li
                key={d.value}
                className={selectedDate === d.value ? "selected-date" : ""}
                onClick={() => {
                  setSelectedDate(d.value);
                  setShowDropdown(false);
                }}
              >
                {d.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Time slots */}
      {isLoading ? (
        <div className="loading-wrapper text-center my-5">
          <ThreeDots height="30" width="40" radius="9" color="#0d6efd" visible={true} />
        </div>
      ) : (
        selectedDate && (
          <div className="time-slots">
            {times.map(slot => {
              const booked = availabilityMap[slot.keyMap];
              const selected = selectedTimes.includes(slot.keyMap);
              return (
                <button
                  key={slot.keyMap}
                  type="button"
                  className={`time-slot ${booked ? "busy" : "available"} ${selected ? "selected" : ""}`}
                  onClick={() => handleTimeClick(slot.keyMap, slot.valueVi)}
                  disabled={booked}
                >
                  {slot.valueVi}
                </button>
              );
            })}
          </div>
        )
      )}
      <BookingModal
        show={showModal}
        onClose={() => setShowModal(false)}
        selectedSlot={selectedSlot}
        doctor={doctor}
        slot={selectedSlot}
        date={selectedDate}
        setIsBookingSuccess={setIsBookingSuccess}
      />
    </div>
  );
};

export default DoctorSchedule;
