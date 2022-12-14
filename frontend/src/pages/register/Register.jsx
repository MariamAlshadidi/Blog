import "./register.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    setError(false);
    e.preventDefault();
    try {
      const res = await axios.post(`/api/auth/register`, {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <div className="backForm">
        <span className="registerTitle">REGISTER</span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <div className="input-div">
            <label className="icon">
              <i class="fas fa-user-alt"></i>
            </label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-div">
            <label className="icon">
              <i class="fa fa-envelope"></i>
            </label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-div">
            <label className="icon">
              <i class="fas fa-unlock-alt"></i>
            </label>
            <input
              className="registerInput p-2"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="registerButton" type="submit">
            Register
          </button>
        </form>
        <Link to="/login">
          <span className="loginLink1">
            Already have an account ? <span className="loginLink2"> Login</span>
          </span>
        </Link>
        {error && (
          <span style={{ color: "red", marginTop: "10px", marginLeft: "20px" }}>
            something went wrong !..
          </span>
        )}
      </div>
    </div>
  );
}
