import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createUser } from "../store";
import TextField from "@material-ui/core/TextField";

const RegisterForm = (props) => {
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

              <Grid item>
                <TextField
                  htmlFor="firstname"
                  id="firstname"
                  label="First Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  htmlFor="lastname"
                  id="lastname"
                  label="Last Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  htmlFor="email"
                  id="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                />
              </Grid>
              <Grid item>
                <TextField
                  htmlFor="phone_number"
                  id="phone_number"
                  label="Phone Number"
                  variant="outlined"
                  type="tel"
                />
              </Grid>
            </Grid>

            <Box mt={2}>
              <Button type="submit" color="primary" variant="contained">
                Sign Up
              </Button>
            </Box>
            {error && error.response && <div> {error.response.data} </div>}
          </Box>
        </form>
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
      const formName = "signup";
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const firstname = evt.target.firstname.value;
      const lastname = evt.target.lastname.value;
      const email = evt.target.email.value;
      const phone_number = evt.target.phone_number.value;
      dispatch(
        createUser(
          username,
          password,
          firstname,
          lastname,
          email,
          phone_number,
          formName
        )
      );
    },
  };
};

export default connect(mapState, mapDispatch)(RegisterForm);
