import { useGetForecastWeatherQuery } from "@/redux/services/weather";
import moment from "moment";
import { CloudIcon, HumidityIcon, TemperatureIcon, WindIcon } from "../icons";

const WeeklyForecast = ({
  currentCoordinates,
}: {
  currentCoordinates: { lon: number; lat: number };
}) => {
  // get forecast weather query
  const { isLoading, data } = useGetForecastWeatherQuery({
    lat: currentCoordinates?.lat,
    lon: currentCoordinates?.lon,
  });

  // loader
  if (isLoading || !data) {
    return <h2 className="text-lg font-semibold">Loading...</h2>;
  }

  // get day string from day number
  const getDayString = (day: number): string => {
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "";
    }
  };
  return (
    <article>
      <section className="flex gap-[1rem] flex-col ">
        {data?.list
          ?.filter((item) => {
            console.log(moment(item.dt_txt).format("HH"), "hours");
            return moment(item.dt_txt).format("HH") == `00`;
          })
          .map((item, index) => {
            return (
              <div
                key={index}
                className="grid border border-gray-600 rounded-lg  place-items-center place-content-center  p-3 grid-cols-3 gap-[1rem]">
                <h3>{getDayString(moment(item.dt_txt).day())}</h3>
                <div className="flex gap-1  ">
                  {/* temp icon */}
                  <TemperatureIcon className="text-2xl" />
                  <h3>{item.main.temp}</h3>
                </div>
                <div className="flex gap-1">
                  {/* wind icon */}
                  <WindIcon className="text-xl" />
                  <h3>{item.wind.speed}</h3>
                </div>
                <div className="flex gap-1 ">
                  {/* icon */}
                  <CloudIcon className="text-2xl" />
                  <h3>{item.weather[0].description}</h3>
                </div>
                <div className="flex gap-1">
                  {/* cloud icon */}
                  <CloudIcon className="text-2xl" />

                  <h3>{item.clouds.all}%</h3>
                </div>
                <div className="flex gap-1">
                  {/* humidity icon */}
                  <HumidityIcon className="text-2xl" />
                  <h3>{item.main.humidity}%</h3>
                </div>
              </div>
            );
          })}
      </section>
    </article>
  );
};

export default WeeklyForecast;
