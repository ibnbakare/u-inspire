import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Tabs,
  Tab,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { ProfileCard } from "./ProfileCard";
import { SkillCard } from "./SkillCard";
import { MySkill } from "../../skills/MySkill";
import { PartnerModules } from "./PartnerModules";
import { CommunicationLinks } from "./CommunicationLinks";
import { SkillCourses } from "./SkillCourses";
import { PartnerCourses } from "./PartnerCourses";
import { useAuth } from "../../../context/AuthContext";
import setupAxiosInterceptors from "../../axiosInstance";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const userData = location.state.user;
  console.log(location.state.userData);

  useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {userData.firstName}!
      </Typography>
      <Paper>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="dashboard tabs"
        >
          <Tab label="Profile" />
          <Tab label="My Skill" disabled={userData.skill.length > 0} />
          <Tab label="Partner Modules" />
          <Tab label="Communication Links" />
          <Tab label="Skill Courses" />
          <Tab label="Partner Courses" />
        </Tabs>
      </Paper>
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <ProfileCard
              userData={userData}
              onUpdateProfile={(updatedData) =>
                console.log("Updating profile:", updatedData)
              }
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  Your Skills
                </Typography>
                {userData.skill.length === 0 ? (
                  <Typography>
                    You have not selected any skills yet. Please click on the My
                    Skill tab to select your skill.
                  </Typography>
                ) : (
                  <Grid container spacing={2}>
                    {userData.skill.map((skill) => (
                      <Grid item xs={12} sm={6} md={4} key={skill._id}>
                        <SkillCard skill={skill} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <MySkill />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <PartnerModules />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <CommunicationLinks />
      </TabPanel>
      <TabPanel value={activeTab} index={4}>
        <SkillCourses />
      </TabPanel>
      <TabPanel value={activeTab} index={5}>
        <PartnerCourses />
      </TabPanel>
    </Container>
  );
}
