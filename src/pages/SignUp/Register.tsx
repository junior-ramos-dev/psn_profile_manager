/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Link } from "react-router-dom";

import { Loading } from "@/components/Loading";
import { useAppDispatch } from "@/hooks/redux";
import { useRegisterMutation } from "@/services/rtkQueryApi/auth/authApi";
import { actionSetCredentials } from "@/services/rtkQueryApi/auth/authSlice";
import { css } from "@emotion/react";
import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export const Register = () => {
  const dispatch = useAppDispatch();

  const [psnUsername, setPsnUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, { isLoading, isError, error }] = useRegisterMutation();

  const handleRegister = async () => {
    // This is only a basic validation of inputs. Improve this as needed.
    if (psnUsername && email && password) {
      try {
        await register({
          psnUsername,
          email,
          password,
        })
          .unwrap()
          .then((data) => {
            const authUser = data;
            dispatch(actionSetCredentials(authUser));
          });
      } catch (e) {
        console.error(e);
      }
    } else {
      //TODO Show an error message.
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Register</Typography>
        {isError && "data" in error ? (
          <Typography
            variant="subtitle2"
            sx={{ mt: 4, fontStyle: "italic" }}
            color={"error"}
          >
            {error.data.message}
          </Typography>
        ) : (
          <></>
        )}
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="psnUsername"
                required
                fullWidth
                id="psnUsername"
                label="PSN Username"
                autoFocus
                value={psnUsername}
                onChange={(e) => setPsnUsername(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleRegister}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                to="/auth/login"
                css={css`
                  text-decoration: underline;
                  color: inherit;
                `}
              >
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
