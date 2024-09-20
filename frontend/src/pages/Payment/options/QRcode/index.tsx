import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import imd from 'C:/ui/f-end/src/assets/QR.png';
import './index.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import { CreatePayment } from '../../../../services/https/index'; // Import CreatePayment function

function QR() {
  const location = useLocation();
  const navigate = useNavigate();

  // รับข้อมูลจาก location.state
  const { workId, bookerUserId, posterUserId, wagesId } = location.state || {
    workId: null,
    bookerUserId: null,
    posterUserId: null,
    wagesId: null,
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    if (workId && bookerUserId && posterUserId && wagesId) {
      setLoading(true);
      setError(null);

      try {
        const paymentData = {
          work_id: workId,
          booker_user_id: bookerUserId,
          poster_user_id: posterUserId,
          wages_id: wagesId,
        };

        const response = await CreatePayment(paymentData);

        if (response.status === 200) {
          console.log("Payment created successfully:", response.data);
          navigate('/Rating'); // เปลี่ยนเส้นทางไปที่ /Rating หลังจากบันทึกสำเร็จ
        } else {
          setError(response.data.error || "Failed to create payment");
          console.error("Failed to create payment:", response.data.error);
        }
      } catch (error) {
        setError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        console.error("Error creating payment:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setError("ข้อมูลไม่ครบถ้วน");
    }
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f0f2f5" }}>
      <Card
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          borderRadius: "20px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="card-wrapper"> {/* Add a wrapper div */}
          <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src={imd} />
            <Card.Body>
              <Card.Title>PromptPay QR-code</Card.Title>
              <Card.Text>
                {/* Add any additional text if needed */}
              </Card.Text>
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={loading} // Disable button while loading
              >
                {loading ? "กำลังบันทึก..." : "ถัดไป"}
              </Button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </Card.Body>
          </Card>
        </div>
      </Card>
    </div>
  );
}

export default QR;
