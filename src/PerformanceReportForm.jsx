import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PerformanceReportForm() {
  const [fetched, setFetched] = useState(false);
  const [performanceReports, setPerformanceReports] = useState([]);
  const [updatePerformanceReportId, setUpdatePerformanceReportId] =
    useState(null);
  const [updateTrainee, setUpdateTrainee] = useState("");
  const [updateMonthYear, setUpdateMonthYear] = useState("");
  const [updateScore, setUpdateScore] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [trainee, setTrainee] = useState("");
  const [monthYear, setMonthYear] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    handleFetchPerformanceReports();
  }, []);

  function handleFetchPerformanceReports() {
    axios
      .get("http://localhost:8080/api/performance/getAllPerformanceReports")
      .then((response) => {
        setPerformanceReports(response.data);
        setFetched(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdatePerformanceReport(id) {
    setUpdatePerformanceReportId(id);
    const performanceReportToUpdate = performanceReports.find(
      (report) => report.id === id
    );
    setUpdateTrainee(performanceReportToUpdate.trainee);
    setUpdateMonthYear(performanceReportToUpdate.monthYear);
    setUpdateScore(performanceReportToUpdate.score);
  }

  function handleSaveUpdate() {
    axios
      .put(
        `http://localhost:8080/api/performance/editPerformanceReport/${updatePerformanceReportId}`,
        {
          trainee: updateTrainee,
          monthYear: updateMonthYear,
          score: updateScore,
        }
      )
      .then((response) => {
        setPerformanceReports((preReports) =>
          preReports.map((report) =>
            report.id === updatePerformanceReportId
              ? {
                  ...report,
                  trainee: updateTrainee,
                  monthYear: updateMonthYear,
                  score: updateScore,
                }
              : report
          )
        );
        setUpdatePerformanceReportId(null);
        setUpdateTrainee("");
        setUpdateMonthYear("");
        setUpdateScore("");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDeletePerformanceReport(id) {
    axios
      .delete(
        `http://localhost:8080/api/performance/deletePerformanceReport/${id}`
      )
      .then((response) => {
        setPerformanceReports((prevReports) =>
          prevReports.filter((report) => report.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAddPerformanceReport(event) {
    event.preventDefault();

    if (
      trainee.trim() === "" ||
      monthYear.trim() === "" ||
      score.trim() === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      trainee: trainee,
      monthYear: monthYear,
      score: score,
    };

    axios
      .post(
        "http://localhost:8080/api/performance/createPerformanceReport",
        data
      )
      .then((response) => {
        setPerformanceReports((preReports) => [...preReports, response.data]);
        setTrainee("");
        setMonthYear("");
        setScore("");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const openComponent = (component) => {
    setShowAddForm(component === "ADD_REPORT");
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
            <h5 className="card-title">Add Performance Report</h5>
            <form onSubmit={handleAddPerformanceReport}>
              <div className="form-group">
                <label htmlFor="trainee">Trainee</label>
                <input
                  type="text"
                  className="form-control"
                  id="trainee"
                  value={trainee}
                  onChange={(e) => setTrainee(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="monthYear">Month and Year</label>
                <input
                  type="text"
                  className="form-control"
                  id="monthYear"
                  value={monthYear}
                  onChange={(e) => setMonthYear(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="score">Score</label>
                <input
                  type="text"
                  className="form-control"
                  id="score"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
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
            onClick={() => openComponent("ADD_REPORT")}
          >
            Add Performance Report
          </button>
        </div>
      )}
      {fetched && !showAddForm && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Performance Reports</h5>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Trainee</th>
                    <th>Month and Year</th>
                    <th>Score</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceReports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>
                        {updatePerformanceReportId === report.id ? (
                          <input
                            type="text"
                            value={updateTrainee}
                            onChange={(e) => setUpdateTrainee(e.target.value)}
                          />
                        ) : (
                          report.trainee
                        )}
                      </td>
                      <td>
                        {updatePerformanceReportId === report.id ? (
                          <input
                            type="text"
                            value={updateMonthYear}
                            onChange={(e) => setUpdateMonthYear(e.target.value)}
                          />
                        ) : (
                          report.monthYear
                        )}
                      </td>
                      <td>
                        {updatePerformanceReportId === report.id ? (
                          <input
                            type="text"
                            value={updateScore}
                            onChange={(e) => setUpdateScore(e.target.value)}
                          />
                        ) : (
                          report.score
                        )}
                      </td>
                      <td>
                        {updatePerformanceReportId === report.id ? (
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
                                setUpdatePerformanceReportId(null);
                                setUpdateTrainee("");
                                setUpdateMonthYear("");
                                setUpdateScore("");
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
                                handleUpdatePerformanceReport(report.id)
                              }
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-sm btn-danger ms-2"
                              onClick={() =>
                                handleDeletePerformanceReport(report.id)
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
