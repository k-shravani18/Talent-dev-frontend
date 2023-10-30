import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TraineeForm() {
  const [fetched, setFetched] = useState(false);
  const [trainees, setTrainees] = useState([]);
  const [updateTraineeId, setUpdateTraineeId] = useState(null);
  const [updateTraineeName, setUpdateTraineeName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [traineeName, setTraineeName] = useState("");
  const [internStartDate, setInternStartDate] = useState("");
  const [internEndDate, setInternEndDate] = useState("");
  const [internCompleted, setInternCompleted] = useState(false);

  useEffect(() => {
    handleFetchTrainees();
  }, []);

  function handleFetchTrainees() {
    axios
      .get("http://localhost:8080/api/trainee/getAll")
      .then((response) => {
        setTrainees(response.data);
        setFetched(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdateTrainee(id) {
    setUpdateTraineeId(id);
    const traineeToUpdate = trainees.find((trainee) => trainee.id === id);
    setUpdateTraineeName(traineeToUpdate.name);
    setInternStartDate(traineeToUpdate.internStartDate);
    setInternEndDate(traineeToUpdate.internEndDate);
    setInternCompleted(traineeToUpdate.internCompleted);
  }

  function handleSaveUpdate() {
    axios
      .put(`http://localhost:8080/api/trainee/update/${updateTraineeId}`, {
        name: updateTraineeName,
        internStartDate: internStartDate,
        internEndDate: internEndDate,
        internCompleted: internCompleted,
      })
      .then((response) => {
        setTrainees((preTrainees) =>
          preTrainees.map((trainee) =>
            trainee.id === updateTraineeId
              ? {
                  ...trainee,
                  name: updateTraineeName,
                  internStartDate: internStartDate,
                  internEndDate: internEndDate,
                  internCompleted: internCompleted,
                }
              : trainee
          )
        );
        setUpdateTraineeId(null);
        setUpdateTraineeName("");
        setInternStartDate("");
        setInternEndDate("");
        setInternCompleted(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDeleteTrainee(id) {
    axios
      .delete(`http://localhost:8080/api/trainee/delete/${id}`)
      .then((response) => {
        setTrainees((prevTrainees) =>
          prevTrainees.filter((trainee) => trainee.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAddTrainee(event) {
    event.preventDefault();

    if (
      traineeName.trim() === "" ||
      internStartDate.trim() === "" ||
      internEndDate.trim() === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      name: traineeName,
      internStartDate: internStartDate,
      internEndDate: internEndDate,
      internCompleted: internCompleted,
    };

    axios
      .post("http://localhost:8080/api/trainee/create", data)
      .then((response) => {
        setTrainees((preTrainees) => [...preTrainees, response.data]);
        setTraineeName("");
        setInternStartDate("");
        setInternEndDate("");
        setInternCompleted(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const openComponent = (component) => {
    setShowAddForm(component === "ADD_TRAINEE");
  };

  function handleBack() {
    setShowAddForm(false);
  }

  return (
    <div className="container mt-4">
      {showAddForm && (
        <button className="btn btn-secondary" onClick={handleBack}>
          Close Form
        </button>
      )}
      {showAddForm && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Add Trainee</h5>
            <form onSubmit={handleAddTrainee}>
              <div className="form-group">
                <label htmlFor="traineeName">Trainee Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="traineeName"
                  value={traineeName}
                  onChange={(e) => setTraineeName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="internStartDate">Intern Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="internStartDate"
                  value={internStartDate}
                  onChange={(e) => setInternStartDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="internEndDate">Intern End Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="internEndDate"
                  value={internEndDate}
                  onChange={(e) => setInternEndDate(e.target.value)}
                />
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="internCompleted"
                  checked={internCompleted}
                  onChange={(e) => setInternCompleted(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="internCompleted">
                  Intern Completed
                </label>
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Add
              </button>
            </form>
          </div>
        </div>
      )}
      {!showAddForm && (
        <div className="">
          <button
            className="btn btn-primary"
            onClick={() => openComponent("ADD_TRAINEE")}
          >
            Add Trainee
          </button>
        </div>
      )}
      {fetched && !showAddForm && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Trainees</h5>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Intern Start Date</th>
                    <th>Intern End Date</th>
                    <th>Intern Completed</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trainees.map((trainee, index) => (
                    <tr key={trainee.id}>
                      <td>{index + 1}</td>
                      <td>
                        {updateTraineeId === trainee.id ? (
                          <input
                            type="text"
                            value={updateTraineeName}
                            onChange={(e) =>
                              setUpdateTraineeName(e.target.value)
                            }
                          />
                        ) : (
                          trainee.name
                        )}
                      </td>
                      <td>{trainee.internStartDate}</td>
                      <td>{trainee.internEndDate}</td>
                      <td>{trainee.internCompleted ? "Yes" : "No"}</td>
                      <td>
                        {updateTraineeId === trainee.id ? (
                          <>
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleSaveUpdate()}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-sm btn-secondary ms-2"
                              onClick={() => {
                                setUpdateTraineeId(null);
                                setUpdateTraineeName("");
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleUpdateTrainee(trainee.id)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-sm btn-danger ms-2"
                              onClick={() => handleDeleteTrainee(trainee.id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
