import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  const PF = `/uploads/`;

  return (
    <Link to={`/post/${post._id}`} className="link">
      <div className="post m-4">
        {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}

        <div className="postInfo">
          <div className="postCats">
            {post.categories.map((c) => (
              <span className="postCat">{c.name}</span>
            ))}
          </div>
          <span className="postTitle">{post.title}</span>
          <hr />
        </div>
        <p className="postDesc">{post.desc}</p>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
    </Link>
  );
}
