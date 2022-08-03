import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
            <TextField
              label="Name"
              type="text"
              placeholder="Full name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="example@gmail.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="password"
              fullWidth
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={12}>
              <Button variant="contained" fullWidth>
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
