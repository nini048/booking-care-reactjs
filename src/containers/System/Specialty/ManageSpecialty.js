import React, { useRef, useState } from "react";
import "./ManageSpecialty.scss";
import Markdown from "../Admin/Markdown";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { createNewSpecialty } from "../../../store/actions";
import Swal from "sweetalert2";
import { translateMessage } from "../../../utils/translateMessage";
import { useFormik } from "formik";
import * as Yup from "yup";

const ManageSpecialty = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const language = useSelector((state) => state.app.language);

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Yup schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên chuyên khoa là bắt buộc"),
    image: Yup.mixed().required("Ảnh đại diện là bắt buộc"),
    contentMarkdown: Yup.string().required("Mô tả chi tiết là bắt buộc"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      image: null,
      contentMarkdown: "",
      contentHTML: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("contentHTML", values.contentHTML);
      formData.append("contentMarkdown", values.contentMarkdown);
      formData.append("image", values.image);
      let res = await dispatch(
        createNewSpecialty(formData)
      );

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
    <div className="specialty-container container">
      <div className="title my-4 text-center fw-bold fs-4">Tạo chuyên khoa</div>

      <form onSubmit={formik.handleSubmit}>
        <div className="row align-items-end mb-4">
          <div className="col-md-5">
            <label className="form-label">Tên chuyên khoa</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên chuyên khoa..."
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-danger mt-1">{formik.errors.name}</div>
            )}
          </div>

          <div className="col-md-4">
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

          <div className="col-md-3 d-flex flex-column align-items-center">
            <label className="form-label">Preview</label>
            <div className="avatar-preview mt-1">
              <img
                src={
                  preview || "https://via.placeholder.com/100x100?text=Avatar"
                }
                alt="Preview"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
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
            Lưu chuyên khoa
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageSpecialty;
