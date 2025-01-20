import React, { useState, useEffect } from "react";
import { Container, ListGroup, Alert } from "react-bootstrap";

export function ViewCommunicationLinks() {
  const [links, setLinks] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/student/communication-links",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.links && data.links.length > 0) {
        setLinks(data.links);
        setMessage(null); // Clear any previous messages
      } else {
        setLinks([]);
        setMessage({
          type: "info",
          text: "No communication links created yet.",
        });
      }
    } catch (error) {
      setMessage({
        type: "danger",
        text: "Failed to fetch communication links. Please try again.",
      });
    }
  };

  return (
    <Container>
      <h2>Communication Links</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <ListGroup>
        {links.map((link, index) => (
          <ListGroup.Item key={index}>
            <h5>{link.type}</h5>
            <a href={link.link} target="_blank" rel="noopener noreferrer">
              {link.link}
            </a>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
