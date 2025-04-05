import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link, Navigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { Errors, loginAndRegisterSchema } from "../../types/Errors";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const user = useSelector((state: RootState) => state.user.user);
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleEmailLogin = async () => {
    const validationResult = loginAndRegisterSchema.safeParse({
      email,
      password,
    });

    if (!validationResult.success) {
      const validationErrors: Errors = {};
      validationResult.error.errors.forEach((err) => {
        validationErrors[err.path[0]] = err.message;
      });
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("User Info:", result.user);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
  };

  if (user) return <Navigate to="/" />;

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography sx={{ color: "black" }} variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          margin="normal"
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleEmailLogin}
          disabled={Boolean(errors.email) || Boolean(errors.password)}
        >
          Sign in with Email
        </Button>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2, mb: 2 }}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>
        <Typography sx={{ color: "black" }} variant="body2" align="center">
          Don't have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
