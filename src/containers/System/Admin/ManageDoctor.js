import React, { useEffect, useState } from "react";
import Markdown from "./Markdown";
import Select from "react-select";
import './ManageDoctor.scss';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoctors } from "../../../store/actions";
import { FormattedMessage } from "react-intl";

const ManageDoctor = () => {
  const [selectedDoctor, setSelectedSoctor] = useState(null);
  const doctors = useSelector(state => state.admin.doctors)
  const language = useSelector(state => state.app.language)
  const [doctorData, setDoctorData] = useState({
    contentMarkdown: "",
    contentHTML: "",
    description: '',
  });

  const doctorOptions = doctors?.map(doc => ({
    value: doc.id,
    label: `${doc.firstName} ${doc.lastName}`
  }));
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchDoctors = async () => {
      let res = await dispatch(fetchAllDoctors())
      console.log('fetch all doctors: ', res)
    }
    fetchDoctors()
  }, [dispatch])

  const handleEditorChange = ({ html, text }) => {
    setDoctorData({
      ...doctorData,
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  const handleSelectChange = (selected) => {
    setSelectedSoctor(selected);
  };

  const handleSave = () => {
    console.log("Saved doctor data:", doctorData, selectedDoctor);
    alert("Lưu thông tin bác sĩ thành công!");
  };
  return (
    <div className="user-redux-container container">
      <div className="title my-4 text-center fw-bold fs-4">
        <FormattedMessage id='manage-doctor.title' />
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <label className="form-label">
            <FormattedMessage id='manage-doctor.select-doctor' />
          </label>
          <Select
            value={selectedDoctor}
            onChange={handleSelectChange}
            options={doctorOptions}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="col-lg-6">
          <label className="form-label">
            <FormattedMessage id='manage-doctor.description' />
          </label>
          <textarea
            className="form-control"
            rows={5}
            value={doctorData.description}
            onChange={(e) =>
              setDoctorData({
                ...doctorData,
                description: e.target.value
              })
            }
          />

        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <label className="form-label">
            <FormattedMessage id='manage-doctor.markdown' />
          </label>
          <Markdown
            value={doctorData.contentMarkdown}
            onChange={handleEditorChange}
          />
        </div>
      </div>

      <div className="text-end mt-3">
        <button className="btn btn-secondary" onClick={handleSave}>
          <FormattedMessage id='manage-doctor.save' />

        </button>
      </div>
    </div>
  );
};

export default ManageDoctor;
