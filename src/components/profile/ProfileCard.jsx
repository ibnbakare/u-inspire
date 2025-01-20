import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

export const ProfileCard = ({ userData, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    matricNumber: userData.matricNumber,
  });

  const handleEdit = () => {
    if (isEditing) {
      onUpdateProfile(formData);
    }
    setIsEditing(!isEditing);
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="border-bottom pb-2">
          Profile Information
        </Card.Title>
        {!isEditing ? (
          <div className="py-2">
            <p>
              <strong>Name:</strong> {userData.firstName} {userData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Matric Number:</strong> {userData.matricNumber}
            </p>
            <p>
              <strong>User Type:</strong>{" "}
              {userData.userType.charAt(0).toUpperCase() +
                userData.userType.slice(1)}
            </p>
          </div>
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Matric Number</Form.Label>
              <Form.Control
                type="text"
                value={formData.matricNumber}
                onChange={(e) =>
                  setFormData({ ...formData, matricNumber: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        )}
        <Button
          variant={isEditing ? "success" : "primary"}
          onClick={handleEdit}
          className="mt-2"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </Card.Body>
    </Card>
  );
};
