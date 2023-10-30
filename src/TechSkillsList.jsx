import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";
import TrainerForm from "./TrainerForm";

export default function TechSkillsList() {
  const [techSkills, setTechSkills] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [updateSkillId, setUpdateSkillId] = useState(null);
  const [updateSkillName, setUpdateSkillName] = useState("");
  const [flag, setFlag] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [trainees, setTrainees] = useState([]);
  const [updateTraineeId, setUpdateTraineeId] = useState(null);
  const [updateTraineeName, setUpdateTraineeName] = useState("");
  const [traineeName, setTraineeName] = useState("");
  const [internStartDate, setInternStartDate] = useState("");
  const [internEndDate, setInternEndDate] = useState("");
  const [internCompleted, setInternCompleted] = useState(false);

  useEffect(() => {
    handleFetchTechSkills();
  }, [flag]);

  function handleFetchTechSkills() {
    axios
      .get("http://localhost:8080/api/tech-skill/getAllSkills")
      .then((response) => {
        setTechSkills(response.data);
        setFetched(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdateSkill(id) {
    setUpdateSkillId(id);
    const skillToUpdate = techSkills.find((skill) => skill.id === id);
    setUpdateSkillName(skillToUpdate.name);
  }

  function handleSaveUpdate() {
    axios
      .put(
        `http://localhost:8080/api/tech-skill/updateSkill/${updateSkillId}`,
        {
          name: updateSkillName,
        }
      )
      .then((response) => {
        setTechSkills((prevSkills) =>
          prevSkills.map((skill) =>
            skill.id === updateSkillId
              ? { ...skill, name: updateSkillName }
              : skill
          )
        );
        setUpdateSkillId(null);
        setUpdateSkillName("");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDeleteSkill(id) {
    axios
      .delete(`http://localhost:8080/api/tech-skill/deleteSkill/${id}`)
      .then((response) => {
        setTechSkills((prevSkills) =>
          prevSkills.filter((skill) => skill.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const openComponent = (component) => {
    setShowAddForm(component === "ADD_TRAINEE");
  };

  return (
    <div className="container mt-4">
      {showAddForm && (
        <button
          className="btn btn-secondary"
          onClick={setShowAddForm(!showAddForm)}
        >
          Close Form
        </button>
      )}
      {showAddForm && <Form flag={flag} setFlag={setFlag} />}
      {!showAddForm && (
        <div className="">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              setShowAddForm(true);
            }}
          >
            Add Tech Skill
          </button>
        </div>
      )}
      {!showAddForm && fetched && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Tech Skills</h5>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {techSkills.map((skill, index) => (
                    <tr key={skill.id}>
                      <td>{index + 1}</td>
                      <td>
                        {updateSkillId === skill.id ? (
                          <input
                            type="text"
                            value={updateSkillName}
                            onChange={(e) => setUpdateSkillName(e.target.value)}
                          />
                        ) : (
                          skill.name
                        )}
                      </td>
                      <td>
                        {updateSkillId === skill.id ? (
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
                                setUpdateSkillId(null);
                                setUpdateSkillName("");
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleUpdateSkill(skill.id)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-sm btn-danger ms-2"
                              onClick={() => handleDeleteSkill(skill.id)}
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

/**
 * {showAddForm && (
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
 */
