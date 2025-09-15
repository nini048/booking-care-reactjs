
import React, { useEffect, useRef, useState } from "react";
import "./ManageClinic.scss";
import Markdown from "../Admin/Markdown";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { createNewClinic, fetchAllClinic } from "../../../store/actions"; // action cho clinic
import Swal from "sweetalert2";
import { translateMessage } from "../../../utils/translateMessage";
import { useFormik } from "formik";
import * as Yup from "yup";

const ManageClinic = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const language = useSelector((state) => state.app.language);
  const clinics = useSelector(state => state.admin.clinics)
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    const fetchClinic = async () => {
      let res = await dispatch(fetchAllClinic())
      console.log(res)
    }
    fetchClinic()
  }, [dispatch])
  // Yup schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên phòng khám là bắt buộc"),
    address: Yup.string().required("Địa chỉ là bắt buộc"),
    image: Yup.mixed().required("Ảnh đại diện là bắt buộc"),
    contentMarkdown: Yup.string().required("Mô tả chi tiết là bắt buộc"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      image: null,
      contentMarkdown: "",
      contentHTML: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("contentHTML", values.contentHTML);
      formData.append("contentMarkdown", values.contentMarkdown);
      formData.append("image", values.image);

      let res = await dispatch(createNewClinic(formData));

      if (res && res.errorCode === 0) {
        Swal.fire({
          title: translateMessage("Success! / Thành công!", language),
          text: translateMessage(res.message, language),
          icon: "success",
          confirmButtonText: "OK",
        });

        resetForm();
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      } else {
        Swal.fire({
          title: translateMessage("Error! / Thất bại!", language),
          text: translateMessage(res.message, language),
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("image", file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="clinic-container container">
      <div className="title my-4 text-center fw-bold fs-4">Tạo phòng khám</div>

      <form onSubmit={formik.handleSubmit}>
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label">Tên phòng khám</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên phòng khám..."
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-danger mt-1">{formik.errors.name}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Địa chỉ</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập địa chỉ phòng khám..."
              {...formik.getFieldProps("address")}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-danger mt-1">{formik.errors.address}</div>
            )}
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label">Ảnh đại diện</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-danger mt-1">{formik.errors.image}</div>
            )}
          </div>

          <div className="col-md-6 d-flex flex-column align-items-center">
            <label className="form-label">Preview</label>
            <div className="avatar-preview mt-1">
              <img
                src={preview || "https://via.placeholder.com/200x150?text=Preview"}
                alt="Preview"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Mô tả chi tiết</label>
          <Markdown
            value={formik.values.contentMarkdown}
            onChange={({ text, html }) =>
              formik.setValues({
                ...formik.values,
                contentMarkdown: text,
                contentHTML: html,
              })
            }
          />
          {formik.touched.contentMarkdown && formik.errors.contentMarkdown && (
            <div className="text-danger mt-1">
              {formik.errors.contentMarkdown}
            </div>
          )}
        </div>

        <div className="text-end mt-3">
          <button type="submit" className="btn btn-secondary">
            Lưu phòng khám
          </button>
        </div>
      </form>
    </div>

  );
};

export default ManageClinic;
