import { useParams } from "react-router-dom";
import AssessmentForm from "./AssessmentForm";
import ClassLinkForm from "./ClassLinkForm";
import NotificationForm from "./NotificationForm";
import PerformanceReportForm from "./PerformanceReportForm";
import TechSkillsList from "./TechSkillsList";
import TraineeForm from "./TraineeForm";
import TrainerForm from "./TrainerForm";
import UserForm from "./UserForm";
import RoleForm from "./RoleForm";

export const Array = [
  { name: "techskills", label: "Tech Skills", component: <TechSkillsList /> },
  { name: "trainer", label: "Trainer", component: <TrainerForm /> },
  { name: "trainee", label: "Trainee", component: <TraineeForm /> },
  { name: "assessment", label: "Assessment", component: <AssessmentForm /> },
  {
    name: "performance",
    label: "Performance",
    component: <PerformanceReportForm />,
  },
  { name: "classlink", label: "Class Link", component: <ClassLinkForm /> },
  {
    name: "notification",
    label: "Notification",
    component: <NotificationForm />,
  },
  { name: "user", label: "user", component: <UserForm /> },
  { name: "role", label: "role", component: <RoleForm /> },
];

export const Dashboard = () => {
  const params = useParams();
  console.log(params.id);
  return (
    <div
      className="App d-flex flex-row vh-100 "
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <ul
        className="nav nav-pills flex-column col-2"
        style={{ backgroundColor: "#bae2dda6" }}
        id="myTab"
        role="tablist"
      >
        {Array.map((field) => (
          <li className="nav-item" role="presentation">
            <button
              className={
                (field.name === params.id ? "active" : "") +
                " nav-link w-100 rounded-0 "
              }
              id={field.name + "-tab"}
              data-bs-toggle="tab"
              data-bs-target={`#${field.name}-tab-pane`}
              type="button"
              role="tab"
              aria-controls={`${field.name}-tab-pane`}
              aria-selected="true"
            >
              {field.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content col-10" id="myTabContent">
        {Array.map((field) => (
          <div
            className={
              "tab-pane fade " + (field.name === params.id ? "show active" : "")
            }
            id={`${field.name}-tab-pane`}
            role="tabpanel"
            aria-labelledby={`${field.name}-tab`}
            tabIndex="0"
          >
            {field.component}
          </div>
        ))}
        {/* // <div
        //   className="tab-pane fade show active"
        //   id="home-tab-pane"
        //   role="tabpanel"
        //   aria-labelledby="home-tab"
        //   tabIndex="0"
        // >
        //   <TechSkillsList />
        // </div>
        // <div
        //   className="tab-pane fade"
        //   id="profile-tab-pane"
        //   role="tabpanel"
        //   aria-labelledby="profile-tab"
        //   tabIndex="0"
        // >
        //   <TrainerForm />
        // </div>
        // <div
        //   className="tab-pane fade"
        //   id="contact-tab-pane"
        //   role="tabpanel"
        //   aria-labelledby="contact-tab"
        //   tabIndex="0"
        // >
        //   <TraineeForm />
        // </div>
        // <div
        //   className="tab-pane fade"
        //   id="assessment-tab-pane"
        //   role="tabpanel"
        //   aria-labelledby="assessment-tab"
        //   tabIndex="0"
        // >
        //   <AssessmentForm />
        // </div>
        // <div
        //   className="tab-pane fade"
        //   id="pr-tab-pane"
        //   role="tabpanel"
        //   aria-labelledby="pr-tab"
        //   tabIndex="0"
        // >
        //   <PerformanceReportForm />
        // </div>
        // <div
        //   className="tab-pane fade"
        //   id="cl-tab-pane"
        //   role="tabpanel"
        //   aria-labelledby="cl-tab"
        //   tabIndex="0"
        // >
        //   <ClassLinkForm />
        // </div>
        // <div
        //   className="tab-pane fade"
        //   id="notification-tab-pane"
        //   role="tabpanel"
        //   aria-labelledby="notification-tab"
        //   tabIndex="0"
        // >
        //   <NotificationForm />
        // </div> */}
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
  );
};
