import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

export function DefineCourses() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    modules: [],
  });
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/partner/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(course),
      });
      const data = await response.json();
      setMessage({ type: "success", text: data.message });
    } catch (error) {
      setMessage({
        type: "danger",
        text: "Failed to define course. Please try again.",
      });
    }
  };

  return (
    <Container>
      <h2>Define a New Course</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Course Title</Form.Label>
          <Form.Control
            type="text"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Course Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            required
          />
        </Form.Group>
        {/* Add more fields for modules if needed */}
        <Button variant="primary" type="submit">
          Define Course
        </Button>
      </Form>
    </Container>
  );
}
