import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [suc, setSuc] = useState();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .post("http://localhost:2700/dashboard")
      .then((res) => {
        if (res.data === "Suceess") {
          setSuc("Success Ok");
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  });
  return (
    <>
      <h1>Dashboard</h1>
      <p>{suc}</p>
    </>
  );
}

export default Dashboard;
