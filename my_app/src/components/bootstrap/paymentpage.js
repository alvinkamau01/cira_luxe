import React, { useState } from "react";
import "./css/paymentpage.css"; // Import your custom CSS
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e) => {
    e.preventDefault();

    // Simple validation (you can expand this as needed)
    const { cardName, cardNumber, expiryDate, cvv } = formData;
    if (!cardName || !cardNumber || !expiryDate || !cvv) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
      setErrorMessage("");
    }, 1000);
  };

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  return (
    <Container className="payment-page mt-5">
      <h1 className="text-center">Payment Details</h1>
      <Row className="justify-content-center">
        <Col md={6}>
          {errorMessage && (
            <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
              {errorMessage}
            </Alert>
          )}
          {paymentSuccess && (
            <Alert variant="success">
              Payment successful! Thank you for your purchase.
            </Alert>
          )}
          <Form onSubmit={handlePayment}>
            <Form.Group controlId="cardName" className="mb-3">
              <Form.Label>Cardholder Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name on card"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="cardNumber" className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="1234 5678 9012 3456"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="expiryDate" className="mb-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="MM/YY"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="cvv" className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="123"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="w-100">
              Pay Now
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mt-4 text-center">
        <Col>
          <Button variant="link" onClick={handleContinueShopping}>
            Continue Shopping →
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
