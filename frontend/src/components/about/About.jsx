import React from 'react'
import './About.css'
import p1 from './3.png'
export default function () {
  return (
    <div>

<section class="about-section" id='about'>
        <div class="container">
            <div class="row">                
                <div class="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                    <div class="inner-column">
                        <div class="sec-title">
                            <span class="title">About Blog</span>
                            <h2>Welcome To Life Blog! </h2>
                        </div>
                        <div class="text">With our articles, we intend to inspire, encourage and support you as you get unstuck, make positive 
                        life changes and live a life you love – authentic, joyful, meaningful, soulful.</div>
                        <ul class="list-style-one">
                            <li>Best Blogs for Everyday Inspiration and Advice</li>
                            <li>Everything you need to make live more fun</li>
                            <li>Best Overall Family Blogs</li>
                        </ul>
                        <div class="btn-box">
                            <a href="#" class="theme-btn btn-style-one">Read Our Blogs</a>
                        </div>
                    </div>
                </div>

                 {/* Image Column  */}
                <div class="image-column col-lg-6 col-md-12 col-sm-12">
                        <figure class="image-1"><a href="#" class="lightbox-image" data-fancybox="images"><img className="img1" src={p1} alt="" /></a></figure>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}
