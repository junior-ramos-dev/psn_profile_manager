/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks/redux";
import { useLoginMutation } from "@/services/rtkQueryApi/auth/authApi";
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

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isError, isSuccess /* ,data */ }] =
    useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    //TODO Add validations
    // This is only a basic validation of inputs. Improve this as needed.

    if (email && password) {
      try {
        await login({ email, password })
          .unwrap()
          .then((data) => {
            dispatch(actionSetCredentials(data));
          });
        navigate("/home");
      } catch (e) {
        console.error(e);
      }
    } else {
      // Show an error message.
    }
  };

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
        <Typography variant="h5">Login</Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          {isError && <p>Error logging in</p>}
          {isSuccess && <p>Login successful</p>}
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Link
                to="/auth/register"
                css={css`
                  text-decoration: underline;
                  color: inherit;
                `}
              >
                <div>{"Don't have an account? Register"}</div>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
