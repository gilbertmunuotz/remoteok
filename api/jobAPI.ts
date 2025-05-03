import { JOBS_API } from '@/constants/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Job } from '@/interfaces/interface';


// Create an API service for jobs
export const jobsAPI = createApi({
    reducerPath: 'jobsAPI',
    tagTypes: ['Jobs'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${JOBS_API}`, // RemoteOK API endpoint
    }),
    endpoints: (builder) => ({
        getJobs: builder.query<Job[], void>({
            query: () => ({
                url: '/api',
                method: 'GET',
            })
        })
    })
})

// Export hooks for components to use
export const { useGetJobsQuery } = jobsAPI;