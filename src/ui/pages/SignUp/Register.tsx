/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";

import { useAppDispatch } from "@/hooks/redux";
import { useRegisterMutation } from "@/services/rtkQueryApi/auth/authApi";
import { actionSetCredentials } from "@/services/rtkQueryApi/auth/authSlice";
import { actionSetUseProfile } from "@/services/rtkQueryApi/user/userProfileSlice";
import { Loading } from "@/ui/components/Common/Loading";
import { css } from "@emotion/react";
import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";

const Register = () => {
  const dispatch = useAppDispatch();

  const [psnOnlineId, setPsnOnlineId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, { isLoading, isError, error }] = useRegisterMutation();

  const handleRegister = async () => {
    // This is only a basic validation of inputs. Improve this as needed.
    if (psnOnlineId && email && password) {
      try {
        await register({
          psnOnlineId,
          email,
          password,
        })
          .unwrap()
          .then((data) => {
            const { user, profile } = data;
            dispatch(actionSetCredentials(user));
            dispatch(actionSetUseProfile(profile));
          });
      } catch (e) {
        console.error(e);
      }
    } else {
      // Show an error message.
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
        {isError && error instanceof AxiosError && "data" in error ? (
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
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <TextField
                name="psnOnlineId"
                required
                fullWidth
                id="psnOnlineId"
                label="PSN Username"
                autoFocus
                value={psnOnlineId}
                onChange={(e) => setPsnOnlineId(e.target.value)}
              />
            </Grid2>

            <Grid2 size={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
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
            </Grid2>
          </Grid2>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleRegister}
          >
            Register
          </Button>
          <Grid2 container justifyContent="flex-end">
            <Grid2 size={6}>
              <Link
                to="/auth/login"
                css={css`
                  text-decoration: underline;
                  color: inherit;
                `}
              >
                Already have an account? Login
              </Link>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
