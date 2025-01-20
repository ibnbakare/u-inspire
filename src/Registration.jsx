import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "student",
    // Student fields
    firstName: "",
    middleName: "",
    lastName: "",
    matricNumber: "",
    faculty: "",
    department: "",
    programme: "",
    selectedSkill: "",
    // Company fields
    organizationName: "",
    contactAddress: "",
    contactPerson: {
      name: "",
      phoneNumber: "",
    },
    registrationNumber: "",
    selectedSkill: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSkillChange = (e) => {
    const selectedSkill = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      selectedSkill: selectedSkill,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        services: {
          ...prev.services,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain at least one capital letter and one number."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchSkills();
    console.log("run");
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/allSkills");
      const data = await response.json();

      if (response.ok) {
        console.log(data.skills);
        setSkills(data.skills);
      } else {
        console.log("Failed to load skills");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) return;

    // Prepare submission data based on user type
    const submissionData = {
      email: formData.email,
      password: formData.password,
      userType: formData.userType,
      ...(formData.userType === "student"
        ? {
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            matricNumber: formData.matricNumber,
            faculty: formData.faculty,
            department: formData.department,
            programme: formData.programme,
            selectedSkill: formData.selectedSkill,
          }
        : {
            organizationName: formData.organizationName,
            contactAddress: formData.contactAddress,
            contactPerson: formData.contactPerson,
            registrationNumber: formData.registrationNumber,
            selectedSkill: formData.selectedSkill,
          }),
    };

    try {
      const apiUrl = "http://localhost:5000/api/auth/student";
      // formData.userType === "student"
      //     ?
      //     : "http://localhost:5000/api/auth";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const userData = await response.json();
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
          if (userData.user.userType === "admin") {
            navigate("/admin", { state: { user: userData.user } });
          } else if (userData.user.userType === "student") {
            navigate("/dashboard", { state: { user: userData.user } });
          } else if (userData.user.UserType === "company") {
            navigate("/company-dashboard", {
              state: { user: userData.user },
            });
          }
        }, 4000);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration");
    }
  };

  return (
    <div className="contact-page">
      <header className="height-75">
        <div className="container h-100 d-flex flex-column align-items-center justify-content-center text-light">
          <h1 className="text-center fw-semibold">Register with Us</h1>
        </div>
      </header>

      <div className="container my-5 d-flex justify-content-center">
        <Form onSubmit={handleSubmit}>
          {/* Common Fields */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {passwordError && (
              <Form.Text className="text-danger">{passwordError}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Registration Type</Form.Label>
            <Form.Select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
            >
              <option value="student">Student</option>
              <option value="company">Industry Partner</option>
            </Form.Select>
          </Form.Group>

          {/* Student Registration Fields */}
          <Collapse in={formData.userType === "student"}>
            <div>
              <h3>Student Registration</h3>
              <Row className="mb-3">
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required={formData.userType === "student"}
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required={formData.userType === "student"}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Matric Number</Form.Label>
                    <Form.Control
                      name="matricNumber"
                      value={formData.matricNumber}
                      onChange={handleInputChange}
                      required={formData.userType === "student"}
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Skills</Form.Label>
                    <Form.Select
                      name="skills"
                      value={formData.selectedSkill}
                      onChange={handleSkillChange}
                      required
                    >
                      <option value="">Select a skill</option>
                      {skills.map((skill) => (
                        <option key={skill._id} value={skill.name}>
                          {skill.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  {formData.selectedSkill.length > 0 && (
                    <div className="mt-2">
                      <strong>Selected Skills:</strong>
                      <ul>{formData.selectedSkill}</ul>
                    </div>
                  )}
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Area of Interest</Form.Label>
                    <Form.Select
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      required={formData.userType === "student"}
                    >
                      <option value="">Select an area</option>
                      <option value="Artificial Intelligence">
                        Artificial Intelligence
                      </option>
                      <option value="Software Engineering">
                        Software Engineering
                      </option>
                      <option value="Data Science">Data Science</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Collapse>

          {/* Company Registration Fields */}
          <Collapse in={formData.userType === "company"}>
            <div>
              <h3>Company Registration</h3>
              <Form.Group className="mb-3">
                <Form.Label>Organization Name</Form.Label>
                <Form.Control
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  required={formData.userType === "company"}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact Address</Form.Label>
                <Form.Control
                  name="contactAddress"
                  value={formData.contactAddress}
                  onChange={handleInputChange}
                  required={formData.userType === "company"}
                />
              </Form.Group>

              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Contact Person Name</Form.Label>
                    <Form.Control
                      name="contactPerson.name"
                      value={formData.contactPerson.name}
                      onChange={handleInputChange}
                      required={formData.userType === "company"}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Contact Phone Number</Form.Label>
                    <Form.Control
                      name="contactPerson.phoneNumber"
                      value={formData.contactPerson.phoneNumber}
                      onChange={handleInputChange}
                      required={formData.userType === "company"}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>CAC Registration Number</Form.Label>
                <Form.Control
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  required={formData.userType === "company"}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label>Service Offered</Form.Label>
                  <Form.Select
                    name="skills"
                    value={formData.selectedSkill}
                    onChange={handleSkillChange}
                    required
                  >
                    <option value="">Select a skill</option>
                    {skills.map((skill) => (
                      <option key={skill._id} value={skill.name}>
                        {skill.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                {formData.selectedSkill.length > 0 && (
                  <div className="mt-2">
                    <strong>Selected Skills:</strong>
                    <ul>{formData.selectedSkill}</ul>
                  </div>
                )}
              </Form.Group>
            </div>
          </Collapse>

          <Button
            variant="primary btn-lg"
            type="submit"
            disabled={!!passwordError}
          >
            Register
          </Button>
        </Form>
      </div>

      {showPopup && (
        <Alert variant="success" className="popup-message">
          {formData.userType === "student" ? (
            <strong>{`${formData.firstName} ${formData.lastName}`}</strong>
          ) : (
            <strong>{formData.organizationName}</strong>
          )}
          , thanks for registering with us!
        </Alert>
      )}
    </div>
  );
};

export default RegistrationForm;
