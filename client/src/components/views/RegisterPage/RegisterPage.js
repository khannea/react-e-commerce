import React from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

import { Container, Paper, Typography } from "@material-ui/core";
import { Box, Grid } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        lastName: "",
        name: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg);
            }
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
                    <Grid item xs={12}>
                      <Typography variant="h2">Sign up</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="name"
                        placeholder="Enter your name."
                        label="Name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        className={
                          errors.name && touched.name
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                    </Grid>
                    <Grid item>
                      {errors.name && touched.name && (
                        <div className="input-feedback">{errors.name}</div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="lastName"
                        label="Lastame"
                        placeholder="Enter your Last Name."
                        type="text"
                        value={values.lastName}
                        onChange={handleChange}
                        className={
                          errors.lastName && touched.lastName
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                    </Grid>
                    <Grid item>
                      {errors.lastName && touched.lastName && (
                        <div className="input-feedback">{errors.lastName}</div>
                      )}
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
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="confirmPassword"
                        placeholder="Confirm your password."
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        label="Confirm password"
                        className={
                          errors.confirmPassword && touched.confirmPassword
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                    </Grid>
                    <Grid item>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <div className="input-feedback">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        color="primary"
                        disabled={isSubmitting}
                      >
                        Submit
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

export default RegisterPage;
