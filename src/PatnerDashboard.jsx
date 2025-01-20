import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import { useAuth } from "./context/AuthContext";

export function PatnerDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const companyData = location.state.user;
  const [showSidebar, setShowSidebar] = useState(false);
  console.log(companyData);

  const handleUpdateProfile = (updatedData) => {
    // Implement your update profile API call here
    console.log("Updating profile:", updatedData);
  };

  const getStatusBadgeClass = (status) => {
    const colors = {
      pending: "bg-warning",
      approved: "bg-success",
      rejected: "bg-danger",
    };
    return `badge ${colors[status] || "bg-secondary"} text-white`;
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-light min-vh-100">
      <Container fluid className="px-0">
        {/* Mobile Navbar */}
        <Navbar bg="dark" variant="dark" expand="md" className="d-md-none p-3">
          <Navbar.Brand>{companyData.organizationName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="sidebar-nav" onClick={toggleSidebar} />
        </Navbar>

        <Row className="g-0">
          {/* Sidebar */}
          {/* <Col
            md={3}
            lg={2}
            className={`bg-dark text-white p-0 ${
              showSidebar ? "d-block" : "d-none"
            } d-md-block sidebar-column`}
            style={{
              position: "fixed",
              height: "100vh",
              zIndex: 1000,
              overflowY: "auto",
            }}
          >
            <Sidebar userType={companyData.userType} />
          </Col> */}

          <Sidebar
            userType={companyData.userType}
            show={showSidebar}
            handleClose={() => setShowSidebar(false)}
          />

          {/* Main Content */}
          {/* <Col
            md={9}
            lg={10}
            className="px-4 py-5"
            style={{
              marginLeft: window.innerWidth >= 768 ? "16.666667%" : "0", // Offset for md screens and up
            }}
          > */}
          <Col md={9} lg={10} className="px-4 py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="mb-2">
                  Welcome, {companyData.organizationName}!
                </h2>
                <span
                  className={getStatusBadgeClass(
                    companyData.verificationStatus
                  )}
                >
                  {companyData.verificationStatus?.toUpperCase()}
                </span>
              </div>
              <Button onClick={handleLogout} className="mb-4">
                Logout
              </Button>
            </div>

            <Row>
              <Col md={6} lg={4} className="mb-4">
                {/* Company Profile Card */}
                <Card>
                  <Card.Header>
                    <Card.Title>Company Information</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <strong>Address:</strong>
                      <p>{companyData.contactAddress}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Contact Person:</strong>
                      <p>
                        {companyData.contactPerson?.name} -{" "}
                        {companyData.contactPerson?.phoneNumber}
                      </p>
                    </div>
                    <div className="mb-3">
                      <strong>Registration:</strong>
                      <p>{companyData.registrationNumber}</p>
                    </div>
                    <div className="d-flex gap-2">
                      {companyData.services?.providesInternships && (
                        <span className="badge bg-primary">Internships</span>
                      )}
                      {companyData.services?.providesCourses && (
                        <span className="badge bg-info">Courses</span>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={8}>
                {/* Focused Skills Section */}
                <Card className="mb-4">
                  <Card.Header>
                    <Card.Title>Focused Skills</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {companyData.skills?.map((skill, index) => (
                        <Col md={6} key={index}>
                          <div className="border rounded p-3 mb-3">
                            <h5>{skill.skillId.name}</h5>
                            <div className="text-muted">
                              <p className="mb-1">
                                Min. Grade: {skill.minimumGradeRequired}%
                              </p>
                              <p className="mb-0 text-capitalize">
                                Level: {skill.preferredLevel}
                              </p>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>

                {/* Internship Postings Section */}
                <Card>
                  <Card.Header>
                    <Card.Title>Internship Postings</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    {companyData.internshipPostings?.map((posting, index) => (
                      <div key={index} className="border rounded p-3 mb-3">
                        <div className="d-flex justify-content-between align-items-start">
                          <h5 className="mb-2">{posting.title}</h5>
                          <span
                            className={`badge ${
                              posting.status === "open"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {posting.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-muted">{posting.description}</p>
                        <div>
                          <p className="mb-2">
                            Duration: {posting.duration} months
                          </p>
                          <div className="d-flex flex-wrap gap-2">
                            {posting.requirements?.map((req, reqIndex) => (
                              <span
                                key={reqIndex}
                                className="badge bg-light text-dark border"
                              >
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                        <small className="text-muted d-block mt-2">
                          Posted:{" "}
                          {new Date(posting.postedDate).toLocaleDateString()}
                        </small>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Overlay for mobile when sidebar is open */}
      {showSidebar && (
        <div
          className="d-md-none"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
