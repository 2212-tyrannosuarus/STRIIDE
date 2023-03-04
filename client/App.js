import React from "react";
import { Box } from "@material-ui/core";
import Navbar from "./components/Navbar/index.js";
import Routes from "./Routes";
import Footer from "./components/Footer/index.js";

const App = () => {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Navbar />
      <Box flexGrow={1}>
        <Routes />
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
