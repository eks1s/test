import { useEffect } from "react";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import PostCard from "../../components/PostCard";
import { useFetchPosts } from "../../api/useFetchPlaceholder";
import { setPagePost } from "../../store/placeholderSlice";

const Home = () => {
  const dispatch = useDispatch();
  const posts =
    useSelector((state: RootState) => state.placeholder.posts) || [];
  const pagePosts = useSelector(
    (state: RootState) => state.placeholder.pagePost
  );

  const {
    isLoading,
    isError,
    refetch: fetchPostsData,
  } = useFetchPosts(pagePosts);

  useEffect(() => {
    if (pagePosts === 1 && posts.length === 0) {
      fetchPostsData();
    }
  }, []);

  const handleLoadMore = async () => {
    try {
      await dispatch(setPagePost());
      fetchPostsData();
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
  };

  if (isError) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Error fetching posts</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
      <Stack spacing={3}>
        {posts.length === 0 && isLoading ? (
          <Box textAlign="center">
            <CircularProgress />
            <Typography>Loading posts ...</Typography>
          </Box>
        ) : (
          <>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            <Box mt={4} display="flex" justifyContent="center">
              <Button
                variant="contained"
                onClick={handleLoadMore}
                disabled={isLoading || posts?.length >= 100}
              >
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            </Box>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default Home;
