import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  LinearProgress,
  CircularProgress,
  Alert,
} from "@mui/material";

export function PartnerModules() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await axios.get("/api/student/partner-defined-modules");
      setModules(response.data.modules);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch partner modules");
      setLoading(false);
    }
  };

  const handleStartModule = async (moduleId) => {
    try {
      await axios.post(`/api/student/start-module/${moduleId}`);
      fetchModules(); // Refresh modules after starting
    } catch (err) {
      setError("Failed to start module");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Partner Modules
      </Typography>
      {modules.length === 0 ? (
        <Alert severity="info">
          No partner modules available at the moment.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {modules.map((module) => (
            <Grid item xs={12} sm={6} md={4} key={module._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {module.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {module.description}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={module.progress || 0}
                    sx={{ marginBottom: 2 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Progress: {module.progress || 0}%
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleStartModule(module._id)}
                    disabled={module.progress === 100}
                  >
                    {module.progress === 100 ? "Completed" : "Start Module"}
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
