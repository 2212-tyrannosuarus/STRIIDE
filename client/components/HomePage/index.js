import React from "react";
import {
  FeaturedProductOne,
  FeaturedProductTwo,
  FeaturedProductThree,
  FeaturedProductFour,
} from "../Images";
import "./HomePage.css";
import { Link, useHistory } from "react-router-dom";

export const Home = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const navigate = useHistory();

  return (
    <div>
      <div>
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <h1 className="hero-title">Summer Collection</h1>
          <Link to="/women/summer-collection" className="hero-button">
            Shop Now
          </Link>
        </section>
      </div>
      <div>
        <div>
          <h2 className="featured-title">Featured Products</h2>
        </div>
        <section className="featured-section">
          <div className="featured-card">
            <img src={FeaturedProductOne} />
            <Link to="/women/lifestyle">
              <h3 className="card-title">Womens Lifestyle Shoes</h3>
            </Link>
          </div>
          <div className="featured-card">
            <img src={FeaturedProductTwo} />
            <Link to="/men/training">
              <h3 className="card-title">Mens Training Shoes</h3>
            </Link>
          </div>
          <div className="featured-card">
            <img src={FeaturedProductThree} />
            <Link to="/men/lifestyle">
              <h3 className="card-title">Mens Lifestyle Shoes</h3>
            </Link>
          </div>
          <div className="featured-card">
            <img src={FeaturedProductFour} />
            <Link to="/women/training">
              <h3 className="card-title" onClick={scrollToTop}>
                Womens Training Shoes
              </h3>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
