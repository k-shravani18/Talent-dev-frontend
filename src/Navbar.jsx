import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [dropdown, setDropdown] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/tech-skill/getAllSkills")
      .then((response) => {
        setDropdown(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function fetchTrainees(id) {
    window.location.href = "/table/" + id;
  }
  return (
    <nav
      className="navbar navbar-expand"
      style={{ backgroundColor: "#bae2dda6" }}
    >
      <div className="container-fluid">
        <img
          className="navbar-brand"
          src="../src/assets/logo.png"
          height={"50px"}
          width={"100px"}
          alt="logo"
        ></img>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/home">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select tech Skill
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {dropdown &&
                  dropdown.map((skill) => (
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={(e) => fetchTrainees(skill.id)}
                        key={skill.id}
                      >
                        {skill.name}
                      </button>
                    </li>
                  ))}
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
