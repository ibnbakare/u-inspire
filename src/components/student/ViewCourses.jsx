import React, { useState, useEffect } from "react";
import { Container, Card, ListGroup, Alert } from "react-bootstrap";

export function ViewCourses() {
  const [courses, setCourses] = useState([]);
  const [partner, setPartner] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/student/courses/assigned-partner",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCourses(data.courses);
        setPartner(data.partner);
      } else {
        setMessage({
          type: "danger",
          text: data.message || "Failed to fetch courses.",
        });
      }
    } catch (error) {
      setMessage({
        type: "danger",
        text: "An error occurred while fetching courses. Please try again.",
      });
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Courses from {partner}</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      {courses.length === 0 && !message && (
        <Alert variant="info">No courses available at the moment.</Alert>
      )}
      {courses.map((course) => (
        <Card key={course._id} className="mb-4">
          <Card.Header>
            <Card.Title>{course.title}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>{course.description}</Card.Text>
            <h5 className="mt-4 mb-3">Modules:</h5>
            <ListGroup variant="flush">
              {course.modules.map((module) => (
                <ListGroup.Item key={module._id}>
                  <h6>{module.title}</h6>
                  <p className="mb-1">{module.description}</p>
                  <small className="text-muted">
                    Duration: {module.duration} hours
                  </small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
