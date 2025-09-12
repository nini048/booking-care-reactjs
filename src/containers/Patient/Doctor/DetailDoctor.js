import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorDetail.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInfoDetailDoctor } from '../../../store/actions';

const DetailDoctor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // lấy infoDoctor từ redux
  const inforDoctor = useSelector(state => state.admin.infoDoctor);

  useEffect(() => {
    dispatch(fetchInfoDetailDoctor(+id));
  }, [dispatch, id]);

  if (!inforDoctor || !inforDoctor.id) {
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">Đang tải thông tin bác sĩ...</div>
      </>
    );
  }

  const fullName = `${inforDoctor.positionData?.valueVi || ''} ${inforDoctor.lastName} ${inforDoctor.firstName}`;

  return (
    <>
      <HomeHeader isShowBanner={false} />
      <div className='doctor-detail-container'>
        {/* Phần giới thiệu bác sĩ */}
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
              {inforDoctor.markdownData?.description || "Chưa có mô tả."}
            </p>
          </div>
        </div>

        {/* Lịch khám (có thể sau này lấy từ API schedule) */}
        <div className='schedule-doctor'>
          <h3>Lịch khám</h3>
          <p>Thứ 2 - Thứ 6: 8h00 - 16h30</p>
          <p>Thứ 7: 8h00 - 12h00</p>
        </div>

        {/* Thông tin chi tiết */}
        <div className='detail-info-doctor'>
          <h3>Thông tin chi tiết</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: inforDoctor.markdownData?.contentHTML || "<p>Chưa có thông tin chi tiết.</p>",
            }}
          />
        </div>

        {/* Phần bình luận */}
        <div className='comment-doctor'>
          <h3>Ý kiến của bệnh nhân</h3>
          <p>⭐⭐⭐⭐⭐ Rất tận tâm và chuyên nghiệp!</p>
        </div>
      </div>
    </>
  );
};

export default DetailDoctor;
