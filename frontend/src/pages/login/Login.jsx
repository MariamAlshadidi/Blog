import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`/api/auth/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log(res.data);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <div className="backForm">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="input-div">
            <label className="icon">
              <i class="fas fa-user-alt"></i>
            </label>
            <input
              type="text"
              className="loginInput"
              placeholder="Enter your username..."
              ref={userRef}
            />
          </div>

          <div className="input-div">
            <label className="icon">
              <i class="fas fa-unlock-alt"></i>
            </label>
            <input
              type="password"
              className="loginInput"
              placeholder="Enter your password..."
              ref={passwordRef}
            />
          </div>

          <button className="loginButton" type="submit">
            {" "}
            Login{" "}
          </button>
        </form>
        <Link to="/register">
          <span className="loginLink1">
            Don't have an account ?{" "}
            <span className="loginLink2"> Register</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
