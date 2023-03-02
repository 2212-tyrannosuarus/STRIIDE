// import React from "react";
// import "./HomePage.css";

// export const Home = () => {
//   return (
//     <div>
//       <div>
//         <section className="hero-section">
//           <div>
//             <h1 className="hero-title">Summer Collection</h1>
//             <button className="hero-button">Shop Now</button>
//           </div>
//         </section>
//       </div>
//       <div>
//         <section className="featured-products">
//           <div></div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import "./HomePage.css";

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
        <section className="featured-section">
          <h2>Featured Products Section</h2>
        </section>
      </div>
    </div>
  );
};

export default Home;
