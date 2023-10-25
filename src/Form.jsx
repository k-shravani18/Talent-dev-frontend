import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Form({ flag, setFlag }) {
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFlag(false);
    }, 5000);
  }, [flag]);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputData.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      name: inputData,
    };

    axios
      .post("http://localhost:8080/api/tech-skill/createSkill", data)
      .then((response) => {
        console.log(response);
        setFlag(true);
        setInputData("");
      });
  }

  return (
    <div className="">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Tech Skill Name :</h5>
          <form className="card-title" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter here ..."
                className="form-control form-control-lg"
                name="name"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <button type="submit" className="btn btn-primary">
                Add Tech Skills
              </button>
            </div>
          </form>
        </div>
      </div>
      {flag ? (
        <div className="mt-4">
          <h2 className="ui-define">
            Hello {inputData.name}, you have added the skill successfully
          </h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
