import React, { useState } from "react";
import "./pages/Contact/Contact.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Alert from "react-bootstrap/Alert";

function RegistrationForm() {
  const [registrationType, setRegistrationType] = useState("student");
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRegistrationTypeChange = (e) => {
    setRegistrationType(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show the popup
    setIsSubmitted(true);
    setShowPopup(true);

    // Hide the popup after 4 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 4000);
  };

  return (
    <div className="contact-page">
      <header className="height-75">
        <div className="container h-100 d-flex flex-column align-items-center justify-content-center text-light">
          <h1 className="text-center fw-semibold">Register with Us</h1>
        </div>
      </header>

      <div className="container my-5 d-flex justify-content-center">
        <Form id="registration-form" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col sm={12} md={6} className="mb-3 mb-md-0">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="First name"
                value={name}
                onChange={handleNameChange}
              />
            </Col>
            <Col sm={12} md={6}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder="Last name" />
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Registration Type</Form.Label>
            <Form.Select
              value={registrationType}
              onChange={handleRegistrationTypeChange}
            >
              <option value="student">Student</option>
              <option value="company">Company</option>
            </Form.Select>
          </Form.Group>

          {/* Student Registration Form */}
          <Collapse in={registrationType === "student"}>
            <div>
              <h3>Student Registration</h3>
              <Row className="mb-3">
                <Col sm={12} md={6} className="mb-3 mb-md-0">
                  <Form.Label>Faculty</Form.Label>
                  <Form.Control placeholder="Your faculty" />
                </Col>
                <Col sm={12} md={6}>
                  <Form.Label>Department</Form.Label>
                  <Form.Control placeholder="Your department" />
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Area of Interest</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="Artificial Intelligence"
                    name="interest"
                    id="ai"
                  />
                  <Form.Check
                    type="radio"
                    label="Software Engineering"
                    name="interest"
                    id="se"
                  />
                  <Form.Check
                    type="radio"
                    label="Data Science"
                    name="interest"
                    id="ds"
                  />
                </div>
              </Form.Group>
            </div>
          </Collapse>

          {/* Company Registration Form */}
          <Collapse in={registrationType === "company"}>
            <div>
              <h3>Company Registration</h3>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control placeholder="Company name" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Invested Area of Interest</Form.Label>
                <Form.Control placeholder="Your company's area of interest" />
              </Form.Group>
            </div>
          </Collapse>

          <Button variant="primary btn-lg" type="submit">
            Register
          </Button>
        </Form>
      </div>

      {/* Popup message after successful registration */}
      {showPopup && (
        <Alert variant="success" className="popup-message">
          <strong>{name}</strong>, thanks for declaring interest in our program!
        </Alert>
      )}
    </div>
  );
}

export default RegistrationForm;
