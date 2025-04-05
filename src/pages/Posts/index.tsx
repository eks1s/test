import { useNavigate } from "react-router-dom";
import { useFetchPosts } from "../../api/useFetchPlaceholder";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Stack,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { isLoading, isError, isFetching } = useFetchPosts(page);
  const posts = useSelector((state: RootState) => state.placeholder.posts);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (isError) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Error fetching posts</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, paddingBottom: 4 }}>
      <Stack spacing={3}>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.id}
              variant="outlined"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/${post.id}`)}
            >
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.body}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : isLoading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <Typography>No posts available</Typography>
        )}
      </Stack>

      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          onClick={handleLoadMore}
          disabled={isFetching || (!!posts && posts.length < 10)}
        >
          {isFetching ? "Loading..." : "Load More"}
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
