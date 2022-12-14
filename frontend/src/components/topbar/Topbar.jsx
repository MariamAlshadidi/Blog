import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const PF = `/uploads/`;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="">
              <i className="fas fa-bars text-light"></i>{" "}
            </span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="first">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                <div className="topLeft">
                  <i className="topIcon fab fa-facebook-square"></i>
                  <i className="topIcon fab fa-instagram-square"></i>
                  <i className="topIcon fab fa-pinterest-square"></i>
                  <i className="topIcon fab fa-twitter-square"></i>
                </div>
              </ul>
            </div>

            <div className="second">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <div className="topCenter">
                  <ul className="topList">
                    <li className="topListItem text-light">
                      <Link className="link" to="/">
                        HOME
                      </Link>
                    </li>
                    <a href="#about">
                      <li className="topListItem text-light link">ABOUT</li>
                    </a>
                    <a href="#contact">
                      <li className="topListItem text-light link">CONTACT</li>
                    </a>
                    <li className="topListItem text-light link">
                      <Link className="link" to="/write">
                        WRITE
                      </Link>
                    </li>
                    {user && (
                      <li
                        className="topListItem text-light"
                        onClick={handleLogout}
                      >
                        LOGOUT
                      </li>
                    )}
                  </ul>
                </div>
              </ul>
            </div>

            <div className="third">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <div className="topRight">
                    {user ? (
                      <ul className="d-flex align-items-center">
                        <li className="topListItem">
                          <Link
                            className="link text-light link useName"
                            to="/settings"
                          >
                            {user.username}
                          </Link>
                        </li>

                        <li>
                          <Link className="link" to="/settings">
                            {}
                            <img
                              className="topImg text-light"
                              src={PF + user.profilePic}
                              alt=""
                            />
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      <ul className="topList">
                        <li className="topListItem">
                          <Link className="link text-light link" to="/login">
                            LOGIN
                          </Link>
                        </li>
                        <li className="topListItem">
                          <Link className="link text-light link" to="/register">
                            REGISTER
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
