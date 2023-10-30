import React, { useState, useEffect } from "react";
import axios from "axios";
import "./trainer.css";

export default function TrainerForm() {
  const [fetched, setFetched] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [updateTrainerId, setUpdateTrainerId] = useState(null);
  const [updateTrainerName, setUpdateTrainerName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [trainerName, setTrainerName] = useState("");
  const [techSkills, setTechSkills] = useState([]);
  const [selectedTechSkills, setSelectedTechSkills] = useState([]);

  useEffect(() => {
    handleFetchTrainers();
  }, []);

  function handleFetchTrainers() {
    axios
      .get("http://localhost:8080/api/trainer/getAllTrainers")
      .then((response) => {
        setTrainers(response.data);
        setFetched(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdateTrainer(id) {
    setUpdateTrainerId(id);
    const trainerToUpdate = trainers.find((trainer) => trainer.id === id);
    setUpdateTrainerName(trainerToUpdate.name);
  }

  function handleSaveUpdate() {
    axios
      .put(`http://localhost:8080/api/trainer/editTrainer/${updateTrainerId}`, {
        name: updateTrainerName,
      })
      .then((response) => {
        setTrainers((preTrainers) =>
          preTrainers.map((trainer) =>
            trainer.id === updateTrainerId
              ? { ...trainer, name: updateTrainerName }
              : trainer
          )
        );
        setUpdateTrainerId(null);
        setUpdateTrainerName("");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDeleteTrainer(id) {
    axios
      .delete(`http://localhost:8080/api/trainer/deleteTrainer/${id}`)
      .then((response) => {
        setTrainers((prevTrainers) =>
          prevTrainers.filter((trainer) => trainer.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAddTrainer(event) {
    event.preventDefault();

    if (trainerName.trim() === "" || techSkills.length === 0) {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      name: trainerName,
      techSkills: selectedTechSkills.map((skillId) => ({ id: skillId })),
    };

    axios
      .post("http://localhost:8080/api/trainer/createTrainer", data)
      .then((response) => {
        // setTrainers(respon se.data);
        setTrainers((preTrainers) => [...preTrainers, response.data]);
        setTrainerName("");
        setSelectedTechSkills([]);
        // })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleTechSkillsChange(skillId) {
    setSelectedTechSkills((prevSkills) => {
      if (prevSkills.includes(skillId)) {
        return prevSkills.filter((id) => id !== skillId);
      } else {
        return [...prevSkills, skillId];
      }
    });
  }

  const openComponent = (component) => {
    axios
      .get("http://localhost:8080/api/tech-skill/getAllSkills")
      .then((response) => {
        setTechSkills(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setShowAddForm(component === "ADD_TRAINER");
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
            <h5 className="card-title">Add Trainer</h5>
            <form onSubmit={handleAddTrainer}>
              <div className="form-group">
                <label htmlFor="trainerName">Trainer Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="trainerName"
                  value={trainerName}
                  onChange={(e) => setTrainerName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="techSkills">Tech Skills</label>

                {techSkills.map((skill) => (
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={skill.id}
                      id={`flexCheckDefault_${skill.id}`}
                      // checked={selectedTechSkills.includes(skill.id)}
                      onChange={() => handleTechSkillsChange(skill.id)}
                    />

                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {skill.name}
                    </label>
                  </div>
                ))}
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
            onClick={() => openComponent("ADD_TRAINER")}
          >
            Add Trainer
          </button>
        </div>
      )}
      {fetched && !showAddForm && (
        <div className="card mt-4">
          <div className="card-body">
            {/* <h5 className="card-title">Trainers</h5> */}
            <div className="table-responsive">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Traines Count</th>
                    <th>Tech skills</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trainers.map((trainer, index) => (
                    <tr key={trainer.id}>
                      <td>{index + 1}</td>
                      <td>
                        {updateTrainerId === trainer.id ? (
                          <input
                            type="text"
                            value={updateTrainerName}
                            onChange={(e) =>
                              setUpdateTrainerName(e.target.value)
                            }
                          />
                        ) : (
                          trainer.name
                        )}
                      </td>
                      <td>{trainer.trainees && trainer.trainees.length}</td>
                      <td>
                        {trainer.techSkills &&
                          trainer.techSkills.map((skill) => (
                            <span
                              className="badge rounded-pill text-bg-warning me-2"
                              key={skill.id}
                            >
                              {skill.name}
                            </span>
                          ))}
                      </td>
                      <td>
                        {updateTrainerId === trainer.id ? (
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
                                setUpdateTrainerId(null);
                                setUpdateTrainerName("");
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleUpdateTrainer(trainer.id)}
                            >
                              <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-danger ms-2"
                              onClick={() => handleDeleteTrainer(trainer.id)}
                            >
                              <i class="fa-regular fa-trash-can"></i>
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
