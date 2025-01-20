import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Launch as LaunchIcon } from "@mui/icons-material";

export function CommunicationLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCommunicationLinks();
  }, []);

  const fetchCommunicationLinks = async () => {
    try {
      const response = await axios.get("/api/student/communication-links");
      setLinks(response.data.links);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch communication links");
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Communication Links
      </Typography>
      {links.length === 0 ? (
        <Alert severity="info">
          No communication links available at the moment.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {links.map((link, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {link.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {link.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    endIcon={<LaunchIcon />}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Link
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
