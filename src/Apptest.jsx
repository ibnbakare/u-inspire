import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

// Import your existing components
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Registration from "./Registration";
import { Dashboard } from "./Dashboard";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import { PatnerDashboard } from "./PatnerDashboard";
import { MySkill } from "./components/skills/MySkill";
import { DefineCourses } from "./components/partner/DefineCourses";
import { CommunicationLinks } from "./components/partner/CommunicationLinks";
import { ViewCommunicationLinks } from "./components/student/ViewCommunicationLinks";
import { ViewCourses } from "./components/student/ViewCourses";

import ulearn from "./utils/images/U-inspire.png";

const theme = createTheme();

// ProtectedRoute component (unchanged)
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// MainLayout component using Material-UI
function MainLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    navigate("/registration");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={ulearn || "/placeholder.svg"}
                alt="ulearn"
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              UNILORIN INSPIRE
            </Link>
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" href="#ProgramDetails">
            Program Details
          </Button>
          <Button color="inherit" href="#faq">
            FAQ
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Get in touch
          </Button>
          <Button color="inherit" onClick={handleLogin}>
            Enroll/Login
          </Button>
        </Toolbar>
      </AppBar>

      <Container>{children}</Container>

      {/* Footer */}
      {location.pathname !== "/dashboard" && (
        <footer>{/* Your existing footer content */}</footer>
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Routes with MainLayout */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            }
          />
          <Route
            path="/registration"
            element={
              <MainLayout>
                <Login />
              </MainLayout>
            }
          />
          <Route
            path="/login"
            element={
              <MainLayout>
                <Login />
              </MainLayout>
            }
          />

          {/* Dashboard routes without MainLayout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patner"
            element={
              <ProtectedRoute>
                <PatnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partner/define-courses"
            element={
              <ProtectedRoute>
                <DefineCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partner/communication-links"
            element={
              <ProtectedRoute>
                <CommunicationLinks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/communication-links"
            element={
              <ProtectedRoute>
                <ViewCommunicationLinks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/courses"
            element={
              <ProtectedRoute>
                <ViewCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/skills"
            element={
              <ProtectedRoute>
                <MySkill />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
