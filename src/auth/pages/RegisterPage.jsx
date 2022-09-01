import { Alert, Button, Grid, Link, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { AuthLayout } from "../layout/AuthLayout";

const formValidations = {
  email: [(value) => value.includes("@"), "The email must have an @"],
  password: [
    (value) => value.length >= 6,
    "The password must have more than 6 letters.",
  ],
  displayName: [(value) => value.length >= 4, "The username is required."],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    formState,
    email,
    password,
    displayName,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
    onInputChange,
  } = useForm(
    {
      email: "",
      password: "",
      displayName: "",
    },
    formValidations
  );
  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };
  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
            <TextField
              onChange={onInputChange}
              name="displayName"
              value={displayName}
              label="Username"
              type="text"
              placeholder="Username"
              fullWidth
              error={!!displayNameValid && formSubmitted}
              helperText={formSubmitted && displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
            <TextField
              onChange={onInputChange}
              name="email"
              value={email}
              label="Email"
              type="email"
              placeholder="example@gmail.com"
              fullWidth
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted && emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
            <TextField
              onChange={onInputChange}
              name="password"
              value={password}
              label="Password"
              type="password"
              placeholder="password"
              fullWidth
              error={!!passwordValid && formSubmitted}
              helperText={formSubmitted && passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage} </Alert>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={status === "checking" ? true : false}
              >
                Register
              </Button>
            </Grid>
          </Grid>
          <Grid container direction={"row"} justifyContent="end">
            <Link component={RouterLink} color="inherit" to={"/auth/login"}>
              Do you have account?
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
