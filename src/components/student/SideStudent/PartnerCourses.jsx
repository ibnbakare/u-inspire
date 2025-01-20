import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Chip,
  Alert,
  CircularProgress,
} from "@mui/material";

export function PartnerCourses() {
  const [partnerCourses, setPartnerCourses] = useState([]);
  const [partnerName, setPartnerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPartnerCourses();
  }, []);

  const fetchPartnerCourses = async () => {
    try {
      const response = await axios.get(
        "/api/student/courses-by-assigned-partner"
      );
      setPartnerCourses(response.data.courses);
      setPartnerName(response.data.partner);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError(err.response.data.message);
      } else {
        setError("Failed to fetch partner courses");
      }
      setLoading(false);
    }
  };

  const handleEnrollCourse = async (courseId) => {
    try {
      await axios.post("/api/student/enroll-course", { courseId });
      fetchPartnerCourses(); // Refresh courses after enrollment
    } catch (err) {
      setError("Failed to enroll in the course");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Courses by {partnerName}
      </Typography>
      {partnerCourses.length === 0 ? (
        <Alert severity="info">
          There are currently no courses defined by your assigned partner.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {partnerCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {course.description}
                  </Typography>
                  {course.tags &&
                    course.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{ marginRight: 1, marginBottom: 1 }}
                      />
                    ))}
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleEnrollCourse(course._id)}
                    disabled={course.enrolled}
                  >
                    {course.enrolled ? "Enrolled" : "Enroll"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
