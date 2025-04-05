import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";
import { Box, Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const user = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography mt={5} variant="h5" gutterBottom>
          Loading application...
        </Typography>
      </Box>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
