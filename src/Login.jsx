import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container } from "react-bootstrap";
import "./pages/Contact/Contact.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const userData = await response.json();
        setShowPopup(true);
        setLoginError("");
        console.log("userData before navigating:", userData.user); // Ensure this has the correct data
        // navigate("/dashboard", { state: { user: userData } });

        // Store the token in localStorage
        localStorage.setItem("token", userData.token);

        setTimeout(() => {
          setShowPopup(false);
          //
        }, 2000);
        console.log("userData before navigating:", userData.user.userType); // Ensure this has the correct data
        if (userData.user.userType === "Admin") {
          navigate("/admin", { state: { user: userData.user } });
        } else if (userData.user.userType === "student") {
          navigate("/dashboard", { state: { user: userData.user } });
        } else if (userData.user.userType === "company") {
          navigate("/patner", { state: { user: userData.user } });
        }

        // navigate("/dashboard", { state: { user: userData.user } });
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setLoginError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="contact-page">
      <header className="height-75">
        <Container className="h-100 d-flex flex-column align-items-center justify-content-center text-light">
          <h1 className="text-center fw-semibold">Login</h1>
        </Container>
      </header>

      <Container className="my-5 d-flex justify-content-center">
        <Form
          id="login-form"
          onSubmit={handleSubmit}
          className="w-100"
          style={{ maxWidth: "400px" }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </Form.Group>

          <Button variant="primary" size="lg" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Container>

      {loginError && (
        <Alert variant="danger" className="mt-3">
          {loginError}
        </Alert>
      )}

      {showPopup && (
        <Alert variant="success" className="popup-message">
          Login successful! Redirecting to dashboard...
        </Alert>
      )}
    </div>
  );
}
