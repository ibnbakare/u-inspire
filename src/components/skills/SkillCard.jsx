import React from "react";
import { Card, ProgressBar } from "react-bootstrap";

export const SkillCard = ({ skill }) => {
  // console.log(skill.skillId.name);
  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <span>{skill.skillId.title}</span>
          <span className="badge bg-primary">Technical</span>
        </Card.Title>
        <Card.Text>{skill.skillId.description}</Card.Text>
        <div className="mt-3">
          <small className="text-muted">Progress</small>
          <ProgressBar now={skill.progress} label={`${skill.progress}%`} />
        </div>
        <div className="mt-2">
          <small className="text-muted">
            Enrolled: {new Date(skill.enrollmentDate).toLocaleDateString()}
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};
