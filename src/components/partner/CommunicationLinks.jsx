import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import setupAxiosInterceptors from "../axiosInstance";
import { useNavigate } from "react-router-dom";

export function CommunicationLinks() {
  const [links, setLinks] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptors(navigate);
    // Fetch existing links when component mounts
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/partner/communication-links",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setLinks(data.partner.communicationLinks);
    } catch (error) {
      setMessage({
        type: "danger",
        text: "Failed to fetch communication links.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/partner/communication-links",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ communicationLinks: links }),
        }
      );
      const data = await response.json();
      setMessage({ type: "success", text: data.message });
    } catch (error) {
      setMessage({
        type: "danger",
        text: "Failed to update communication links. Please try again.",
      });
    }
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  return (
    <Container>
      <h2>Communication Links</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit}>
        {links.map((link, index) => (
          <div key={index} className="mb-3">
            <Form.Group className="mb-2">
              <Form.Label>Link Type</Form.Label>
              <Form.Control
                type="text"
                value={link.type}
                onChange={(e) =>
                  handleLinkChange(index, "type", e.target.value)
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Link URL</Form.Label>
              <Form.Control
                type="url"
                value={link.link}
                onChange={(e) =>
                  handleLinkChange(index, "link", e.target.value)
                }
                required
              />
            </Form.Group>
          </div>
        ))}
        <Button
          variant="secondary"
          onClick={() => setLinks([...links, { type: "", link: "" }])}
        >
          Add Link
        </Button>
        <Button variant="primary" type="submit" className="ms-2">
          Update Links
        </Button>
      </Form>
    </Container>
  );
}
