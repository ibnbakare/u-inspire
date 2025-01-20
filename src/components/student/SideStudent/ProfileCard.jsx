import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Avatar,
} from "@mui/material";

export function ProfileCard({ userData, onUpdateProfile }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Profile
        </Typography>
        <Avatar
          alt={`${userData.firstName} ${userData.lastName}`}
          src={userData.avatar}
          sx={{ width: 100, height: 100, margin: "0 auto 16px" }}
        />
        <Typography variant="body1" gutterBottom>
          {userData.firstName} {userData.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {userData.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Matric Number: {userData.matricNumber}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onUpdateProfile(userData)}>
          Update Profile
        </Button>
      </CardActions>
    </Card>
  );
}
