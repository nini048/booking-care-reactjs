import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDoctorsByClinic } from "../../../services/userService";
import { translateMessage } from "../../../utils/translateMessage";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import "./DetailClinic.scss";

const DetailClinic = () => {
  const { id } = useParams();
  const language = useSelector((state) => state.app.language);
  const [clinic, setClinic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        setIsLoading(true);
        const res = await getDoctorsByClinic(id);
        if (res?.data) {
          setClinic(res.data);
        }
      } catch (error) {
        console.error("Error fetching clinic:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClinic();
  }, [id]);

  return (
    <>
      <HomeHeader isShowBanner={false} />
      <div className="clinic-page container">
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <>
            <section className="clinic-page__header">
              <h1 className="clinic-page__title">
                {clinic?.name ? translateMessage(clinic.name, language) : "Clinic"}
              </h1>
              <p className="clinic-page__address">
                {clinic?.address ? translateMessage(clinic.address, language) : "No address available"}
              </p>
              <img
                src={
                  clinic?.image
                    ? `http://localhost:8080/uploads/${clinic.image}`
                    : "/default-clinic.png"
                }
                alt={clinic?.name || "Clinic Image"}
                className="clinic-page__image"
              />
            </section>

            <section className="clinic-page__description">
              {clinic?.contentHTML ? (
                <div
                  className="markdown-content"
                  dangerouslySetInnerHTML={{ __html: clinic.contentHTML }}
                />
              ) : (
                <p>No description available.</p>
              )}
            </section>

            <section className="clinic-page__doctors">
              <h2 className="clinic-page__subtitle">
                {translateMessage("Doctors in Clinic", language)}
              </h2>
              <div className="doctor-list">
                {clinic?.clinicData?.length > 0 ? (
                  clinic.clinicData.map((doc) => (
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
                  <p>No doctors found for this clinic.</p>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default DetailClinic;
