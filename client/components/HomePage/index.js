import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <div>
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <h1 className="hero-title">Summer Collection</h1>
          <button className="hero-button">Shop Now</button>
        </section>
      </div>
      <div>
        <div>
          <h2 className="featured-title">Featured Products</h2>
        </div>
        <section className="featured-section">
          <div className="featured-card">
            <img src="https://images.unsplash.com/photo-1560362614-89027598847b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
            <Link to="PATH TO WOMENS RUNNING SHOES">
              <h3 className="card-title">Womens Running Shoes</h3>
            </Link>
          </div>
          <div className="featured-card">
            <img src="https://images.unsplash.com/photo-1500468756762-a401b6f17b46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" />
            <Link to="PATH TO MENS TRAINING SHOES">
              <h3 className="card-title">Mens Training Shoes</h3>
            </Link>
          </div>
          <div className="featured-card">
            <img src="https://images.unsplash.com/flagged/photo-1565544863956-7619785813fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
            <Link to="PATH TO MENS LIFESTYLE SHOES">
              <h3 className="card-title">Mens Lifestyle Shoes</h3>
            </Link>
          </div>
          <div className="featured-card">
            <img src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
            <Link to="PATH TO WOMENS RUNNING SHOES">
              <h3 className="card-title">Womens Training Shoes</h3>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
