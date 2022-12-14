import { useContext, useEffect, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [cats, setCats] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(`/api/categories`);
      setCats(res.data);
    };
    getCats();
  }, []);

  const handleSubmit = async (e) => {
    console.log(cat);
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post(`/api/upload`, data);
      } catch (err) {}
    }
    
    try {
      const res = await axios.post(`/api/posts`, newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  const handleCategories = (cat) => {
    setCategories([...categories, cat]);
    console.log(categories);
  };

  return (
    <div className="writePage">
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-12 col-md-10">
            <div className="write">
              {file && (
                <img
                  className="writeImg"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
              )}

              <div className="writeFormGroup">
                <label htmlFor="fileInput">
                  <i className="writeIcon fas fa-plus"></i>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <input
                  type="text"
                  placeholder="Title"
                  className="writeInput"
                  autoFocus={true}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="writeFormGroup ">
                <textarea
                  placeholder="Tell your story..."
                  type="text"
                  className="writeInput writeText"
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-2">
            <button className="writeSubmit btn text-light" type="submit">
              Publish
            </button>
          </div>
        </div>

        <div className="row cats table-responsive">
          <h5>Categories: </h5>
          <table class="table">
            <tbody class="table-group-divider">
              <tr>
                {cats.map((c) => (
                  <td>
                    <input
                      type="checkbox"
                      name={c.name}
                      value={c.name}
                      // checked={true}
                      onChange={(e) => setCat(e.target.value)}
                      onClick={(e) => handleCategories(e.target.value)}
                    />
                    {c.name}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}
