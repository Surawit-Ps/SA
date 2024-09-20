import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './payment.css';
import Card from 'react-bootstrap/Card';

// Import images
import PromptPayLogo from '../assets/PromptPay-logo.png';
import debit from '../assets/debit.png';

const PaymentOptions: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get data from state
    const { workId, bookerUserId, posterUserId, wagesId } = location.state || { workId: null, bookerUserId: null, posterUserId: null, wagesId: null };

    const handleRedirect = (paymentMethod: string) => {
        console.log(`Selected payment method: ${paymentMethod}`);
        console.log(`Processing payment for workId: ${workId}, bookerUserId: ${bookerUserId}, posterUserId: ${posterUserId}, wagesId: ${wagesId}`);

        // Redirect based on payment method
        if (paymentMethod === 'PromptPay') {
            navigate('/payment/QRcodePayment', { state: { workId, bookerUserId, posterUserId, wagesId } });
        } else if (paymentMethod === 'DebitCard') {
            navigate('/payment/DebitCardPayment', { state: { workId, bookerUserId, posterUserId, wagesId } });
        }
    };

    return (
        <div style={{ padding: "60px", backgroundColor: "#f0f2f5" }}>
            <Card
                style={{
                    maxWidth: "1000px", // Increased outer card width
                    margin: "0 auto",
                    borderRadius: "20px",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                    padding: "40px", // Adjusted padding inside the card
                    backgroundColor: "#ffffff",
                    overflow: "hidden",
                }}
            >
                <div className="centered-text" style={{ marginTop: "80px", marginBottom: "80px" }}>
                    <h1>เลือกช่องทางการชำระ</h1>
                </div>

                <div className="table-container">
                    <div className="card-container">
                        <Card
                            className="custom-card"
                            onClick={() => handleRedirect('PromptPay')}
                            style={{ cursor: 'pointer' }}
                        >
                            <Card.Img variant="top" src={PromptPayLogo} />
                            <Card.Body>
                                <Card.Title><h3>PROMPTPAY</h3></Card.Title>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="card-container">
                        <Card
                            className="custom-card"
                            onClick={() => handleRedirect('DebitCard')}
                            style={{ cursor: 'pointer' }}
                        >
                            <Card.Img variant="top" src={debit} />
                            <Card.Body>
                                <Card.Title><h3>DEBIT CARD</h3></Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="centered-text" style={{ marginTop: "100px" }}>
                </div>
            </Card>
        </div>
    );
};

export default PaymentOptions;
