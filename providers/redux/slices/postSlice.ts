import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "@/types/global"; // Import Post type

interface PostState {
  selectedPostId: number | null;
  selectedPost: Post | null;
}

const initialState: PostState = {
  selectedPostId: null,
  selectedPost: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setSelectedPostId(state, action: PayloadAction<number>) {
      state.selectedPostId = action.payload;
    },
    setSelectedPost(state, action: PayloadAction<Post>) {
      state.selectedPost = action.payload;
    },
    clearSelectedPost(state) {
      state.selectedPostId = null;
      state.selectedPost = null;
    },
  },
});

export const { setSelectedPostId, setSelectedPost, clearSelectedPost } =
  postSlice.actions;
export default postSlice.reducer;
