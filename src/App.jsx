import { useState } from "react";
import Form from "./Form";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.css";
import TrainerForm from "./TrainerForm";
import TechSkillsList from "./TechSkillsList";
import TraineeForm from "./TraineeForm";

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
              className="nav-link w-100"
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
          {/* <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="disabled-tab"
              data-bs-toggle="tab"
              data-bs-target="#disabled-tab-pane"
              type="button"
              role="tab"
              aria-controls="disabled-tab-pane"
              aria-selected="false"
              disabled
            >
              Disabled
            </button>
          </li> */}
        </ul>
        <div className="tab-content col-10" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabindex="0"
          >
            <TechSkillsList />
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabindex="0"
          >
            <TrainerForm />
          </div>
          <div
            className="tab-pane fade"
            id="contact-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
            tabindex="0"
          >
            <TraineeForm />
          </div>
          {/* <div
            className="tab-pane fade"
            id="disabled-tab-pane"
            role="tabpanel"
            aria-labelledby="disabled-tab"
            tabindex="0"
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
    </>
  );
}

export default App;
