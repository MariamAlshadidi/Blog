import "./settings.css";
import { useContext, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = `/uploads/`

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(`/api/upload`, data);
      } catch (err) {
        console.log("err uplad data")
      }
    }
    try {
      const res = await axios.put(`/api/users/` + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      console.log("fetch data")
    }
  };
  return (
    <div className="settings row mt-4">
      <div className="col-md-12 col-lg-8">      <div className="settingsWrapper">
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label  className="form-label">Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput" >
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
              className="form-control"
            />
          </div>
          <label  className="form-label">Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
          <label  className="form-label">Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
          <label  className="form-label">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
          <button className="settingsSubmit btn " type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div></div>

      <div className="col-md-12 col-lg-4">
      <Sidebar />
      </div>
   
    </div>
  );
}