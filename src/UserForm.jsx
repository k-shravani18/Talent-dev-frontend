import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserForm() {
  const [fetched, setFetched] = useState(false);
  const [users, setUsers] = useState([]);
  const [updateUserId, setUpdateUserId] = useState(null);
  const [updateUserName, setUpdateUserName] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    handleFetchUsers();
    handleFetchRoles(); // Fetch roles when the component mounts
  }, []);

  function handleFetchUsers() {
    axios
      .get("http://localhost:8080/api/user/getAllUsers")
      .then((response) => {
        setUsers(response.data);
        setFetched(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleFetchRoles() {
    axios
      .get("http://localhost:8080/api/role/getAllRoles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdateUser(id) {
    setUpdateUserId(id);
    const userToUpdate = users.find((user) => user.id === id);
    setUpdateUserName(userToUpdate.username);
    setUpdatePassword(userToUpdate.password);
    setSelectedRole(userToUpdate.role.id);
  }

  function handleSaveUpdate() {
    axios
      .put(`http://localhost:8080/api/user/editUser/${updateUserId}`, {
        username: updateUserName,
        password: updatePassword,
        role: { id: selectedRole },
      })
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updateUserId
              ? {
                  ...user,
                  username: updateUserName,
                  password: updatePassword,
                  role: { id: selectedRole },
                }
              : user
          )
        );
        setUpdateUserId(null);
        setUpdateUserName("");
        setUpdatePassword("");
        setSelectedRole(null);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDeleteUser(id) {
    axios
      .delete(`http://localhost:8080/api/user/deleteUser/${id}`)
      .then((response) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAddUser(event) {
    event.preventDefault();

    if (userName.trim() === "" || selectedRole === null) {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      username: userName,
      password: userPassword,
      role: { id: selectedRole },
    };

    axios
      .post("http://localhost:8080/api/user/createUser", data)
      .then((response) => {
        setUsers((prevUsers) => [...prevUsers, response.data]);
        setUserName("");
        setUserPassword("");
        setSelectedRole(null);
        setShowAddForm(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleRoleChange(roleId) {
    setSelectedRole(roleId);
  }

  return (
    <div className="container mt-4">
      {/* Buttons */}
      <div className="mb-4">
        {!showAddForm && (
          <button
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            Add User
          </button>
        )}
        {showAddForm && (
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setShowAddForm(false)}
          >
            Back
          </button>
        )}
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Add User</h5>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label htmlFor="userName">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="userPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="userPassword"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <br />
                {roles.map((role) => (
                  <div className="form-check form-check-inline" key={role.id}>
                    <input
                      className="form-check-input"
                      type="radio"
                      value={role.id}
                      checked={selectedRole === role.id}
                      onChange={() => handleRoleChange(role.id)}
                    />
                    <label className="form-check-label">{role.name}</label>
                  </div>
                ))}
              </div>

              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Display Users */}
      {fetched && !showAddForm && (
        <div className="card mt-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th>ID</th>
                    <th>User Name</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>
                        {updateUserId === user.id ? (
                          <input
                            type="text"
                            value={updateUserName}
                            onChange={(e) => setUpdateUserName(e.target.value)}
                          />
                        ) : (
                          user.username
                        )}
                      </td>
                      <td>
                        {updateUserId === user.id ? (
                          <input
                            type="password"
                            value={updatePassword}
                            onChange={(e) => setUpdatePassword(e.target.value)}
                          />
                        ) : (
                          user.password
                        )}
                      </td>
                      <td>{user.role && user.role.name}</td>
                      <td>
                        {updateUserId === user.id ? (
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
                                setUpdateUserId(null);
                                setUpdateUserName("");
                                setUpdatePassword("");
                                setSelectedRole(null);
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleUpdateUser(user.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger ms-2"
                              onClick={() => handleDeleteUser(user.id)}
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
