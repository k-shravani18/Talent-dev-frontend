import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RoleForm() {
  const [fetched, setFetched] = useState(false);
  const [roles, setRoles] = useState([]);
  const [updateRoleId, setUpdateRoleId] = useState(null);
  const [updateRoleName, setUpdateRoleName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    handleFetchRoles();
  }, []);

  function handleFetchRoles() {
    axios
      .get("http://localhost:8080/api/role/getAllRoles")
      .then((response) => {
        setRoles(response.data);
        setFetched(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdateRole(id) {
    setUpdateRoleId(id);
    const roleToUpdate = roles.find((role) => role.id === id);
    setUpdateRoleName(roleToUpdate.name);
  }

  function handleSaveUpdate() {
    axios
      .put(`http://localhost:8080/api/role/editRole/${updateRoleId}`, {
        name: updateRoleName,
      })
      .then((response) => {
        setRoles((prevRoles) =>
          prevRoles.map((role) =>
            role.id === updateRoleId ? { ...role, name: updateRoleName } : role
          )
        );
        setUpdateRoleId(null);
        setUpdateRoleName("");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDeleteRole(id) {
    axios
      .delete(`http://localhost:8080/api/role/deleteRole/${id}`)
      .then((response) => {
        setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAddRole(event) {
    event.preventDefault();

    if (roleName.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      name: roleName,
    };

    axios
      .post("http://localhost:8080/api/role/createRole", data)
      .then((response) => {
        setRoles((prevRoles) => [...prevRoles, response.data]);
        setRoleName("");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const openComponent = (component) => {
    setShowAddForm(component === "ADD_ROLE");
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
            <h5 className="card-title">Add Role</h5>
            <form onSubmit={handleAddRole}>
              <div className="form-group">
                <label htmlFor="roleName">Role Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="roleName"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
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
            onClick={() => openComponent("ADD_ROLE")}
          >
            Add Role
          </button>
        </div>
      )}
      {fetched && !showAddForm && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Roles</h5>
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
                  {roles.map((role, index) => (
                    <tr key={role.id}>
                      <td>{index + 1}</td>
                      <td>
                        {updateRoleId === role.id ? (
                          <input
                            type="text"
                            value={updateRoleName}
                            onChange={(e) => setUpdateRoleName(e.target.value)}
                          />
                        ) : (
                          role.name
                        )}
                      </td>
                      <td>
                        {updateRoleId === role.id ? (
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
                                setUpdateRoleId(null);
                                setUpdateRoleName("");
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleUpdateRole(role.id)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-sm btn-danger ms-2"
                              onClick={() => handleDeleteRole(role.id)}
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
