import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const { email, password, onInputChange } = useForm({
    email: "",
    password: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoginWithEmailPassword(email, password));
  };
  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };
  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mb: 3, mt: 1 }}>
            <TextField
              onChange={onInputChange}
              name="email"
              value={email}
              label="email"
              type="email"
              placeholder="example@gmail.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <TextField
              onChange={onInputChange}
              name="password"
              value={password}
              label="password"
              type="password"
              placeholder="password"
              fullWidth
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage} </Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={status != "checking" ? false : true}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
                disabled={status === "checking" ? true : false}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction={"row"} justifyContent="end">
            <Link component={RouterLink} color="inherit" to={"/auth/register"}>
              Create account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
