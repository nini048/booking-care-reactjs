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
      translateMessage("Please enter description / Vui lòng nhập mô tả", language)
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
    priceId: Yup.string().required(
      translateMessage("Please select a price / Vui lòng chọn giá khám", language)
    ),
    paymentId: Yup.string().required(
      translateMessage("Please select a payment method / Vui lòng chọn phương thức thanh toán", language)
    ),
    provinceId: Yup.string().required(
      translateMessage("Please select a province / Vui lòng chọn tỉnh/thành phố", language)
    ),
    addressClinic: Yup.string().required(
      translateMessage("Please enter clinic address / Vui lòng nhập địa chỉ phòng khám", language)
    ),
    nameClinic: Yup.string().required(
      translateMessage("Please enter clinic name / Vui lòng nhập tên phòng khám", language)
    ),
    note: Yup.string().nullable(), // Không bắt buộc
  });

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  const handleDoctorSelect = (selected, setFieldValue) => {
    if (selected) {
      setSelectedDoctor(selected);
      setFieldValue("doctorId", selected.value);
      dispatch(fetchInfoDetailDoctor(selected.value)).then((res) => {
        const info = res?.data || {};
        // Set Markdown
        if (info.markdownData) {
          setMarkdownValue({
            contentMarkdown: info.markdownData.contentMarkdown || "",
            contentHTML: info.markdownData.contentHTML || "",
          });
          setFieldValue("description", info.markdownData.description || "");
        } else {
          setMarkdownValue({ contentMarkdown: "", contentHTML: "" });
          setFieldValue("description", "");
        }
        // Set các trường khác
        if (info.doctorInfo) {
          setFieldValue("priceId", info.doctorInfo.priceId || "");
          setFieldValue("paymentId", info.doctorInfo.paymentId || "");
          setFieldValue("provinceId", info.doctorInfo.provinceId || "");
          setFieldValue("addressClinic", info.doctorInfo.addressClinic || "");
          setFieldValue("nameClinic", info.doctorInfo.nameClinic || "");
          setFieldValue("note", info.doctorInfo.note || "");
          setFieldValue("count", info.doctorInfo.count || 0);
        } else {
          setFieldValue("priceId", "");
          setFieldValue("paymentId", "");
          setFieldValue("provinceId", "");
          setFieldValue("addressClinic", "");
          setFieldValue("nameClinic", "");
          setFieldValue("note", "");
          setFieldValue("count", 0);
        }
        setIsUpdate(!!info.markdownData);
      });
    } else {
      // Reset form khi bỏ chọn
      setSelectedDoctor(null);
      setFieldValue("doctorId", "");
      setFieldValue("description", "");
      setMarkdownValue({ contentMarkdown: "", contentHTML: "" });
      setFieldValue("priceId", "");
      setFieldValue("paymentId", "");
      setFieldValue("provinceId", "");
      setFieldValue("addressClinic", "");
      setFieldValue("nameClinic", "");
      setFieldValue("note", "");
      setFieldValue("count", 0);
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
    console.log('values', values)
    const res = await dispatch(
      postInfoDetailDoctor({
        doctorId: values.doctorId,                 // ID bác sĩ
        description: values.description,           // Mô tả
        contentMarkdown: markdownValue.contentMarkdown, // Markdown
        contentHTML: markdownValue.contentHTML,    // HTML
        priceId: values.priceId,                   // Giá khám
        paymentId: values.paymentId,               // Phương thức thanh toán
        provinceId: values.provinceId,             // Tỉnh/TP
        addressClinic: values.addressClinic,       // Địa chỉ phòng khám
        nameClinic: values.nameClinic,             // Tên phòng khám
        note: values.note,                         // Ghi chú
        count: values.count || 0,                  // Số lượt khám (nếu cần)
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
            priceId: infoDoctor?.doctorInfo?.priceId || "",
            paymentId: infoDoctor?.doctorInfo?.paymentId || "",
            provinceId: infoDoctor?.doctorInfo?.provinceId || "",
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
                  <label className="form-label">
                    <FormattedMessage id="manage-doctor.price" />
                  </label>
                  <Select
                    value={priceOptions?.find(opt => opt.value === values.priceId) || null}
                    onChange={selected => setFieldValue("priceId", selected?.value)}
                    options={priceOptions}
                  />
                  <ErrorMessage name="priceId" component="div" className="text-danger" />
                </div>

                <div className="col-lg-4">
                  <label className="form-label">
                    <FormattedMessage id="manage-doctor.payment" />

                  </label>

                  <Select
                    value={paymentOptions?.find(opt => opt.value === values.paymentId) || null}
                    onChange={selected => setFieldValue("paymentId", selected?.value)}
                    options={paymentOptions}
                  />
                  <ErrorMessage name="paymentId" component="div" className="text-danger" />
                </div>

                <div className="col-lg-4">
                  <label className="form-label">
                    <FormattedMessage id="manage-doctor.city" />
                  </label>
                  <Select
                    value={provinceOptions?.find(opt => opt.value === values.provinceId) || null}
                    onChange={selected => setFieldValue("provinceId", selected?.value)}
                    options={provinceOptions}
                  />
                  <ErrorMessage name="provinceId" component="div" className="text-danger" />

                </div>

                <div className="col-lg-6">
                  <label className="form-label">
                    <FormattedMessage id="manage-doctor.address-clinic" />

                  </label>
                  <Field type="text" className="form-control" name="addressClinic" />
                  <ErrorMessage name="addressClinic" component="div" className="text-danger" />
                </div>

                <div className="col-lg-6">
                  <label className="form-label">
                    <FormattedMessage id="manage-doctor.name-clinic" />
                  </label>
                  <Field type="text" className="form-control" name="nameClinic" />
                  <ErrorMessage name="nameClinic" component="div" className="text-danger" />
                </div>

                <div className="col-12">
                  <label className="form-label">
                    <FormattedMessage id="manage-doctor.note" />
                  </label>
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

