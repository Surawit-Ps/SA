import { useState, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'antd/es/card/Card';
import debit from '../assets/debit.png';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DebitCard: React.FC = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // Navigate to /Rating if form is valid
      navigate('/Rating');
    }
    setValidated(true);
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f0f2f5" }}>
      <Card
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Display the PromptPay Logo */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img 
            src={debit} 
            alt="PromptPay Logo" 
            style={{ width: "220px" }} 
          />
        </div>

        {/* Form Starts Here */}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3 justify-content-center">
            <Form.Group as={Col} md="8" controlId="validationCustom01">
              <Form.Label>Cardholder's Name</Form.Label>
              <Form.Control required type="text" placeholder="Name on card" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          
          <Row className="mb-3 justify-content-center">
            <Form.Group as={Col} md="8" controlId="validationCustom02">
              <Form.Label>Card Number</Form.Label>
              <Form.Control required type="text" placeholder="Card number" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3 justify-content-center">
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control required type="text" placeholder="MM/YY" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid expiration date.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>CVV</Form.Label>
              <Form.Control required type="text" placeholder="CVV" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid CVV.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          {/* Adjusted Form.Check */}
          <Form.Group className="mb-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
              style={{ marginRight: '10px' }} // Adjust margin to control spacing between checkbox and text
            />
          </Form.Group>

          <div style={{ textAlign: "center", marginTop: "25px" }}>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default DebitCard;
