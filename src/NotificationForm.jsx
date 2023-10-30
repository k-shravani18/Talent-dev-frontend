import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NotificationForm() {
  const [fetched, setFetched] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [updateNotificationId, setUpdateNotificationId] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateDateTime, setUpdateDateTime] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState("");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    handleFetchNotifications();
  }, []);

  function handleFetchNotifications() {
    axios
      .get("http://localhost:8080/api/notification/getAllNotifications")
      .then((response) => {
        setNotifications(response.data);
        setFetched(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdateNotification(id) {
    setUpdateNotificationId(id);
    const notificationToUpdate = notifications.find(
      (notification) => notification.id === id
    );
    setUpdateMessage(notificationToUpdate.message);
    setUpdateDateTime(notificationToUpdate.dateTime);
  }

  function handleSaveUpdate() {
    axios
      .put(
        `http://localhost:8080/api/notification/editNotification/${updateNotificationId}`,
        {
          message: updateMessage,
          dateTime: updateDateTime,
        }
      )
      .then((response) => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === updateNotificationId
              ? {
                  ...notification,
                  message: updateMessage,
                  dateTime: updateDateTime,
                }
              : notification
          )
        );
        setUpdateNotificationId(null);
        setUpdateMessage("");
        setUpdateDateTime("");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDeleteNotification(id) {
    axios
      .delete(`http://localhost:8080/api/notification/deleteNotification/${id}`)
      .then((response) => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAddNotification(event) {
    event.preventDefault();

    if (message.trim() === "" || dateTime.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      message: message,
      dateTime: dateTime,
    };

    axios
      .post("http://localhost:8080/api/notification/createNotification", data)
      .then((response) => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          response.data,
        ]);
        setMessage("");
        setDateTime("");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const openComponent = (component) => {
    setShowAddForm(component === "ADD_NOTIFICATION");
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
            <h5 className="card-title">Add Notification</h5>
            <form onSubmit={handleAddNotification}>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <input
                  type="text"
                  className="form-control"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
            onClick={() => openComponent("ADD_NOTIFICATION")}
          >
            Add Notification
          </button>
        </div>
      )}
      {fetched && !showAddForm && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Notifications</h5>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Message</th>
                    <th>Date and Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notification) => (
                    <tr key={notification.id}>
                      <td>{notification.id}</td>
                      <td>
                        {updateNotificationId === notification.id ? (
                          <input
                            type="text"
                            value={updateMessage}
                            onChange={(e) => setUpdateMessage(e.target.value)}
                          />
                        ) : (
                          notification.message
                        )}
                      </td>
                      <td>
                        {updateNotificationId === notification.id ? (
                          <input
                            type="datetime-local"
                            value={updateDateTime}
                            onChange={(e) => setUpdateDateTime(e.target.value)}
                          />
                        ) : (
                          notification.dateTime
                        )}
                      </td>
                      <td>
                        {updateNotificationId === notification.id ? (
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
                                setUpdateNotificationId(null);
                                setUpdateMessage("");
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
                              onClick={() =>
                                handleUpdateNotification(notification.id)
                              }
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-sm btn-danger ms-2"
                              onClick={() =>
                                handleDeleteNotification(notification.id)
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
