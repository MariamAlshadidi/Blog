import axios from "axios";
import React, { useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubscrib = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/subscribe`, {
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
    <div className="footer" id="contact">
      <div class="footer-sec">
        <div class="main row">
          <div class="logo col-sm-12 col-md-6 col-lg-3 ">
            <div class="footer-header">
              <h3>Blog lIFE</h3>
            </div>
            <div class="logo-des body-desc">
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour.
              </p>
              <a href="#" class="btn-know">
                Know More
              </a>
            </div>
          </div>

          <div class="office col-sm-12 col-md-6 col-lg-3">
            <div class="footer-header ofiice">
              <h3>Office</h3>
            </div>
            <div class="office-des body-desc">
              <p>
                here are many variations of passages of Lorem Ipsum available
              </p>

              <a href="#">blog.20@gmail.com</a>

              <p class="num">+91-9999999999</p>
            </div>
          </div>

          <div class="link col-sm-12 col-md-6 col-lg-3">
            <div class="footer-header">
              <h3>Links</h3>
            </div>

            <div class="link-des body-desc">
              <a href="#" class="footer-links">
                Home
              </a>
              <a href="#about" class="footer-links">
                About
              </a>
              <a href="#" class="footer-links">
                Contact
              </a>
            </div>
          </div>

          <div class="newsletter col-sm-12 col-md-6 col-lg-3">
            <div class="footer-header">
              <h3>Contact</h3>
            </div>
            <div class="newsletter-des">
              {error && (
                <p
                  style={{
                    color: "red",
                    marginLeft: "0px",
                    marginBottom: "-5px",
                  }}
                >
                  {" "}
                  something went wrong !..
                </p>
              )}
              {error === false && (
                <p
                  style={{
                    color: "#1bcf15",
                    marginLeft: "0px",
                    marginBottom: "-5px",
                  }}
                >
                  {" "}
                  sent succesfully !..
                </p>
              )}
              <form onSubmit={handleSubscrib} className="form-footer">
                <div class="subcribe">
                  <i class="sub-icon ri-mail-check-fill"></i>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="footer-sub-btn">
                    <i class="sub-icon ri-arrow-right-line"></i>
                  </button>
                </div>
              </form>

              <div class="icons">
                <a href="#">
                  <i class="social-icon ri-facebook-fill"></i>
                </a>
                <a href="#">
                  <i class="social-icon ri-instagram-line"></i>
                </a>
                <a href="#">
                  <i class="social-icon ri-linkedin-fill"></i>
                </a>
                <a href="#">
                  <i class="social-icon ri-github-line"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright">
          <p>© Copyright 2022 Manik Maity.</p>
        </div>
      </div>
    </div>
  );
}
