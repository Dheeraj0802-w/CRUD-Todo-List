import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState();

  const [password, setPassword] = useState();
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  // Implemented Login Facilities with Two parameter email, password to checkout from DataBase
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/login", { email, password })

      .then((res) => {
        res.data === "success"
          ? navigate("/todo")
          : toast(res.data, { position: "top-center" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Login
            </button>
          </form>

          <p>Already Have an Account</p>

          <Link to="/" className="btn btn-default border w-100 bg-li">
            Sign Up
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
