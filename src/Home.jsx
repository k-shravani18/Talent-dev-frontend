import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const myStyle = {
    backgroundColor: "#ffffff",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const opendashBoard = (val) => {
    if (val) {
    }
  };
  return (
    <>
      <div className="p-5" style={myStyle}>
        <div className="row">
          <div className="col">
            <div class="card mb-4">
              <div class="card-body" style={{ backgroundColor: "#bae2dda6" }}>
                <h5 class="card-title">Tech Skills</h5>
                <p class="card-text">List of Tech Skills.</p>
                <Link
                  to={"/dashboard/techskills"}
                  class="btn btn-outline-success"
                >
                  Click To View
                </Link>
              </div>
            </div>
            <div class="card mb-4">
              <div class="card-body" style={{ backgroundColor: "#bae2dda6" }}>
                <h5 class="card-title">Class Link</h5>
                <p class="card-text">Get the updates on Digital Classess.</p>
                <Link
                  to={"/dashboard/classlink"}
                  class="btn btn-outline-success"
                >
                  Click To View
                </Link>
              </div>
            </div>
            <div class="card mb-4">
              <div class="card-body" style={{ backgroundColor: "#bae2dda6" }}>
                <h5 class="card-title">Notification</h5>
                <p class="card-text">
                  Get the Updates on the classess and projects.
                </p>
                <Link
                  to={"/dashboard/notification"}
                  class="btn btn-outline-success"
                >
                  Click To View
                </Link>
              </div>
            </div>
            <div class="card mb-4">
              <div class="card-body" style={{ backgroundColor: "#bae2dda6" }}>
                <h5 class="card-title">Performance Report</h5>
                <p class="card-text">Get performace reports of the Students.</p>
                <Link
                  to={"/dashboard/performance"}
                  class="btn btn-outline-success"
                >
                  Click To View
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card mb-4">
              <div class="card-body" style={{ backgroundColor: "#bae2dda6" }}>
                <h5 class="card-title">Trainer</h5>
                <p class="card-text">
                  Check the list of trainers working in different Tech Skills.
                </p>
                <Link to={"/dashboard/trainer"} class="btn btn-outline-success">
                  Click To View
                </Link>
              </div>
            </div>
            <div class="card mb-4">
              <div class="card-body" style={{ backgroundColor: "#bae2dda6" }}>
                <h5 class="card-title">Trainee</h5>
                <p class="card-text">List of trainees And the Data.</p>
                <Link to={"/dashboard/trainee"} class="btn btn-outline-success">
                  Click To View
                </Link>
              </div>
            </div>
            <div class="card mb-4">
              <div class="card-body" style={{ backgroundColor: "#bae2dda6" }}>
                <h5 class="card-title">Assessment</h5>
                <p class="card-text">Assessment Reports and Status</p>
                <Link
                  to={"/dashboard/assessment"}
                  class="btn btn-outline-success"
                >
                  Click To View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
