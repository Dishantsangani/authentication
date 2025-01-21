import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  axios.defaults.withCredentials = true;
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2700/login", { email, password })
      .then((res) => {
        if (res.data.status === "Success") {
          if (res.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="w-full max-w-sm mt-14 p-6 m-auto mx-auto bg-slate-200 rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center mx-auto">
          <h1>Login</h1>
        </div>
        <form className="mt-6" onSubmit={handleLogin}>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
              >
                Forget Password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Enter your password"
            />
          </div>
          <div className="mt-6 flex flex-col space-y-4">
            <button
              type="submit"
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-black capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Login
            </button>
            <Link
              to="/register"
              type="button"
              className="w-full text-center px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
