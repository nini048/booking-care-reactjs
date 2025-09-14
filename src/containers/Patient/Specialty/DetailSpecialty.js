import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getDoctorsBySpecialty } from "../../../services/userService";

import DoctorSchedule from '../Doctor/DoctorSchedule'
import './DetailSpecialty.scss'

const DetailSpecialty = () => {
  const dispatch = useDispatch();
  const [specialty, setSpecialty] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchSpecialty = async () => {
      const res = await getDoctorsBySpecialty(id);
      if (res && res.data) setSpecialty(res.data);
    };
    fetchSpecialty();
  }, [dispatch, id]);

  return (
    <div className="specialty-page container py-4">

      <div className="specialty-header text-center mb-5">
        <h1 className="fw-bold">{specialty.name}</h1>
        <img
          src={specialty.image ? `http://localhost:8080/uploads/${specialty.image}` : "/default-avatar.png"}
          alt={specialty.name}
          className="img-fluid rounded shadow-sm mt-3 specialty-image"
        />
      </div>

      <div className="specialty-description mb-5">
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: specialty.contentHTML }}
        />
      </div>

      <div className="specialty-doctors">
        <h2 className="fw-semibold mb-4">Bác sĩ trong khoa</h2>
        <div className="doctor-list">
          {specialty.specialtyData?.map((doc) => (
            <div className="doctor-item card mb-3 shadow-sm" key={doc.id}>
              <div className="row g-0 align-items-center">
                <div className="col-md-2 text-center">
                  <img
                    src={doc.doctorData?.image ? `http://localhost:8080/uploads/${doc.doctorData.image}` : "/default-avatar.png"}
                    alt={doc.doctorData?.firstName}
                    className="img-fluid rounded doctor-avatar"
                  />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">
                      {doc.doctorData?.lastName} {doc.doctorData?.firstName}
                    </h5>
                    <p className="card-text text-muted">
                      {doc.doctorData?.positionData?.valueVi}
                    </p>
                  </div>
                </div>
                <div className="col-md-3 text-center">
                  <DoctorSchedule doctorId={doc.id} />
                  <button className="btn btn-outline-primary btn-sm mt-2">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailSpecialty;
