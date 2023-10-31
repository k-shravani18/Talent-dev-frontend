import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ClassLinkForm() {
  const [fetched, setFetched] = useState(false);
  const [classLinks, setClassLinks] = useState([]);
  const [updateClassLinkId, setUpdateClassLinkId] = useState(null);
  const [updateLink, setUpdateLink] = useState("");
  const [updateDateTime, setUpdateDateTime] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [link, setLink] = useState("");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    handleFetchClassLinks();
  }, []);

  function handleFetchClassLinks() {
    axios
      .get("http://localhost:8080/api/link/getAllClassLinks")
      .then((response) => {
        setClassLinks(response.data);
        setFetched(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdateClassLink(id) {
    setUpdateClassLinkId(id);
    const classLinkToUpdate = classLinks.find((link) => link.id === id);
    setUpdateLink(classLinkToUpdate.link);
    setUpdateDateTime(classLinkToUpdate.dateTime);
  }

  function handleSaveUpdate() {
    axios
      .put(
        `http://localhost:8080/api/link/editClassLink/${updateClassLinkId}`,
        {
          link: updateLink,
          dateTime: updateDateTime,
        }
      )
      .then((response) => {
        setClassLinks((preLinks) =>
          preLinks.map((link) =>
            link.id === updateClassLinkId
              ? {
                  ...link,
                  link: updateLink,
                  dateTime: updateDateTime,
                }
              : link
          )
        );
        setUpdateClassLinkId(null);
        setUpdateLink("");
        setUpdateDateTime("");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDeleteClassLink(id) {
    axios
      .delete(`http://localhost:8080/api/link/deleteClassLink/${id}`)
      .then((response) => {
        setClassLinks((prevLinks) =>
          prevLinks.filter((link) => link.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAddClassLink(event) {
    event.preventDefault();

    if (link.trim() === "" || dateTime.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      link: link,
      dateTime: dateTime,
    };

    axios
      .post("http://localhost:8080/api/link/createClassLink", data)
      .then((response) => {
        setClassLinks((preLinks) => [...preLinks, response.data]);
        setLink("");
        setDateTime("");
        setShowAddForm(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const openComponent = (component) => {
    setShowAddForm(component === "ADD_LINK");
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
            <h5 className="card-title">Add Class Link</h5>
            <form onSubmit={handleAddClassLink}>
              <div className="form-group">
                <label htmlFor="link">Link</label>
                <input
                  type="url"
                  className="form-control"
                  id="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateTime">Date and Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="dateTime"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
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
            onClick={() => openComponent("ADD_LINK")}
          >
            Add Class Link
          </button>
        </div>
      )}
      {fetched && !showAddForm && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Class Links</h5>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Link</th>
                    <th>Date and Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classLinks.map((link) => (
                    <tr key={link.id}>
                      <td>{link.id}</td>
                      <td>
                        {updateClassLinkId === link.id ? (
                          <input
                            type="text"
                            value={updateLink}
                            onChange={(e) => setUpdateLink(e.target.value)}
                          />
                        ) : (
                          <a href={link.link} target="_blank">
                            {link.link}
                          </a>
                        )}
                      </td>
                      <td>
                        {updateClassLinkId === link.id ? (
                          <input
                            type="datetime-local"
                            value={updateDateTime}
                            onChange={(e) => setUpdateDateTime(e.target.value)}
                          />
                        ) : (
                          link.dateTime
                        )}
                      </td>
                      <td>
                        {updateClassLinkId === link.id ? (
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
                                setUpdateClassLinkId(null);
                                setUpdateLink("");
                                setUpdateDateTime("");
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleUpdateClassLink(link.id)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-sm btn-danger ms-2"
                              onClick={() => handleDeleteClassLink(link.id)}
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
