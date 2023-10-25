import axios from "axios";
import React, { useState } from "react";

export default function TraineeForm() {
  const [fetched, setFetched] = useState(false);
  const [trainee, setTrainee] = useState([]);
  const [updateTrainerId, setUpdateTrainerId] = useState(null);
  const [updateTrainerName, setUpdateTrainerName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [trainerName, setTrainerName] = useState("");
  const [techSkills, setTechSkills] = useState([]);

  function handleFetchTrainee(e) {
    e.preventDefault();
    axios
      .get("http://localhost:8080/api/trainee/getAll")
      .then((response) => {
        setTrainee(response.data);
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
        setTrainee((preTrainers) =>
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
        setTrainee((prevTrainers) =>
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
      techSkills: techSkills.map((skillId) => ({ id: skillId })),
    };

    axios
      .post("http://localhost:8080/api/trainer/createTrainer", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function handleTechSkillsChange(event) {
    const selectedTechSkills = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setTechSkills(selectedTechSkills);
  }

  const openComponent = (component) => {
    setShowAddForm(component === "ADD_TRAINER");
  };
  function handleBack() {
    setShowAddForm(false);
  }

  return (
    <div className="container mt-4">
      {/* {fetched ? null :( */}
      <button onClick={handleFetchTrainee} className="btn btn-primary">
        Trainee
      </button>
      {/* )} */}
      {showAddForm && (
        <button className="btn btn-primary" onClick={handleBack}>
          Back
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
                <select
                  multiple
                  className="form-control"
                  id="techSkills"
                  onChange={handleTechSkillsChange}
                >
                  {techSkills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {fetched && (
        <div className="">
          <button
            className="btn btn-primary"
            onClick={() => openComponent("ADD_TRAINER")}
          >
            Add Trainer
          </button>
        </div>
      )}
      {fetched && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Trainers</h5>
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
                  {trainee.map((trainer) => (
                    <tr key={trainer.id}>
                      <td>{trainer.id}</td>
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
                              Update
                            </button>
                            <button
                              className="btn btn-sm btn-danger ms-2"
                              onClick={() => handleDeleteTrainer(trainer.id)}
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
