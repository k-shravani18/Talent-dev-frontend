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
  const [showAddForm, setShowAddForm] = useState(true);

  useEffect(() => {
    handleFetchTechSkills();
    setShowAddForm(false);
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
      {!showAddForm ? (
        <button
          className="btn btn-primary"
          onClick={(e) => setShowAddForm(true)}
        >
          Add Tech Skill
        </button>
      ) : null}

      {showAddForm ? (
        <button
          className="btn btn-secondary mb-3"
          onClick={(e) => setShowAddForm(false)}
        >
          Close Form
        </button>
      ) : (
        <></>
      )}
      {showAddForm ? <Form flag={flag} setFlag={setFlag} /> : <></>}

      {fetched && !showAddForm && (
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
