import React from "react";
import "./FaqAccordion.css";
import Accordion from "react-bootstrap/Accordion";

function FaqAccordion() {
  return (
    <div className="faq-section">
      <div className="container d-flex flex-column align-items-center">
        <h2 className="text-center text-capitalize mb-5">
          Frequently Asked Questions
        </h2>
        <p className="text-center mb-5">
          Here are some common questions about the U-INSPIRE Award program. If
          you don't find the answer you're looking for, please contact the
          Technical and Entrepreneurship Centre (TEC) for more information.
        </p>
        <Accordion defaultActiveKey="" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Who is eligible for the U-INSPIRE Award?
            </Accordion.Header>
            <Accordion.Body>
              The U-INSPIRE Award is available to all undergraduate and
              postgraduate students at the University of Ilorin. You can join
              the program at any stage in your academic journey, but the award
              must be completed before graduation.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              How do I enroll in the U-INSPIRE Award program?
            </Accordion.Header>
            <Accordion.Body>
              Enrollment is flexible and can be done through an online portal
              managed by the Computer Services and Information Technology
              Directorate (COMSIT). Visit the portal to create an account and
              start your U-INSPIRE journey.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              What are the components of the U-INSPIRE Award?
            </Accordion.Header>
            <Accordion.Body>
              The U-INSPIRE Award consists of three main components: Soft Skills
              Development, Internship/Work Experience, and Skills Acquisition &
              Entrepreneurship. You'll need to complete activities in each of
              these areas to earn your award.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              How do I earn points towards the U-INSPIRE Award?
            </Accordion.Header>
            <Accordion.Body>
              You accumulate points based on completed tasks and accomplishments
              within the program's components. There's a minimum point threshold
              required to qualify for certification. The specific point system
              and requirements are detailed in the program guide available on
              the online portal.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              What is the "Wrap up Experience" and when do I complete it?
            </Accordion.Header>
            <Accordion.Body>
              The "Wrap up Experience" is a reflective write-up you complete at
              the end of the program. It details your key activities, personal
              development, and how your experiences connect to your future
              goals. You'll prepare this after completing all required modules
              and before receiving your final U-INSPIRE Award.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              Are there any opportunities for industry engagement through this
              program?
            </Accordion.Header>
            <Accordion.Body>
              Yes! We actively partner with companies across various sectors to
              provide hands-on training and real-world work experience. We also
              invite innovation hubs and companies to offer internships. These
              partnerships aim to equip you with entrepreneurial skills and
              valuable industry experience.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>
              Is the program different for postgraduate students?
            </Accordion.Header>
            <Accordion.Body>
              While the core components remain the same, postgraduate students
              can include recent professional experiences, volunteer work, or
              community roles from the past three years to demonstrate their
              growth and development, in addition to university activities.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default FaqAccordion;
