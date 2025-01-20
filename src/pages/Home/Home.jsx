import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Card, Accordion } from "react-bootstrap";
import StartCoursesImg from "../../utils/images/shutterstock_432066802-scaled.jpg.webp";
import Blog1Img from "../../utils/images/softskills.webp";
import Blog2Img from "../../utils/images/intern.jpg";
import Blog3Img from "../../utils/images/what-are-entrepreneurial-skills.jpg";
import FaqAccordion from "../../components/FaqAccordion/FaqAccordion";

const awardComponents = [
  {
    id: 1,
    img: Blog1Img,
    title: "Soft Skills Development",
    description:
      "Cultivate leadership, communication, teamwork, and interpersonal skills essential for your future career.",
  },
  {
    id: 2,
    img: Blog2Img,
    title: "Internship/Work Experience",
    description:
      "Gain practical experience through internships, part-time jobs, or other work-related activities that prepare you for the professional world.",
  },
  {
    id: 3,
    img: Blog3Img,
    title: "Skills Acquisition & Entrepreneurship",
    description:
      "Engage in entrepreneurial projects, practical ventures, or community service to sharpen your skills and foster innovation.",
  },
];

function Home() {
  return (
    <div className="home-page">
      <header
        className="h-100 min-vh-100 d-flex align-items-center text-light"
        style={{ backgroundColor: "#29166F" }}
      >
        <div className="container d-flex flex-column align-items-center">
          <h1 className="text-center fw-semibold">U-INSPIRE Award</h1>
          <h2 className="text-center">
            University of Ilorin INnovative Skills and PIoneering
            Entrepreneurship Award
          </h2>
          <p className="text-center">
            Showcasing students' accomplishments inside and outside of the
            classroom, preparing them for future success.
          </p>
          <div className="d-flex flex-column flex-sm-row align-items-center">
            <Link to="/registration">
              <button
                type="button"
                className="btn btn-light btn-lg mx-0 mx-sm-2 my-2 my-sm-0"
              >
                Apply Now
              </button>
            </Link>
            <Link to="#ProgramDetails">
              <button
                type="button"
                className="btn btn-outline-light btn-lg mx-0 mx-sm-2 my-2 my-sm-0"
              >
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">
            Why Participate in the U-INSPIRE Award?
          </h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <h3>Enhance Employability</h3>
              <p>
                Develop key skills in leadership, communication, and
                entrepreneurship that are highly valued by employers.
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <h3>Build Confidence</h3>
              <p>
                Prepare for a smooth transition from university life to the
                professional or academic world.
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <h3>Stand Out</h3>
              <p>
                Earn formal certification reflecting your real-world experiences
                and comprehensive skill set.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5 bg-light">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-around">
            <div className="col-lg-5">
              <h2 className="text-capitalize">U-INSPIRE Award Components</h2>
              <p>
                The U-INSPIRE Award is structured around three core pillars that
                foster a well-rounded student experience. Complete these
                components to earn your award before graduation.
              </p>
              <Link href="#ProgramDetails">
                <button
                  type="button"
                  className="btn btn-lg mx-0 mx-sm-2 my-2 my-sm-0"
                  style={{ backgroundColor: "#29166F", color: "white" }}
                >
                  Learn More
                </button>
              </Link>
            </div>
            <div className="col-lg-5 mt-5 mt-lg-0">
              <img
                src={StartCoursesImg}
                className="img-fluid"
                alt="Students collaborating"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="container">
          <h2 className="text-center mb-5" id="ProgramDetails">
            Program Details
          </h2>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                The Technical and Entrepreneurship Centre (TEC)
              </Accordion.Header>
              <Accordion.Body>
                The U-INSPIRE Award is managed by the Technical and
                Entrepreneurship Centre (TEC), a sub-unit dedicated to
                supporting students throughout their journey in the program. TEC
                works closely with trainers to guide participants and ensure
                they receive the necessary resources and support.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Process and Certification</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>
                    The process of engagement is streamlined through an online
                    portal managed by the Computer Services and Information
                    Technology Directorate (COMSIT).
                  </li>
                  <li>
                    Students accumulate points based on completed tasks and
                    accomplishments, with a minimum point threshold required to
                    qualify for certification.
                  </li>
                  <li>
                    Certificates will be awarded for completed modules, and the
                    full U-INSPIRE Award will be granted upon satisfying all
                    program requirements before graduation.
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Flexibility and Enrollment</Accordion.Header>
              <Accordion.Body>
                The U-INSPIRE Award is available to all undergraduate and
                postgraduate students at the University of Ilorin. Enrollment is
                flexible, and students can join the program at any stage in
                their academic journey. However, the award must be completed
                before graduation.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Wrap up Experience</Accordion.Header>
              <Accordion.Body>
                Upon completion of the required modules, participants will
                prepare a wrap up experience write-up detailing key activities,
                reflection on personal development, and connection to future
                goals. Only accredited activities and trainings will be counted
                towards the U-INSPIRE Award.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Industry Engagement</Accordion.Header>
              <Accordion.Body>
                We are actively seeking industry partners to provide hands-on
                training and real-world work experience for our students. We aim
                to equip our students with entrepreneurial skills that will
                allow them to become job creators, particularly in fields
                critical to national development. Companies interested in
                partnering should contact the Director of Technical and
                Entrepreneurship Centre (dtec@unilorin.edu.ng).
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>
                Endowments for Distinguished Participants
              </Accordion.Header>
              <Accordion.Body>
                We are seeking industry endowments for participants who
                distinguish themselves through the U-INSPIRE Award. These
                endowments will serve as prizes to recognize top achievers,
                encouraging students to fully engage with the program and
                develop skills that will drive their future success.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>For Postgraduate Students</Accordion.Header>
              <Accordion.Body>
                The U-INSPIRE Award is tailored to accommodate postgraduate
                students as well. In addition to university activities,
                postgraduate students can include recent professional
                experiences, volunteer work, or community roles from the past
                three years to demonstrate their growth and development.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>

      <div
        className="blog-section text-light py-5"
        style={{ backgroundColor: "#29166F" }}
      >
        <div className="container d-flex flex-column align-items-center">
          <h2 className="text-center text-capitalize mb-5">Award Components</h2>
          <div className="row g-4">
            {awardComponents.map((component) => (
              <div key={component.id} className="col-md-6 col-lg-4">
                <Card className="h-100 shadow scale-hover-effect">
                  <Card.Img variant="top" src={component.img} />
                  <Card.Body className="p-md-5">
                    <Card.Title>{component.title}</Card.Title>
                    <Card.Text>{component.description}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          <Link to="/registration">
            <button type="button" className="btn btn-light btn-lg mt-5">
              Enroll Now
            </button>
          </Link>
        </div>
      </div>

      <div className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">
            How the U-INSPIRE Award Helps You Stand Out
          </h2>
          <p className="text-center">
            In today's competitive job market, a degree alone may not be enough.
            Employers seek candidates with initiative, creativity, and
            leadership skills. The U-INSPIRE Award distinguishes participants by
            formally recognizing their involvement in activities that contribute
            to holistic development, showcasing their readiness for real-world
            challenges.
          </p>
        </div>
      </div>
      <div className="py-5 bg-light" id="faq">
        <FaqAccordion />
      </div>
    </div>
  );
}

export default Home;
