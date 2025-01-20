import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Tab,
  Tabs,
  Alert,
  Navbar,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ProfileCard } from "./components/profile/ProfileCard";
import { SkillCard } from "./components/skills/SkillCard";
import { MySkill } from "./components/skills/MySkill";
import { useAuth } from "./context/AuthContext";
import { StudentSidebar } from "./components/student/StudentSidebar";
import setupAxiosInterceptors from "./components/axiosInstance";
import { Menu } from "lucide-react";

export function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const userData = location.state.user;
  const [key, setKey] = useState("profile");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    console.log("Route changed to:", location.pathname);
  }, [location]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="bg-light min-vh-100">
      <Navbar bg="dark" variant="dark" expand="md" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#home">Student Dashboard</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <StudentSidebar
              show={showSidebar}
              handleClose={() => setShowSidebar(false)}
            />
          </Col>

          <Col md={9} lg={10} className="px-4 py-3">
            <h2 className="mb-4">Welcome, {userData.firstName}!</h2>

            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-4">
              <Tab eventKey="profile" title="Profile">
                <Row>
                  <Col md={6} lg={4} className="mb-4">
                    <ProfileCard
                      userData={userData}
                      onUpdateProfile={(updatedData) =>
                        console.log("Updating profile:", updatedData)
                      }
                    />
                  </Col>

                  {/* <Col md={6} lg={8}>
                    <h4 className="mb-3">Your Skills</h4>
                    {userData.skill.length === 0 ? (
                      <Alert variant="info">
                        You have not selected any skills yet. Please click on
                        the <strong>My Skill</strong> tab to select your skill.
                      </Alert>
                    ) : (
                      userData.skill.map((skill) => (
                        <SkillCard key={skill._id} skill={skill} />
                      ))
                    )}
                  </Col> */}
                </Row>
              </Tab>

              {/* <Tab
                eventKey="mySkill"
                title="My Skill"
                disabled={userData.skill.length > 0}
              >
                <MySkill />
              </Tab> */}
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
