import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(`/api/categories`);
      setCats(res.data);
    };
    getCats();

    const fetchPosts = async () => {
      const res = await axios.get(`/api/posts/lasts`);
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const handleSubscrib = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/subscribe`, {
        userName,
        email,
      });
      setError(false);
    } catch (err) {
      setError(true);
    }

    setTimeout(() => {
      setError();
    }, "2000");
  };

  return (
    <div className="sidebar">
      <span className="sidebarTitle">Recent Posts</span>
      <div className="postsside">
        {posts.map((p) => (
          <Post post={p} />
        ))}
      </div>
      {/* <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList mt-4">
          {cats.map(c => (
            <Link to={`/?cat=${c.name}`} className='link'><li className="sidebarListItem"> {c.name} </li></Link>
          ))}
         
        </ul>
      </div> */}

      <div className="sidebarItem">
        <div className="form-div">
          <span className="sidebarTitle mb-2">GET ON THE LIST</span>
          {error && (
            <p
              style={{ color: "red", marginTop: "10px", marginBottom: "-10px" }}
            >
              {" "}
              something went wrong !..
            </p>
          )}
          {error === false && (
            <p
              style={{
                color: "#1bcf15",
                marginTop: "10px",
                marginBottom: "-10px",
              }}
            >
              {" "}
              sent succesfully !..
            </p>
          )}

          <form className="mt-3 formSidebar" onSubmit={handleSubscrib}>
            <input
              type="text"
              placeholder="Enter name"
              className="form-control input mt-2"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter email"
              className="form-control input mt-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="subscribe btn btn-dark text-light mb-3 mt-2 input"
              type="submit"
            >
              SUBSCRIBE TO LIFE BLOG{" "}
            </button>
          </form>
        </div>
        <div className="follow">
          <span className="sidebarTitle mb-4">FOLLOW US</span>
          <div className="sidebarSocial">
            <i className="sidebarIcon fab fa-facebook-square"></i>
            <i className="sidebarIcon fab fa-instagram-square"></i>
            <i className="sidebarIcon fab fa-pinterest-square"></i>
            <i className="sidebarIcon fab fa-twitter-square"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
