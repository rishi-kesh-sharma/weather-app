import {
  IWeatherForecastResponse,
  IWeatherResponse,
} from "@/redux/services/types";
import {
  useGetCurrentWeatherQuery,
  useGetForecastWeatherQuery,
} from "@/redux/services/weather";
import moment from "moment";
import { useMemo } from "react";
import { CloudIcon, HumidityIcon, TemperatureIcon, WindIcon } from "../icons";

const CurrentWeatherDisplay = ({
  currentCoordinates,
}: {
  currentCoordinates: { lon: number; lat: number };
}) => {
  console.log(
    currentCoordinates?.lon,
    currentCoordinates?.lat,
    "current coordinates"
  );
  const { data, isLoading, error } = useGetCurrentWeatherQuery({
    lat: currentCoordinates?.lat,
    lon: currentCoordinates?.lon,
  });

  const { data: forecastData } = useGetForecastWeatherQuery({
    lat: currentCoordinates?.lat,
    lon: currentCoordinates?.lon,
  });

  const todayDate = useMemo(() => {
    return moment(new Date(Date.now())).format("LL");
  }, []);
  console.log(data, "weather data");
  console.log(isLoading, "isloading");
  console.log(error, "error");
  console.log(forecastData, "forecastData");

  if (isLoading || !data || !forecastData) {
    return <h2 className="text-base font-semibold">Loading...</h2>;
  }
  return (
    <article className="flex flex-col justify-between items-stretch  border border-gray-600  rounded-lg">
      <CurrentWeather data={data} todayDate={todayDate} />
      <AirCondition data={data} />
      <TodaysForecast data={forecastData} />
    </article>
  );
};

export default CurrentWeatherDisplay;

const CurrentWeather = ({
  data,
  todayDate,
}: {
  data: IWeatherResponse;
  todayDate: string;
}) => {
  return (
    <>
      <section className="flex flex-col gap-[1.5rem]  p-[2rem] border-b border-b-gray-600 ">
        <h1 className="text-base font-bold ">Current Weather</h1>
        <div className="flex justify-between gap-[2rem] items-start ">
          <div className="flex flex-col items-start gap-[0.4rem] ">
            <div className="flex gap-1">
              <h2 className="text-base font-semibold">{`${data?.name}`}</h2>
              <h2 className="text-base font-semibold">{data?.sys?.country}</h2>
            </div>
            <div className="flex  gap-2 flex-wrap">
              <p className="">Today</p>
              <p className="">{todayDate}</p>
            </div>
          </div>
          <div className="flex flex-col gap-[0.4rem] justify-start items-start ">
            <div className="flex gap-1 ">
              <TemperatureIcon className="text-2xl" />
              <h2 className="text-base font-semibold">{data?.main?.temp}</h2>
              <h2 className="text-base font-semibold">&deg;c</h2>
            </div>
            <p className="">{data?.weather?.[0]?.description}</p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            {/* {data?.weather?.[0]?.main} */}
            {/* {data?.weather?.[0]?.description} */}
            {/*  TODO: render icon based on weather*/}
            <CloudIcon className="text-5xl" />
          </div>
        </div>
      </section>
    </>
  );
};
const AirCondition = ({ data }: { data: IWeatherResponse }) => {
  return (
    <>
      <section className="flex flex-col gap-[1.5rem] p-[2rem] border-b border-b-gray-600">
        <h1 className="text-base font-bold">Air Conditions</h1>

        <div className="flex justify-between gap-[2rem]">
          <div className="flex flex-col gap-[0.4rem]">
            <div className="flex gap-1 items-center">
              {/* TODO:real feel icon */}
              <TemperatureIcon className="text-2xl" />
              <h2 className="text-base font-semibold">Real Feel</h2>
            </div>
            <p className="">{data?.main?.feels_like}</p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <div className="flex items-center gap-1">
              {/* TODO: wind icon */}
              <WindIcon className="text-xl" />
              <h2 className="text-base font-semibold">Wind</h2>
            </div>
            <div className="flex gap-1">
              <p>{data?.wind?.speed}</p>
              <p>m/s</p>
            </div>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <div className="flex items-center gap-1">
              <CloudIcon className="text-xl" />
              {/* TODO: cloud icon */}
              <h2 className="text-base font-semibold">Clouds</h2>
            </div>
            <span>{data?.clouds?.all}</span>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <div className="flex gap-1 items-center">
              <HumidityIcon className="text-2xl" />
              {/* TODO: humidity icon */}
              <h2 className="text-base font-semibold">Humidity</h2>
            </div>
            <span>{data?.main?.humidity}</span>
          </div>
        </div>
      </section>
    </>
  );
};
const TodaysForecast = ({ data }: { data: IWeatherForecastResponse }) => {
  return (
    <section className="flex flex-col w-full gap-[1.5rem] p-[2rem] border-b border-b-gray-600 justify-start">
      <h1 className="text-base  font-bold">Today Forecast</h1>
      <div className="grid w-full grid-cols-3 rounded-lg  ">
        {data?.list
          ?.filter((item) => {
            return (
              moment(item?.dt_txt).format("LL") ===
              moment(new Date(Date.now())).format("LL")
            );
          })
          .map((item) => {
            return (
              <div className="flex w-auto items-center flex-col gap-[1rem] border border-gray-600 p-[1rem] last-of-type:rounded-r-lg first-of-type:rounded-l-lg">
                <h2 className="text-base font-semibold">
                  {moment(item?.dt_txt).format("hh:mm")}
                </h2>
                <CloudIcon className="text-4xl" />
              </div>
            );
          })}
      </div>
    </section>
  );
};
