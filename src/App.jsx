import { useState } from "react";
import Form from "./Form";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.css";
import TrainerForm from "./TrainerForm";
import TechSkillsList from "./TechSkillsList";
import TraineeForm from "./TraineeForm";
import AssessmentForm from "./AssessmentForm";
import PerformanceReportForm from "./PerformanceReportForm";
import ClassLinkForm from "./ClassLinkForm";
import NotificationForm from "./NotificationForm";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <div className="App d-flex flex-row">
        <ul
          className="nav nav-pills flex-column col-2"
          id="myTab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link w-100 active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
            >
              Tech Skills
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link w-100"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
            >
              Trainer
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link w-100"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact-tab-pane"
              type="button"
              role="tab"
              aria-controls="contact-tab-pane"
              aria-selected="false"
            >
              Trainee
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link w-100"
              id="assessment-tab"
              data-bs-toggle="tab"
              data-bs-target="#assessment-tab-pane"
              type="button"
              role="tab"
              aria-controls="assessment-tab-pane"
              aria-selected="false"
            >
              Assessment
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link w-100"
              id="pr-tab"
              data-bs-toggle="tab"
              data-bs-target="#pr-tab-pane"
              type="button"
              role="tab"
              aria-controls="pr-tab-pane"
              aria-selected="false"
            >
              Performance
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link w-100"
              id="cl-tab"
              data-bs-toggle="tab"
              data-bs-target="#cl-tab-pane"
              type="button"
              role="tab"
              aria-controls="cl-tab-pane"
              aria-selected="false"
            >
              Class Link
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link w-100"
              id="notification-tab"
              data-bs-toggle="tab"
              data-bs-target="#notification-tab-pane"
              type="button"
              role="tab"
              aria-controls="notification-tab-pane"
              aria-selected="false"
            >
              Notification
            </button>
          </li>
        </ul>
        <div className="tab-content col-10" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabIndex="0"
          >
            <TechSkillsList />
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabIndex="0"
          >
            <TrainerForm />
          </div>
          <div
            className="tab-pane fade"
            id="contact-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
            tabIndex="0"
          >
            <TraineeForm />
          </div>
          <div
            className="tab-pane fade"
            id="assessment-tab-pane"
            role="tabpanel"
            aria-labelledby="assessment-tab"
            tabIndex="0"
          >
            <AssessmentForm />
          </div>
          <div
            className="tab-pane fade"
            id="pr-tab-pane"
            role="tabpanel"
            aria-labelledby="pr-tab"
            tabIndex="0"
          >
            <PerformanceReportForm />
          </div>
          <div
            className="tab-pane fade"
            id="cl-tab-pane"
            role="tabpanel"
            aria-labelledby="cl-tab"
            tabIndex="0"
          >
            <ClassLinkForm />
          </div>
          <div
            className="tab-pane fade"
            id="notification-tab-pane"
            role="tabpanel"
            aria-labelledby="notification-tab"
            tabIndex="0"
          >
            <NotificationForm />
          </div>
          {/* <div
              className="tab-pane fade"
              id="disabled-tab-pane"
              role="tabpanel"
              aria-labelledby="disabled-tab"
              tabIndex="0"
            >
              ...
            </div> */}
        </div>
        {/* <button classNameName="btn btn-sm btn-primary ms-2">Attendence</button>
          <button classNameName="btn btn-sm btn-primary ms-2">Assessment</button>
          <button classNameName="btn btn-sm btn-primary ms-2">
            className link
          </button>
          <button classNameName="btn btn-sm btn-primary ms-2">
            Notification
          </button>
          <button classNameName="btn btn-sm btn-primary ms-2">Performace</button> */}
      </div>
      <Footer />
    </>
  );
}

export default App;
