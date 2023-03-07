import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { authenticateUser } from "../store";
import TextField from "@material-ui/core/TextField";

const LoginForm = (props) => {
  const { name, handleSubmit, error, isLoggedIn } = props;
  if (isLoggedIn) return <Redirect to="/home" />;

  return (
    <Container>
      <Box p={3} textAlign="center">
        <form onSubmit={handleSubmit} name={name}>
          <Box textAlign="center">
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <TextField
                  htmlFor="username"
                  id="username"
                  label="Username"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  htmlFor="password"
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                />
              </Grid>
            </Grid>

            <Box mt={2}>
              <Button type="submit" color="primary" variant="contained">
                Login
              </Button>
            </Box>
            {error && error.response && <div> {error.response.data} </div>}
          </Box>
        </form>

        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <Typography>Dont have an account? </Typography>
          <Link to="/signup"> Register Here</Link>
        </Box>
      </Box>
    </Container>
  );
};

const mapState = (state) => {
  return {
    error: state.auth.error,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = "login";
      const username = evt.target.username.value;
      const password = evt.target.password.value;

      dispatch(authenticateUser(username, password, formName));
    },
  };
};

export default connect(mapState, mapDispatch)(LoginForm);
