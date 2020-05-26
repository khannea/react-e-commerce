import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";

import { Container, Paper, Typography } from "@material-ui/core";
import { Box, Grid } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";

import { useDispatch } from "react-redux";

function LoginPage(props) {
  const dispatch = useDispatch();

  const [formErrorMessage, setFormErrorMessage] = useState("");

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };

          dispatch(loginUser(dataToSubmit))
            .then((response) => {
              if (response.payload.loginSuccess) {
                //window.localStorage.setItem("userId", response.payload.userId);
                props.history.push("/");
              } else {
                setFormErrorMessage("Check out your Account or Password again");
              }
            })
            .catch((err) => {
              setFormErrorMessage("Check out your Account or Password again");
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,

          isSubmitting,
          handleChange,

          handleSubmit,
        } = props;
        return (
          <Container>
            <Paper>
              <Box p={10}>
                <form style={{ minWidth: "375px" }} onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={3}>
                    <Grid item>
                      <Typography variant="h2">Sign up</Typography>
                    </Grid>

                    <Grid item>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="email"
                        label="Email"
                        placeholder="Enter your Email."
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        className={
                          errors.email && touched.email
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                    </Grid>
                    <Grid item>
                      {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                      )}
                    </Grid>
                    <Grid item>
                      {formErrorMessage && (
                        <label>
                          <p
                            style={{
                              color: "#ff0000bf",
                              fontSize: "0.7rem",
                              border: "1px solid",
                              padding: "1rem",
                              borderRadius: "10px",
                            }}
                          >
                            {formErrorMessage}
                          </p>
                        </label>
                      )}
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="password"
                        placeholder="Enter your password, at least 6 characters."
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        className={
                          errors.password && touched.password
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                    </Grid>
                    <Grid item>
                      {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                      )}
                    </Grid>

                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        color="primary"
                        disabled={isSubmitting}
                      >
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Paper>
          </Container>
        );
      }}
    </Formik>
  );
}

export default withRouter(LoginPage);
