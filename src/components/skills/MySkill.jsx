import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import setupAxiosInterceptors from "../axiosInstance";

export function MySkill() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptors(navigate); // Set up Axios interceptors

    const fetchSkills = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/student/courses/skills/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Use stored token
            },
          }
        );
        setSkills(response.data.courses);
      } catch (error) {
        setError("Failed to fetch skills.");
      }
    };
    fetchSkills();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/student/courses/skills/select",
        { courseId: selectedSkill },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use stored token
          },
        }
      );
      setSuccess("Skill selected successfully!");

      // Signal the dashboard to refresh skills
      localStorage.setItem("refreshSkills", "true");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setError("Failed to select skill.");
    }
  };

  return (
    <div>
      <h4>Select Your Skill</h4>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="skillSelect" className="mb-3">
          <Form.Label>Select a Skill</Form.Label>
          <Form.Control
            as="select"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="">Choose a skill</option>
            {skills.map((skill) => (
              <option key={skill._id} value={skill._id}>
                {skill.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button type="submit" disabled={!selectedSkill}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
