import { useState } from "react";
import Form from "./Form";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.css";
import TrainerForm from "./TrainerForm";
import TechSkillsList from "./TechSkillsList";
import TraineeForm from "./TraineeForm";
import AssessmentForm from "./AssessmentForm";
import PerformanceReportForm from "./PerformanceReportForm";
import ClassLinkForm from "./ClassLinkForm";
import NotificationForm from "./NotificationForm";
import Footer from "./Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Dashboard } from "./Dashboard";
import { Table } from "./Table";
import UserForm from "./UserForm";
import RoleForm from "./RoleForm";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/table/:id" element={<Table />} />
          <Route path="/user/:id" element={<UserForm />} />
          <Route path="/role/:id" element={<RoleForm />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
