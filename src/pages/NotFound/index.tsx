import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h2" color="primary" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="primary" mb={4}>
          Oops! Looks like you're lost.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
        >
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
