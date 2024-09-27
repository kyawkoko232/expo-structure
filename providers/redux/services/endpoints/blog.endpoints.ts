import { ApiService } from "../ApiService";

const blogEndpoint = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts",
    }),
    getPost: builder.query({
      query: (postId) => `posts/${postId}`,
    }),
    
    // If you need a mutation, add it here. For example:
    // createPost: builder.mutation({
    //   query: (newPost) => ({
    //     url: 'posts',
    //     method: 'POST',
    //     body: newPost,
    //   }),
    // }),
  }),
  // You can add `reducerPath` and `baseQuery` if required here
});

// Export hooks for usage in functional components
export const { useGetPostsQuery, useGetPostQuery } = blogEndpoint;
