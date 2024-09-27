// src/api/endpoints/userEndpoints.ts
import { ApiService } from '../ApiService';

export const userEndpoints = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
            url : "user",
          }), 
      providesTags: ['user'], 
    }),
  }),
});

export const { useGetUsersQuery } = userEndpoints;
