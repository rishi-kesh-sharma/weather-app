// city response interface

export interface ICityResponse {
  data: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
  }[];
}

// weather response interface
export interface IWeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// weather forecast list item interface

export interface IWeatherForecastListItem extends IWeatherResponse {
  dt: number;
  dt_txt: string;
}

// weather forecast response interface
export interface IWeatherForecastResponse {
  cod: string;
  message: number;
  cng: number;
  city: {
    id: number;
    name: string;
    country: string;
    coord: {
      lat: number;
      lon: number;
    };
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
  list: IWeatherForecastListItem[];
}
