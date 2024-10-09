import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import CounterReducer from "./slices/counterSlice";
import postReducer from "./slices/postSlice";
import { ApiService } from './services/ApiService';
import productReducer from "./slices/productSlice";
import requiredInfoReducer from "./slices/requiredInfoSlice";
export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    post: postReducer,
    products: productReducer,
    requiredInfo: requiredInfoReducer,
    [ApiService.reducerPath]: ApiService.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiService.middleware),  
});


setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
