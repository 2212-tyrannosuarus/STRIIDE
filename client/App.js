import React from "react";
import { Box } from "@material-ui/core";
import Navbar from "./components/Navbar/index.js";
import Routes from "./Routes";
import Footer from "./components/Footer/index.js";
import Promo from "./components/Promo/index.js";

const App = () => {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Promo />
      <Navbar />
      <Box flexGrow={1}>
        <Routes />
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
