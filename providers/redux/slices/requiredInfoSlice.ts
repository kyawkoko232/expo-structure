import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "@/api";
import { CategoryType, Size } from "@/types";

export const fetchRequiredInfo = createAsyncThunk(
    "requiredInfo/fetchAll",
    async (_, { rejectWithValue }) => {
      const response = await fetchApi("requiredInfo");
  
      if (!response) {
        return rejectWithValue("Network connection failed. Please try again!");
      }
      return response;
    }
  );

interface RequiredInfoState {
  categories: CategoryType[];
  sizes: Size[];
  status: boolean;
}

const initialState: RequiredInfoState = {
  categories: [],
  sizes: [],
  status: false,
};

const requiredInfoSlice = createSlice({
  name: "requiredInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRequiredInfo.pending, (state) => {
      state.status = true;
    });
    builder.addCase(fetchRequiredInfo.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
      state.sizes = action.payload.sizes ;
      state.status = false;
    });
    builder.addCase(fetchRequiredInfo.rejected, (state, action) => {
        state.status = false;
        // state.error = action.error
      });
  },
});


export const {} = requiredInfoSlice.actions;

export default requiredInfoSlice.reducer;