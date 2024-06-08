import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cityApi } from "./services/city";
import { weatherApi } from "./services/weather";

export const store = configureStore({
  reducer: {
    [cityApi.reducerPath]: cityApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cityApi.middleware, weatherApi.middleware),
});

setupListeners(store.dispatch);
