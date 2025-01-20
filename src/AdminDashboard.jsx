// components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Nav,
  Button,
  Table,
  Tabs,
  Tab,
  Form,
} from "react-bootstrap";
import { Settings, User, Briefcase, Book } from "lucide-react";
import axios from "axios";

export function AdminDashboard() {
  const location = useLocation();
  const adminData = location.state?.user;
  const [students, setStudents] = useState([]);
  const [partners, setPartners] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/students",
        {
          headers: { Authorization: `Bearer ${adminData.token}` },
        }
      );
      setStudents(response.data.students || []); // Ensure students is an array
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Fetch all partners
  const fetchPartners = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/partners",
        {
          headers: { Authorization: `Bearer ${adminData.token}` },
        }
      );
      setPartners(response.data.partners || []); // Ensure partners is an array
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: { Authorization: `Bearer ${adminData.token}` },
        }
      );
      setUsers(response.data.users || []); // Ensure users is an array
      setFilteredUsers(response.data.users || []); // Ensure filteredUsers is an array
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Filter users by matric or name
  const handleSearch = () => {
    if (!searchQuery) {
      setFilteredUsers(users);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.matricNumber?.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredUsers(filtered);
  };

  // Assign partner to student
  const assignPartner = async () => {
    if (!selectedStudent || !selectedPartner) {
      alert("Please select both a student and a partner.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/admin/assign-partner",
        { studentId: selectedStudent, partnerId: selectedPartner },
        { headers: { Authorization: `Bearer ${adminData.token}` } }
      );
      alert("Partner assigned successfully.");
      fetchStudents(); // Refresh students after assignment
    } catch (error) {
      console.error("Error assigning partner:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchPartners();
    fetchUsers();
  }, []);

  return (
    <div className="bg-light min-vh-100">
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3} lg={2} className="bg-dark text-white p-0 min-vh-100">
            <div className="p-3 mb-3 border-bottom border-secondary">
              <h5 className="mb-0">Admin Panel</h5>
            </div>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-white py-3 px-4">
                <User size={18} className="me-2" />
                User Management
              </Nav.Link>
              <Nav.Link href="#" className="text-white py-3 px-4">
                <Book size={18} className="me-2" />
                Course Management
              </Nav.Link>
              <Nav.Link href="#" className="text-white py-3 px-4">
                <Briefcase size={18} className="me-2" />
                Reports & Stats
              </Nav.Link>
              <Nav.Link href="#" className="text-white py-3 px-4">
                <Settings size={18} className="me-2" />
                Admin Settings
              </Nav.Link>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col md={9} lg={10} className="px-4 py-5">
            <h1 className="mb-4">Welcome, Admin {adminData?.firstName}!</h1>

            <Tabs
              defaultActiveKey="students"
              id="admin-dashboard-tabs"
              className="mb-4"
            >
              {/* Students Tab */}
              <Tab eventKey="students" title="All Students">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Skills</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>
                          {student.skills.map((skill, index) => (
                            <span key={index}>
                              {skill.name}
                              {index < student.skills.length - 1 && ", "}
                            </span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>

              {/* Partners Tab */}
              <Tab eventKey="partners" title="All Partners">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Organization</th>
                      <th>Skills</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partners.map((partner) => (
                      <tr key={partner.id}>
                        <td>{partner.id}</td>
                        <td>{partner.organizationName}</td>
                        <td>
                          {partner.focusedSkills.map((skill, index) => (
                            <span key={index}>
                              {skill.name}
                              {index < partner.focusedSkills.length - 1 && ", "}
                            </span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>

              {/* Users Tab */}
              <Tab eventKey="users" title="All Users">
                <Form className="mb-3">
                  <Form.Group controlId="searchUsers">
                    <Form.Label>Search by Name or Matric Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name or matric number"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleSearch}>
                    Search
                  </Button>
                </Form>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Matric Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.matricNumber || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>

              {/* Assign Tab */}
              <Tab eventKey="assign" title="Assign Students to Partners">
                <Form>
                  <Form.Group controlId="studentSelect" className="mb-3">
                    <Form.Label>Select Student</Form.Label>
                    <Form.Select
                      onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                      <option value="">Choose a student</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="partnerSelect" className="mb-3">
                    <Form.Label>Select Partner</Form.Label>
                    <Form.Select
                      onChange={(e) => setSelectedPartner(e.target.value)}
                    >
                      <option value="">Choose a partner</option>
                      {partners.map((partner) => (
                        <option key={partner.id} value={partner.id}>
                          {partner.organizationName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Button variant="primary" onClick={assignPartner}>
                    Assign Partner
                  </Button>
                </Form>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
