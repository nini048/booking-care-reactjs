import React, { useEffect, useState } from "react";
import Markdown from "./Markdown";
import Select from "react-select";
import "./ManageDoctor.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCodeStart,
  fetchAllDoctors,
  fetchInfoDetailDoctor,
  postInfoDetailDoctor,
} from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { translateMessage } from "../../../utils/translateMessage";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";

const ManageDoctor = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.admin.doctors);
  const language = useSelector((state) => state.app.language);
  const infoDoctor = useSelector((state) => state.admin.infoDoctor);
  const provinces = useSelector(state => state.admin.provinces)
  const payments = useSelector(state => state.admin.payments)
  const prices = useSelector(state => state.admin.prices)
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const isLoading = useSelector((state) => state.admin.isLoading);

  const [markdownValue, setMarkdownValue] = useState({
    contentMarkdown: "",
    contentHTML: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {

    const fetchCode = async () => {
      await dispatch(fetchAllCodeStart('PROVINCE'))
      await dispatch(fetchAllCodeStart('PAYMENT'))
      await dispatch(fetchAllCodeStart('PRICE'))
    }
    fetchCode()
  }, [dispatch])
  const doctorOptions = doctors?.map((doc) => ({
    value: doc.id,
    label: `${doc.firstName} ${doc.lastName}`,
  }));

  console.log('provices:', provinces)
  console.log('price:', prices)
  console.log('payments:', payments)
  const priceOptions = prices?.map(p => ({
    value: p.keyMap,
    label: language === "vi" ? p.valueVi : p.valueEn,
  }));

  const paymentOptions = payments?.map(p => ({
    value: p.keyMap,
    label: language === "vi" ? p.valueVi : p.valueEn,
  }));

  const provinceOptions = provinces?.map(p => ({
    value: p.keyMap,
    label: language === "vi" ? p.valueVi : p.valueEn,
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
        resetForm();
        setMarkdownValue({ contentMarkdown: "", contentHTML: "" });
        setIsUpdate(false);
      } else {
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

      {isLoading ? (
        <div className="loading-wrapper text-center my-5">
          <ThreeDots height="30" width="40" radius="9" color="#0d6efd" visible={true} />
        </div>
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            doctorId: selectedDoctor?.value || "",
            description: infoDoctor?.markdownData?.description || "",
            contentMarkdown: infoDoctor?.markdownData?.contentMarkdown || "",
            contentHTML: infoDoctor?.markdownData?.contentHTML || "",
            priceId: infoDoctor?.doctorInfo?.priceld || "",
            paymentId: infoDoctor?.doctorInfo?.paymentId || "",
            provinceId: infoDoctor?.doctorInfo?.provinceld || "",
            addressClinic: infoDoctor?.doctorInfo?.addressClinic || "",
            nameClinic: infoDoctor?.doctorInfo?.nameClinic || "",
            note: infoDoctor?.doctorInfo?.note || "",
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
                    value={doctorOptions.find((opt) => opt.value === values.doctorId) || null}
                    onChange={(selected) => handleDoctorSelect(selected, setFieldValue)}
                    options={doctorOptions}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                  <ErrorMessage name="doctorId" component="div" className="text-danger" />
                </div>

                <div className="col-lg-6">
                  <label className="form-label">
                    <FormattedMessage id="manage-doctor.description" />
                  </label>
                  <Field as="textarea" className="form-control" rows={5} name="description" />
                  <ErrorMessage name="description" component="div" className="text-danger" />
                </div>
              </div>

              {/* Select thông tin phòng khám */}
              <div className="row mt-4 g-4">
                <div className="col-lg-4">
                  <label className="form-label">Giá khám</label>
                  <Select
                    value={priceOptions?.find(opt => opt.value === values.priceId) || null}
                    onChange={selected => setFieldValue("priceId", selected?.value)}
                    options={priceOptions}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label">Phương thức thanh toán</label>
                  <Select
                    value={paymentOptions?.find(opt => opt.value === values.paymentId) || null}
                    onChange={selected => setFieldValue("paymentId", selected?.value)}
                    options={paymentOptions}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label">Tỉnh / Thành phố</label>
                  <Select
                    value={provinceOptions?.find(opt => opt.value === values.provinceId) || null}
                    onChange={selected => setFieldValue("provinceId", selected?.value)}
                    options={provinceOptions}
                  />
                </div>

                <div className="col-lg-6">
                  <label className="form-label">Địa chỉ phòng khám</label>
                  <Field type="text" className="form-control" name="addressClinic" />
                </div>

                <div className="col-lg-6">
                  <label className="form-label">Tên phòng khám</label>
                  <Field type="text" className="form-control" name="nameClinic" />
                </div>

                <div className="col-12">
                  <label className="form-label">Ghi chú</label>
                  <Field as="textarea" className="form-control" rows={3} name="note" />
                </div>
              </div>

              {/* Markdown editor */}
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

              {/* Button save/update */}
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
      )}
    </div>
  );
};

export default ManageDoctor;

