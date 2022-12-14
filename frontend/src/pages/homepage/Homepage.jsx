import { useLocation } from "react-router";
import { useContext, useEffect, useImperativeHandle, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios";
import NoResult from "../../components/NoResult/NoResult";
import About from "../../components/about/About";
import Footer from "../../components/footer/Footer";
import { Link, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Context } from "../../context/Context";

export default function Homepage() {
  const location = useLocation();
  // console.log(location);
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [callback, setCallback] = useState(false);
  const [categories, setCategories] = useState("");
  console.log(categories);
  const [count, setCount] = useState();
  console.log("count", count);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [isLoding, setIsLoding] = useState(false);
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState("");
  const name = location.search.split("=")[1] || "";

  useEffect(() => {
    setUsername(name);
    setIsLoding(true);
    console.log("location: ", location);
    const getProducts = async () => {
      const res = await axios.get(
        `/api/posts?page=${page}&categories=${categories}&username=${username}`
      );
      setPosts(res.data.data);
      setResult(res.data.result);
      setCount(res.data.pages);
      setIsLoding(false);
      console.log("userNmae path: ", name);
      console.log("data", res.data);
      console.log("data", posts);
    };
    getProducts();
  }, [search, page, categories, username]);

  const handleNex = (e) => {
    e.preventDefault();
    setPage(page + 1);
    console.log(page);
  };

  const handlePre = (e) => {
    e.preventDefault();
    setPage(page - 1);
    console.log(page);
  };

  const handlePageNumber = (i, event) => {
    event.preventDefault();
    setPage(i);
    console.log(page);
  };

  return (
    <>
      <Header setCategories={setCategories} />
      {isLoding ? (
        <>
          <div className="spinner-div">
            <Spinner className="spinner" animation="border" />
          </div>
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-sm-12 col-lg-9 postsContet">
              <div className="home">
                {posts.length > 0 ? (
                  <Posts posts={posts} />
                ) : (
                  <NoResult categories={categories} />
                )}
              </div>
              {/* paganation start */}
              <div className="paganation">
                <nav
                  aria-label="Page navigation example"
                  className="d-flex justify-content-center paganationNav"
                >
                  <ul class="pagination">
                    <button
                      class="page-item btn1"
                      onClick={handlePre}
                      disabled={page <= count}
                    >
                      <a
                        class="page-link link-btn"
                        href="#"
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                      </a>
                    </button>
                    {(() => {
                      let td = [];
                      for (let i = 1; i <= count; i++) {
                        td.push(
                          <li
                            class="page-item"
                            onClick={(event) => handlePageNumber(i, event)}
                          >
                            <a class="page-link" href="#">
                              {i}
                            </a>
                          </li>
                        );
                      }
                      return td;
                    })()}
                    <button
                      class="page-item btn1"
                      onClick={handleNex}
                      disabled={page >= count}
                    >
                      <a class="page-link link-btn" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                      </a>
                    </button>
                  </ul>
                </nav>
              </div>

              {/* paganation end */}
            </div>

            <div className="col-sm-12  col-lg-3">
              <Sidebar />
            </div>
          </div>

          <About />

          <Footer />
        </>
      )}
    </>
  );
}
