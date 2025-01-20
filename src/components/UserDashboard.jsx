import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Nav, Tab, Button } from "react-bootstrap";
import { User, Book, Briefcase, Calendar, Settings } from "lucide-react";

export default function UserDashboard({ userData }) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Container className="mt-5">
      <Row>
        <Col md={3}>
          <Card>
            <Card.Body>
              <div className="text-center mb-3">
                <User size={64} className="text-primary" />
                <h4 className="mt-2">{`${userData.firstName} ${userData.lastName}`}</h4>
                <p className="text-muted">{userData.email}</p>
              </div>
              <Nav
                variant="pills"
                className="flex-column"
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k || "profile")}
              >
                <Nav.Item>
                  <Nav.Link eventKey="profile">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="courses">
                    {userData.registrationType === "student"
                      ? "My Courses"
                      : "Available Courses"}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="opportunities">
                    {userData.registrationType === "student"
                      ? "Job Opportunities"
                      : "Post Opportunities"}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="calendar">Calendar</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="settings">Settings</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Tab.Content>
            <Tab.Pane eventKey="profile" active={activeTab === "profile"}>
              <Card>
                <Card.Body>
                  <h2>Profile</h2>
                  <p>
                    <strong>Name:</strong>{" "}
                    {`${userData.firstName} ${userData.lastName}`}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Type:</strong> {userData.registrationType}
                  </p>
                  <p>
                    <strong>Interest:</strong> {userData.interest}
                  </p>
                  <Button variant="primary">Edit Profile</Button>
                </Card.Body>
              </Card>
            </Tab.Pane>
            <Tab.Pane eventKey="courses" active={activeTab === "courses"}>
              <Card>
                <Card.Body>
                  <h2>
                    {userData.registrationType === "student"
                      ? "My Courses"
                      : "Available Courses"}
                  </h2>
                  <ul>
                    <li>Introduction to AI</li>
                    <li>Advanced Machine Learning</li>
                    <li>Data Structures and Algorithms</li>
                  </ul>
                  {userData.registrationType === "student" ? (
                    <Button variant="primary">Enroll in New Course</Button>
                  ) : (
                    <Button variant="primary">Add New Course</Button>
                  )}
                </Card.Body>
              </Card>
            </Tab.Pane>
            <Tab.Pane
              eventKey="opportunities"
              active={activeTab === "opportunities"}
            >
              <Card>
                <Card.Body>
                  <h2>
                    {userData.registrationType === "student"
                      ? "Job Opportunities"
                      : "Post Opportunities"}
                  </h2>
                  {userData.registrationType === "student" ? (
                    <>
                      <ul>
                        <li>AI Research Assistant at TechCorp</li>
                        <li>Junior Software Developer at StartupX</li>
                        <li>Data Analyst Intern at BigData Inc.</li>
                      </ul>
                      <Button variant="primary">Apply for Jobs</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="primary" className="mb-3">
                        Post New Job
                      </Button>
                      <ul>
                        <li>AI Engineer (Posted 2 days ago)</li>
                        <li>Full Stack Developer (Posted 1 week ago)</li>
                      </ul>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Tab.Pane>
            <Tab.Pane eventKey="calendar" active={activeTab === "calendar"}>
              <Card>
                <Card.Body>
                  <h2>Calendar</h2>
                  <p>Your upcoming events will be displayed here.</p>
                  <Button variant="primary">Add Event</Button>
                </Card.Body>
              </Card>
            </Tab.Pane>
            <Tab.Pane eventKey="settings" active={activeTab === "settings"}>
              <Card>
                <Card.Body>
                  <h2>Settings</h2>
                  <Button variant="primary" className="me-2">
                    Change Password
                  </Button>
                  <Button variant="secondary">Notification Preferences</Button>
                </Card.Body>
              </Card>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Container>
  );
}
