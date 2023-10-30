import React from "react";

export default function Navbar() {
  function fetchTrainees() {}
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
                <li>
                  <button
                    className="dropdown-item"
                    onClick={fetchTrainees("JAVA")}
                  >
                    Java
                  </button>
                  {/* <Link to={"/table/JAVA"} className="dropdown-item">
                    JAVA
                  </Link> */}
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={fetchTrainees("SQL")}
                  >
                    SQL
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={fetchTrainees("PYTHON")}
                  >
                    Python
                  </button>
                </li>
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
