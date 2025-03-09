import { SERVER_URI } from "@/constants/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginResponse, UserData } from "../Interfaces/interface";

// Define a service using a base URI and expected endpoints
const baseQuery = fetchBaseQuery({
    baseUrl: `${SERVER_URI}/v1/auth`,
    credentials: 'include'
});

// Create an auth API using the baseQuery
export const authAPI = createApi({
    reducerPath: 'authAPI',
    tagTypes: ['Auth'],
    baseQuery,
    endpoints: (builder) => ({
        register: builder.mutation<void, UserData>({
            query: (credentials) => ({
                url: '/register',
                method: 'POST',
                body: credentials
            })
        }),
        login: builder.mutation<LoginResponse, UserData>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'DELETE',
            }),
        }),
    }),
})

// Export hooks for components to use
export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authAPI;