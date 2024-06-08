import { useState } from "react";
import "./App.css";
import CitySearch from "./components/custom/CitySearch";
import CurrentWeatherDisplay from "./components/custom/CurrentWeatherDisplay";
import { Container } from "./components/ui/Container";
import WeeklyForecast from "./components/custom/WeeklyForecast";

function App() {
  const [currentCoordinates, setCurrentCoordinates] = useState<{
    lat: number;
    lon: number;
  }>({ lat: 0, lon: 0 });

  return (
    <Container
      className="text-white flex flex-col gap-[2rem] "
      variant={`breakpointPadded`}>
      <h1 className="text-3xl text-start">Weather App</h1>
      <div className="flex flex-col gap-[2rem]">
        <CitySearch setCurrentCoordinates={setCurrentCoordinates} />
        <main className="grid grid-cols-2 items-stretch justify-stretch gap-[2rem]">
          <CurrentWeatherDisplay currentCoordinates={currentCoordinates} />
          <WeeklyForecast currentCoordinates={currentCoordinates} />
        </main>
      </div>
    </Container>
  );
}

export default App;
