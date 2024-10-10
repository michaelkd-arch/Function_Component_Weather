import Input from "./Input";
import Weather from "./Weather";
import Day from "./Day";
import { useWeather } from "./useWeather";
import { useLocalStorage } from "./useLocalStorage";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

export default function App() {
  const [location, setLocation] = useLocalStorage("", "location");
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
    isLoading,
    displayLocation,
  } = useWeather(location);

  function handleLocation(e) {
    setLocation(() => e.target.value);
  }

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <Input location={location} onChangeLocation={handleLocation} />
      {isLoading && <p className="loader">Loading...</p>}
      {codes && (
        <Weather location={displayLocation}>
          {dates.map((date, i) => (
            <Day
              date={date}
              max={max.at(i)}
              min={min.at(i)}
              code={codes.at(i)}
              key={date}
              isToday={i === 0}
              getWeatherIcon={getWeatherIcon}
              formatDay={formatDay}
            />
          ))}
        </Weather>
      )}
    </div>
  );
}
