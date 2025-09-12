import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorDetail.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInfoDetailDoctor } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import DoctorSchedule from './DoctorSchedule';

const DetailDoctor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const language = useSelector(state => state.app.language)
  const inforDoctor = useSelector(state => state.admin.infoDoctor);

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
              <h4><FormattedMessage id='doctor-detail.address' /></h4>
              <p>{inforDoctor.address || '123 Đường ABC, Quận X, TP.HCM'}</p>
            </div>

            <div className='info-item'>
              <h4><FormattedMessage id='doctor-detail.payment' /></h4>
              <p>Giá khám: 200.000 VNĐ</p>
              <p>Thanh toán: Tiền mặt / Thẻ / Momo</p>
            </div>

            <div className='info-item'>
              <h4><FormattedMessage id='doctor-detail.other-info' /></h4>
              <p>Hỗ trợ bảo hiểm y tế</p>
              <p>Đặt lịch trước 1 ngày</p>
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
