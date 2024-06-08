// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IWeatherResponse, IWeatherForecastResponse } from "./types";

const WEATHER_API_KEY = `b0011235ef5bece1b52b26b323021eb9`;
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5`;
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: WEATHER_API_URL,
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<
      IWeatherResponse,
      { lat: number; lon: number; appId?: string; units?: string }
    >({
      query: ({ lat, lon, units = `metric`, appId = WEATHER_API_KEY }) =>
        `/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=${units}`,

      async onQueryStarted(_, { queryFulfilled }) {
        const res = await queryFulfilled;
        console.log(res, "response");
      },
    }),

    getForecastWeather: builder.query<
      IWeatherForecastResponse,
      { lat: number; lon: number; appId?: string; units?: string }
    >({
      query: ({ lat, lon, units = `metric`, appId = WEATHER_API_KEY }) =>
        `/forecast?lat=${lat}&lon=${lon}&appid=${appId}&units=${units}`,
    }),
  }),
});

export const { useGetCurrentWeatherQuery, useGetForecastWeatherQuery } =
  weatherApi;
