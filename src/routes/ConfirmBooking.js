
// src/pages/ConfirmBooking.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ConfirmBooking = () => {
  const location = useLocation();
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/confirm-booking?token=${token}`)
        .then((res) => {
          if (res.data.errorCode === 0) {
            setMessage("Booking confirmed! / Đặt lịch thành công!");
          } else {
            setMessage(res.data.message);
          }
        })
        .catch((err) => {
          console.error(err);
          setMessage("Error confirming booking / Lỗi xác nhận");
        });
    } else {
      setMessage("Invalid token / Token không hợp lệ");
    }
  }, [location]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default ConfirmBooking;
