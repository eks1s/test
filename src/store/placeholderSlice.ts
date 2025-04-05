import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/Placeholder";

export interface PlaceholderState {
  posts: Post[] | null;
  post: Post | null;
}

const initialState: PlaceholderState = {
  posts: null,
  post: null,
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
  },
});

export const { setPosts, setPost } = placeholderSlice.actions;
export default placeholderSlice.reducer;
