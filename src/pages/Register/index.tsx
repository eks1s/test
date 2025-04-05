import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { Errors, loginAndRegisterSchema } from "../../types/Errors";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const user = useSelector((state: RootState) => state.user.user);

  const handleRegister = async () => {
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
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User Registered:", result.user);
    } catch (error) {
      console.error("Registration Error:", error);
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
          Register
        </Typography>
        <Typography
          sx={{ color: "black", textAlign: "center", fontSize: 12 }}
          gutterBottom
        >
          You can use any fake email for registration. <br />
          Just don't forget it, as well as the password!
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
          onClick={handleRegister}
          disabled={Boolean(errors.email) || Boolean(errors.password)}
        >
          Register
        </Button>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2, fontSize: 10 }}
          component={Link}
          to="/login"
        >
          Already have an account? Login
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
