import React from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Book, Calendar, Briefcase, User, Settings, X } from "lucide-react";

export const StudentSidebar = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  const sidebarContent = (
    <>
      <div className="d-flex justify-content-between align-items-center p-3 mb-3 border-bottom border-secondary">
        <h5 className="mb-0 text-white">UNILORIN INSPIRE</h5>
        <X
          className="d-md-none"
          onClick={handleClose}
          size={24}
          color="white"
          style={{ cursor: "pointer" }}
        />
      </div>
      <Nav className="flex-column">
        <Nav.Link
          onClick={() => handleNavigation("/dashboard")}
          className="text-white py-3 px-4"
        >
          <User size={18} className="me-2" />
          Dashboard
        </Nav.Link>
        {/* <Nav.Link
          onClick={() => handleNavigation("/skills")}
          className="text-white py-3 px-4"
        >
          <Book size={18} className="me-2" />
          My Skills
        </Nav.Link> */}
        <Nav.Link
          onClick={() => handleNavigation("/progress")}
          className="text-white py-3 px-4"
        >
          <Calendar size={18} className="me-2" />
          Progress
        </Nav.Link>
        <Nav.Link
          onClick={() => handleNavigation("/internships")}
          className="text-white py-3 px-4"
        >
          <Briefcase size={18} className="me-2" />
          Internships
        </Nav.Link>
        <Nav.Link
          onClick={() => handleNavigation("/student/courses")}
          className="text-white py-3 px-4"
        >
          <Book size={18} className="me-2" />
          Courses
        </Nav.Link>
        <Nav.Link
          onClick={() => handleNavigation("/student/communication-links")}
          className="text-white py-3 px-4"
        >
          <Settings size={18} className="me-2" />
          Communication
        </Nav.Link>
        <Nav.Link
          onClick={() => handleNavigation("/settings")}
          className="text-white py-3 px-4"
        >
          <Settings size={18} className="me-2" />
          Settings
        </Nav.Link>
      </Nav>
    </>
  );

  return (
    <>
      <div
        className="d-none d-md-block bg-dark"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        {sidebarContent}
      </div>
      <Offcanvas show={show} onHide={handleClose} className="bg-dark d-md-none">
        <Offcanvas.Body>{sidebarContent}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
