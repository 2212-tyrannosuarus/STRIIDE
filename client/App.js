import React from "react";

import Navbar from "./components/Navbar/index.js";
import Routes from "./Routes";
import Footer from "./components/Footer/index.js";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
