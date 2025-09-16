import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDoctorsBySpecialty } from "../../../services/userService";
import { translateMessage } from "../../../utils/translateMessage";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import "./DetailSpecialty.scss";

const DetailSpecialty = () => {
  const { id } = useParams();
  const language = useSelector((state) => state.app.language);
  const [specialty, setSpecialty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialty = async () => {
      try {
        setIsLoading(true);
        const res = await getDoctorsBySpecialty(id);
        if (res?.data) {
          setSpecialty(res.data);
        }
      } catch (error) {
        console.error("Error fetching specialty:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSpecialty();
  }, [id]);

  return (
    <>
      <HomeHeader isShowBanner={false} />
      <div className="specialty-page container">
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <>
            <section className="specialty-page__header">
              <h1 className="specialty-page__title">
                {specialty?.name ? translateMessage(specialty.name, language) : "Specialty"}
              </h1>
              <img
                src={
                  specialty?.image
                    ? `http://localhost:8080/uploads/${specialty.image}`
                    : "/default-specialty.png"
                }
                alt={specialty?.name || "Specialty Image"}
                className="specialty-page__image"
              />
            </section>

            <section className="specialty-page__description">
              {specialty?.contentHTML ? (
                <div
                  className="markdown-content"
                  dangerouslySetInnerHTML={{ __html: specialty.contentHTML }}
                />
              ) : (
                <p>No description available.</p>
              )}
            </section>

            <section className="specialty-page__doctors">
              <h2 className="specialty-page__subtitle">
                {translateMessage("Doctors in the Department", language)}
              </h2>
              <div className="doctor-list">
                {specialty?.specialtyData?.length > 0 ? (
                  specialty.specialtyData.map((doc) => (
                    <div className="doctor-item" key={doc.id}>
                      <div className="doctor-item__content">
                        <div className="doctor-item__avatar-container">
                          <img
                            src={
                              doc.doctorData?.image
                                ? `http://localhost:8080/uploads/${doc.doctorData.image}`
                                : "/default-avatar.png"
                            }
                            alt={`${doc.doctorData?.firstName || "Doctor"} ${doc.doctorData?.lastName || ""}`}
                            className="doctor-item__avatar"
                          />
                        </div>
                        <div className="doctor-item__info">
                          <h3 className="doctor-item__name">
                            {doc.doctorData?.lastName} {doc.doctorData?.firstName}
                          </h3>
                          <p className="doctor-item__position">
                            {language === "vi"
                              ? doc.doctorData?.positionData?.valueVi
                              : doc.doctorData?.positionData?.valueEn}
                          </p>
                          <p className="doctor-item__description">
                            {translateMessage(doc.doctorData?.markdownData?.description, language) ||
                              "No description available."}
                          </p>
                        </div>
                        <div className="doctor-item__schedule">
                          <DoctorSchedule doctorId={doc.doctorId} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No doctors found for this specialty.</p>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default DetailSpecialty;
