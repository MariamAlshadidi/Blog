import axios from "axios";
import { useEffect, useState } from "react";
import "./header.css";

export default function Header(props) {
  const [cats, setCats] = useState([]);

  const handleSearch = (c) => {
    props.setCategories(c.name);
  };

  const handleAll = () => {
    props.setCategories("");
  };
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(`/api/categories`);
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="header">
      <div
        id="carouselExampleInterval"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div className="headerTitles">
            <span className="headerTitleLg">BLOG</span>
          </div>
          <div class="carousel-item active" data-bs-interval="10000">
            <img
              src="https://images.pexels.com/photos/7578224/pexels-photo-7578224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              class="d-block w-100 headerImg"
              alt="..."
            />
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img
              src="https://images.pexels.com/photos/9152024/pexels-photo-9152024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              class="d-block w-100 headerImg"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://images.pexels.com/photos/5611062/pexels-photo-5611062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              class="d-block w-100 headerImg"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div className="top-cats">
        <button className="btn" onClick={handleAll}>
          {" "}
          All{" "}
        </button>
        {cats.map((c) => (
          <button className="btn" onClick={(e) => handleSearch(c)}>
            {" "}
            {c.name}{" "}
          </button>
        ))}
      </div>
    </div>
  );
}
