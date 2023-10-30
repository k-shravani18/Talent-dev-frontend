import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AssessmentForm() {
  const [fetched, setFetched] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [updateAssessmentId, setUpdateAssessmentId] = useState(null);
  const [updateSkill, setUpdateSkill] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [techSkills, setTechSkills] = useState([]);
  const [selectedTechSkills, setSelectedTechSkills] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    handleFetchAssessments();
  }, []);

  function handleFetchAssessments() {
    axios
      .get("http://localhost:8080/api/assessment/getAllAssessments")
      .then((response) => {
        setAssessments(response.data);
        setFetched(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdateAssessment(id) {
    setUpdateAssessmentId(id);
    const assessmentToUpdate = assessments.find(
      (assessment) => assessment.id === id
    );
    setUpdateSkill(assessmentToUpdate.skill);
    setUpdateDate(assessmentToUpdate.date);
  }

  function handleSaveUpdate() {
    axios
      .put(
        `http://localhost:8080/api/assessment/editAssessment/${updateAssessmentId}`,
        {
          skill: updateSkill,
          date: updateDate,
        }
      )
      .then((response) => {
        setAssessments((preAssessments) =>
          preAssessments.map((assessment) =>
            assessment.id === updateAssessmentId
              ? {
                  ...assessment,
                  skill: updateSkill,
                  date: updateDate,
                }
              : assessment
          )
        );
        setUpdateAssessmentId(null);
        setUpdateSkill("");
        setUpdateDate("");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDeleteAssessment(id) {
    axios
      .delete(`http://localhost:8080/api/assessment/deleteAssessment/${id}`)
      .then((response) => {
        setAssessments((prevAssessments) =>
          prevAssessments.filter((assessment) => assessment.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAddAssessment(event) {
    event.preventDefault();

    if (selectedTechSkills.length === 0 || date.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      skills: selectedTechSkills.map((skillId) => ({ id: skillId })),
      date: date.trim(),
    };

    axios
      .post("http://localhost:8080/api/assessment/createAssessment", data)
      .then((response) => {
        setAssessments((preAssessments) => [...preAssessments, response.data]);
        setSelectedTechSkills([]);
        setDate("");
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
    setShowAddForm(component === "ADD_ASSESSMENT");
  };
  // const openComponent = (component) => {
  //   setShowAddForm(component === "ADD_ASSESSMENT");
  // };

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
            <h5 className="card-title">Add Assessment</h5>
            <form onSubmit={handleAddAssessment}>
              {/* <div className="form-group">
                <label htmlFor="skill">Skill</label>
                <input
                  type="text"
                  className="form-control"
                  id="skill"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                />
              </div> */}
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

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
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
            onClick={() => openComponent("ADD_ASSESSMENT")}
          >
            Add Assessment
          </button>
        </div>
      )}
      {fetched && !showAddForm && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Assessments</h5>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Skill</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map((assessment, index) => (
                    <tr key={assessment.id}>
                      <td>{index + 1}</td>
                      <td>
                        {updateAssessmentId === assessment.id ? (
                          <input
                            type="text"
                            value={updateSkill}
                            onChange={(e) => setUpdateSkill(e.target.value)}
                          />
                        ) : (
                          assessment.skill
                        )}
                      </td>
                      <td>
                        {updateAssessmentId === assessment.id ? (
                          <input
                            type="date"
                            value={updateDate}
                            onChange={(e) => setUpdateDate(e.target.value)}
                          />
                        ) : (
                          assessment.date
                        )}
                      </td>
                      <td>
                        {updateAssessmentId === assessment.id ? (
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
                                setUpdateAssessmentId(null);
                                setUpdateSkill("");
                                setUpdateDate("");
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() =>
                                handleUpdateAssessment(assessment.id)
                              }
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-sm btn-danger ms-2"
                              onClick={() =>
                                handleDeleteAssessment(assessment.id)
                              }
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
