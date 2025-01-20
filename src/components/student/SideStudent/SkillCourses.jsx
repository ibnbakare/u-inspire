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
  CircularProgress,
  Alert,
} from "@mui/material";

export function SkillCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSkillCourses();
  }, []);

  const fetchSkillCourses = async () => {
    try {
      const response = await axios.get("/api/student/skill-courses");
      setCourses(response.data.courses);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch skill courses");
      setLoading(false);
    }
  };

  const handleSelectCourse = async (courseId) => {
    try {
      await axios.post("/api/student/select-skill-course", { courseId });
      fetchSkillCourses(); // Refresh courses after selection
    } catch (err) {
      setError("Failed to select skill course");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Skill Courses
      </Typography>
      {courses.length === 0 ? (
        <Alert severity="info">No skill courses available at the moment.</Alert>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course) => (
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
                    onClick={() => handleSelectCourse(course._id)}
                    disabled={course.selected}
                  >
                    {course.selected ? "Selected" : "Select Course"}
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
