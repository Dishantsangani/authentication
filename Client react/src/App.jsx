import React from "react";
import Signup from "./Page/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Page/Login";
import Dashboard from "./Page/Dashboard";
import Home from "./Page/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
