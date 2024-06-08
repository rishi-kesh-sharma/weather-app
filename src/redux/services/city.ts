// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICityResponse } from "./types";

// Define a service using a base URL and expected endpoints

const CITY_API_URL = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`;
export const cityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: CITY_API_URL,
    prepareHeaders: (headers) => {
      headers.set(
        `x-rapidapi-key`,
        `81aa7d822cmshb0729c974728650p1c6157jsn7165c35127cc`
      );
      headers.set(`x-rapidapi-host`, `wft-geo-db.p.rapidapi.com`);
    },
  }),
  endpoints: (builder) => ({
    getCities: builder.query<
      ICityResponse,
      { namePrefix?: string; minPopulation?: number; maxPopulation?: number }
    >({
      query: ({
        namePrefix = ``,
        minPopulation = 10000,
        maxPopulation = 100000000000,
      }) =>
        `?namePrefix=${namePrefix}&minPopulation=${minPopulation}&maxPopulation=${maxPopulation}`,
    }),
  }),
});

export const { useGetCitiesQuery, usePrefetch } = cityApi;
