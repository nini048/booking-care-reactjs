import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCodeStart, fetchAllDoctors, postScheduleDoctor } from "../../../../store/actions";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ManageSchedule.scss";
import Swal from "sweetalert2";
import { translateMessage } from "../../../../utils/translateMessage";
import { ThreeDots } from "react-loader-spinner";

const ManageSchedule = () => {
  const doctors = useSelector((state) => state.admin.doctors || []);
  const times = useSelector((state) => state.admin.times || []);
  const dispatch = useDispatch();
  const language = useSelector(state => state.app.language)
  const maxNumber = 5
  const today = new Date().toISOString().split("T")[0];

  const isLoading = useSelector((state) => state.admin.isLoading);
  useEffect(() => {
    dispatch(fetchAllDoctors());
    dispatch(fetchAllCodeStart("TIME"));
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    doctorId: Yup.number().required("Please select a doctor"),
    date: Yup.string()
      .required("Please select a date")
      .test("is-future", "Cannot select a past date", (value) => {
        return value >= today;
      }),
    time: Yup.array().min(1, "Please select at least one time slot"),
  });

  const handleSubmit = async (values, { resetForm, setFieldValue }) => {
    if (!values.time || values.time.length === 0) {
      Swal.fire("Error!", "Please select at least one time slot", "error");
      return;
    }

    const formattedData = {
      doctorId: values.doctorId,
      date: values.date,
      time: values.time,
      maxNumber: maxNumber,
      currentNumber: values.time.length,
    };

    const res = await dispatch(postScheduleDoctor(formattedData));

    if (res.errorCode === 0) {
      Swal.fire({
        title: translateMessage("Success! / Thành công!", language),
        text: translateMessage(res.message, language),
        icon: "success",
        confirmButtonText: "OK",
      });
      resetForm();
    } else if (res.errorCode === 2) {
      Swal.fire({
        title: translateMessage("Error! / Thất bại!", language),
        text: translateMessage(res.message, language),
        icon: "error",
        confirmButtonText: "OK",
      });
      // Giữ lại form, user có thể chọn thêm time khác
    } else {
      Swal.fire("Error!", res.message, "error");
    }
  };

  return (
    <div className="manage-schedule-container container">
      <div className="title my-4 text-center fw-bold fs-4">
        Manage Schedule
      </div>

      {isLoading ? (
        <div className="loading-wrapper text-center my-5">
          <ThreeDots height="60" width="60" radius="9" color="#0d6efd" visible={true} />
        </div>
      ) : (
        <Formik
          enableReinitialize
          initialValues={{ doctorId: "", date: today, time: [] }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <Form className="row g-4" onSubmit={handleSubmit}>
              <div className="col-md-4">
                <label className="form-label">Select Doctor</label>
                <select
                  className="form-select"
                  value={values.doctorId}
                  onChange={(e) => setFieldValue("doctorId", +e.target.value)}
                >
                  <option value="">-- Select Doctor --</option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.lastName} {doc.firstName}
                    </option>
                  ))}
                </select>
                <ErrorMessage
                  name="doctorId"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Select Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={values.date}
                  min={today}
                  onChange={(e) => setFieldValue("date", e.target.value)}
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col-md-12">
                <label className="form-label">Select Time Slots</label>
                <div className="time-slots">
                  {times.map((slot) => (
                    <button
                      key={slot.keyMap}
                      type="button"
                      className={`time-slot ${values.time.includes(slot.keyMap) ? "selected" : ""
                        }`}
                      onClick={() => {
                        if (values.time.includes(slot.keyMap)) {
                          setFieldValue(
                            "time",
                            values.time.filter((t) => t !== slot.keyMap)
                          );
                        } else {
                          setFieldValue("time", [...values.time, slot.keyMap]);
                        }
                      }}
                    >
                      {slot.valueVi}
                    </button>
                  ))}
                </div>
                <ErrorMessage
                  name="time"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col-12 text-end">
                <button type="submit" className="btn btn-secondary">
                  Save Schedule
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}

    </div>
  );
};

export default ManageSchedule;
