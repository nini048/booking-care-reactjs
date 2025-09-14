import React from "react";
import './DeatailSpecialty.scss'
const DetailSpecialty = () => {
  // Hardcode dữ liệu
  const specialty = {
    id: 1,
    name: "Cardiology / Tim mạch",
    image: "https://via.placeholder.com/1200x300?text=Cardiology",
    description: `
## Giới thiệu chuyên khoa Tim mạch
Chuyên khoa Tim mạch tập trung vào chẩn đoán, điều trị và phòng ngừa các bệnh liên quan đến tim và hệ tuần hoàn.  

- Điều trị tăng huyết áp, bệnh mạch vành.  
- Siêu âm tim, đo điện tim, can thiệp tim mạch.  
- Theo dõi sau phẫu thuật tim.  
    `,
    doctors: [
      {
        id: 1,
        name: "Dr. Nguyễn Văn A",
        position: "Phó Giáo sư, Bác sĩ Tim mạch",
        image: "https://via.placeholder.com/150x150?text=Doctor+A",
      },
      {
        id: 2,
        name: "Dr. John Smith",
        position: "Cardiologist",
        image: "https://via.placeholder.com/150x150?text=Doctor+B",
      },
    ],
  };

  return (
    <div className="specialty-page container py-4">
      {/* Tiêu đề + ảnh */}
      <div className="specialty-header text-center mb-5">
        <h1 className="fw-bold">{specialty.name}</h1>
        <img
          src={specialty.image}
          alt={specialty.name}
          className="img-fluid rounded shadow-sm mt-3"
        />
      </div>

      {/* Mô tả Markdown */}
      <div className="specialty-description mb-5">
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: specialty.description }}
        />
      </div>

      {/* Danh sách bác sĩ */}
      <div className="specialty-doctors">
        <h2 className="fw-semibold mb-4">Bác sĩ trong khoa</h2>
        <div className="row g-4">
          {specialty.doctors.map((doc) => (
            <div className="col-md-4" key={doc.id}>
              <div className="doctor-card card h-100 shadow-sm">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{doc.name}</h5>
                  <p className="card-text text-muted">{doc.position}</p>
                  <button className="btn btn-outline-primary btn-sm">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailSpecialty;
