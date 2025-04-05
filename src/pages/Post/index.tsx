import { useNavigate, useParams } from "react-router-dom";
import { useFetchPost } from "../../api/useFetchPlaceholder";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error, isFetching } = useFetchPost(Number(id));

  if (error && !data) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        mt={4}
      >
        <Typography color="error" mb={2}>
          Error loading post
        </Typography>
        <Button variant="contained" color="error">
          Back to Posts
        </Button>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      {isLoading || isFetching ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt={4}
        >
          <Typography variant="h5" component="h2" gutterBottom mb={2}>
            Loading post...
          </Typography>
          <CircularProgress />
        </Box>
      ) : (
        <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {data?.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {data?.body}
            </Typography>
            <Typography variant="caption" display="block" mt={2}>
              Автор ID: {data?.userId}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => navigate("/")}
            >
              Back
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Post;
