import React, { useEffect, useState } from "react";
import Markdown from "./Markdown";
import Select from "react-select";
import "./ManageDoctor.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDoctors,
  fetchInfoDetailDoctor,
  postInfoDetailDoctor,
} from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { translateMessage } from "../../../utils/translateMessage";
import Swal from "sweetalert2";

const ManageDoctor = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.admin.doctors);
  const language = useSelector((state) => state.app.language);
  const infoDoctor = useSelector((state) => state.admin.infoDoctor);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [markdownValue, setMarkdownValue] = useState({
    contentMarkdown: "",
    contentHTML: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const doctorOptions = doctors?.map((doc) => ({
    value: doc.id,
    label: `${doc.firstName} ${doc.lastName}`,
  }));

  const validationSchema = Yup.object().shape({
    doctorId: Yup.number().required(
      translateMessage("Please select a doctor / Vui lòng chọn bác sĩ", language)
    ),
    description: Yup.string().required(
      translateMessage("Please emter description / Vui lòng nhập mô tả", language)

    ),
    contentMarkdown: isUpdate
      ? Yup.string().nullable()
      : Yup.string().required(
        translateMessage(
          "Please enter Markdown content / Vui lòng nhập nội dung Markdown",
          language
        )
      ),
    contentHTML: isUpdate
      ? Yup.string().nullable()
      : Yup.string().required(
        translateMessage(
          "Please enter HTML content / Vui lòng nhập nội dung HTML",
          language
        )
      ),
  });

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  const handleDoctorSelect = (selected, setFieldValue) => {
    if (selected) {
      setSelectedDoctor(selected);
      setFieldValue("doctorId", selected.value);
      dispatch(fetchInfoDetailDoctor(selected.value));
    } else {
      setFieldValue("doctorId", "");
      setFieldValue("description", "");
      setMarkdownValue({ contentMarkdown: "", contentHTML: "" });
      setIsUpdate(false);
    }
  };

  const { setFieldValue } = useFormikContext() || {};
  useEffect(() => {
    if (infoDoctor && infoDoctor.markdownData) {
      setIsUpdate(true);

      setMarkdownValue({
        contentMarkdown: infoDoctor.markdownData.contentMarkdown || "",
        contentHTML: infoDoctor.markdownData.contentHTML || "",
      });
    } else {
      setIsUpdate(false);
      setMarkdownValue({ contentMarkdown: "", contentHTML: "" });
    }
  }, [infoDoctor]);

  // useEffect(() => {
  //   if (infoDoctor && infoDoctor.markdownData) {
  //     setIsUpdate(true); // có dữ liệu thì update
  //     setFieldValue?.("description", infoDoctor.markdownData.description || "");
  //     setMarkdownValue({
  //       contentMarkdown: infoDoctor.markdownData.contentMarkdown || "",
  //       contentHTML: infoDoctor.markdownData.contentHTML || "",
  //     });
  //   } else {
  //     setIsUpdate(false); // không có dữ liệu thì tạo mới
  //     setFieldValue?.("description", "");
  //     setMarkdownValue({ contentMarkdown: "", contentHTML: "" });
  //   }
  // }, [infoDoctor, setFieldValue]);

  const handleSave = async (values, { resetForm, setValues }) => {
    const res = await dispatch(
      postInfoDetailDoctor({
        ...values,
        contentMarkdown: markdownValue.contentMarkdown,
        contentHTML: markdownValue.contentHTML,
        description: values.description,
        id: values.doctorId,
        action: isUpdate ? "UPDATE" : "CREATE",
      })
    );

    if (res && res.errorCode === 0) {
      Swal.fire({
        title: translateMessage("Success! / Thành công!", language),
        text: translateMessage(res.message, language),
        icon: "success",
        confirmButtonText: "OK",
      });

      if (!isUpdate) {
        // Nếu CREATE mới reset
        resetForm();
        setMarkdownValue({ contentMarkdown: "", contentHTML: "" });
        setIsUpdate(false);
      } else {
        // Nếu UPDATE thì giữ nguyên, chỉ đồng bộ lại Formik values
        setValues({
          ...values,
          contentMarkdown: markdownValue.contentMarkdown,
          contentHTML: markdownValue.contentHTML,
        });
      }
    } else {
      Swal.fire({
        title: translateMessage("Error! / Thất bại!", language),
        text: translateMessage(res.message, language),
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="user-redux-container container">
      <div className="title my-4 text-center fw-bold fs-4">
        <FormattedMessage id="manage-doctor.title" />
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          doctorId: selectedDoctor?.value || "",
          description: infoDoctor?.markdownData?.description || "",
          contentMarkdown: infoDoctor?.markdownData?.contentMarkdown || "",
          contentHTML: infoDoctor?.markdownData?.contentHTML || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="row g-4">
              <div className="col-lg-6">
                <label className="form-label">
                  <FormattedMessage id="manage-doctor.select-doctor" />
                </label>
                <Select
                  value={
                    doctorOptions.find((opt) => opt.value === values.doctorId) ||
                    null
                  }
                  onChange={(selected) =>
                    handleDoctorSelect(selected, setFieldValue)
                  }
                  options={doctorOptions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
                <ErrorMessage
                  name="doctorId"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col-lg-6">
                <label className="form-label">
                  <FormattedMessage id="manage-doctor.description" />
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  rows={5}
                  name="description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <label className="form-label">
                  <FormattedMessage id="manage-doctor.markdown" />
                </label>
                <Markdown
                  value={markdownValue.contentMarkdown}
                  onChange={({ text, html }) => {
                    setMarkdownValue({ contentMarkdown: text, contentHTML: html });
                    setFieldValue("contentMarkdown", text);
                    setFieldValue("contentHTML", html);
                  }}
                />
                <ErrorMessage
                  name="contentMarkdown"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="text-end mt-3">
              <button type="submit" className="btn btn-secondary">
                {isUpdate ? (
                  <FormattedMessage id="manage-doctor.update" />
                ) : (
                  <FormattedMessage id="manage-doctor.save" />
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ManageDoctor;
