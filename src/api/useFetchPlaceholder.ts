import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { setPost, setPosts } from "../store/placeholderSlice";
import { Post } from "../types/Placeholder";

export const useFetchPosts = (page: number) => {
  const dispatch = useDispatch();

  return useQuery<Post[], Error>({
    queryKey: ["posts", page],
    queryFn: async ({ signal }) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`,
        { signal }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      dispatch(setPosts(data));
      return data;
    },
    enabled: false,
  });
};

export const useFetchPost = (id: number) => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data: Post = await response.json();
      dispatch(setPost(data));
      return data;
    },
  });
};
