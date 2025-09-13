import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorDetail.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsersStart, fetchInfoDetailDoctor } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import DoctorSchedule from './DoctorSchedule';

const DetailDoctor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const language = useSelector(state => state.app.language)
  const inforDoctor = useSelector(state => state.admin.infoDoctor);


  console.log('info doctor', inforDoctor)
  useEffect(() => {
    dispatch(fetchInfoDetailDoctor(+id));
  }, [dispatch, id]);

  if (!inforDoctor || !inforDoctor.id) {
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <FormattedMessage id='doctor-detail.loading' />
        </div>
      </>
    );
  }

  const fullName = language === 'vi'
    ? `${inforDoctor.positionData?.valueVi || ''} ${inforDoctor.lastName} ${inforDoctor.firstName}`
    : `${inforDoctor.positionData?.valueEn || ''} ${inforDoctor.firstName} ${inforDoctor.lastName}`;

  const price = language === 'vi'
    ? `${inforDoctor.doctorInfo?.priceData?.valueVi || ''}`
    : `${inforDoctor.doctorInfo?.priceData?.valueEn || ''}`;

  const payment = language === 'vi'
    ? `${inforDoctor.doctorInfo?.paymentData?.valueVi || ''}`
    : `${inforDoctor.doctorInfo?.paymentData?.valueEn || ''}`;
  return (
    <>
      <HomeHeader isShowBanner={false} />
      <div className='doctor-detail-container'>
        {/* Giới thiệu bác sĩ */}
        <div className='intro-doctor'>
          <div className='content-left'>
            <img
              src={inforDoctor.image ? `http://localhost:8080/uploads/${inforDoctor.image}` : "/default-avatar.png"}
              alt='doctor-avatar'
              className='doctor-avatar'
            />
          </div>
          <div className='content-right'>
            <h2 className='doctor-name'>{fullName}</h2>
            <p className='doctor-description'>
              {inforDoctor.markdownData?.description ||
                <FormattedMessage id='doctor-detail.no-description' />}
            </p>
          </div>
        </div>

        {/* Lịch khám + thông tin */}
        <div className='schedule-info-wrapper'>
          <div className='schedule-column'>
            <h3><FormattedMessage id='doctor-detail.schedule' /></h3>
            <DoctorSchedule doctorId={id} />
          </div>

          <div className='info-column'>
            <div className='info-item'>
              <h4><FormattedMessage id='doctor-detail.clinic-info' /></h4>
              <p><strong>Phòng khám:</strong> {inforDoctor.doctorInfo?.nameClinic || 'Chưa có'}</p>
              <p><strong>Địa chỉ:</strong> {inforDoctor.doctorInfo?.addressClinic || 'Chưa có'}</p>
            </div>

            <div className='info-item'>
              <h4><FormattedMessage id='doctor-detail.price-payment' /></h4>
              <p><strong>Giá khám:</strong> {price || 'Chưa có'}</p>
              <p><strong>Thanh toán:</strong> {payment || 'Chưa có'}</p>
            </div>

          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className='detail-info-doctor'>
          <h3>
            <FormattedMessage id='doctor-detail.detail-info' />
          </h3>
          <div className='markdown-content'
            dangerouslySetInnerHTML={{
              __html: inforDoctor.markdownData?.contentHTML ||
                "<FormattedMessage id='no-detail-info'/>",
            }}
          />
        </div>

        {/* Bình luận */}
        <div className='comment-doctor'>
          <h3>
            <FormattedMessage id='doctor-detail.patient-opinion' />
          </h3>
          <p>⭐⭐⭐⭐⭐ Rất tận tâm và chuyên nghiệp!</p>
        </div>
      </div>
    </>
  );
};

export default DetailDoctor;
