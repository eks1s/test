import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/Placeholder";

export interface PlaceholderState {
  posts: Post[] | null;
  post: Post | null;
  pagePost: number;
}

const initialState: PlaceholderState = {
  posts: null,
  post: null,
  pagePost: 1
};

export const placeholderSlice = createSlice({
  name: "placeholder",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = [...(state.posts || []), ...action.payload];
    },
    setPost: (state, action: PayloadAction<Post>) => {
      state.post = action.payload;
    },
    setPagePost: (state) => {
      state.pagePost = state.pagePost + 1;
    }
  },
});

export const { setPosts, setPost, setPagePost } = placeholderSlice.actions;
export default placeholderSlice.reducer;
