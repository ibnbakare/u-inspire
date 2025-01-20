import React from "react";
import { Card, CardContent, Typography, LinearProgress } from "@mui/material";

export function SkillCard({ skill }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {skill.skillId.name}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={skill.progress}
          sx={{ marginBottom: 2 }}
        />
        <Typography variant="body2" color="text.secondary">
          Progress: {skill.progress}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {skill.status}
        </Typography>
      </CardContent>
    </Card>
  );
}
