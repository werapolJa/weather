import WeatherCard from "@/components/weatherCard";
import axios from "axios";
import { useEffect, useState } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [serachquery, seSerachquery] = useState<string>("thailand");
  const [bgGradient, setBgGradient] = useState(
    "bg-gradient-to-b from-rose-300 to-purple-300"
  );
  // console.log(bgGradient);

  const [temperature, setTemperature] = useState<string | null>(null);

  useEffect(() => {
    weatherData();
  }, [serachquery]);

  useEffect(() => {
    document.body.classList.add(...bgGradient.split(" "));
    return () => {
      document.body.classList.remove(...bgGradient.split(" "));
    };
  }, [bgGradient]);

  const weatherData = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${serachquery}&appid=80c576c39d6a3d47671641b074027454`
      );
      setWeather(res.data);

      const celsiusTemp = Math.round(res.data.main.temp - 273.15);
      if (celsiusTemp < 20) {
        setBgGradient("bg-gradient-to-b from-sky-300 to-purple-300");
        console.log("เย็น");
      } else if (celsiusTemp >= 20 && celsiusTemp <= 25) {
        setBgGradient("bg-gradient-to-b from-emerald-300 to-sky-300");
        console.log("อุ่น");
      } else if (celsiusTemp > 25) {
        setBgGradient("bg-gradient-to-b from-rose-300 to-purple-300");
        console.log("ร้อน");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="max-w-2xl mx-auto select-none">
      <div className="flex justify-center items-center flex-col pt-52 mx-10">
        <h1 className="text-3xl md:text-6xl font-bold mb-3 text-white">
          Weather App
        </h1>
        <h3 className="text-base md:text-xl text-slate-100 mb-5 font-semibold">
          Enter a city name to check the current weather conditions.
        </h3>
        <div className="w-full gap-2 md:flex">
          <input
            type="text"
            placeholder="Enter city name..."
            className="w-full rounded-full px-5 border-2 py-2 mb-2 md:mb-0"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-400 rounded-full text-white flex justify-center md:items-center w-full md:w-auto border-0 focus:outline-none"
            onClick={() => seSerachquery(searchInput)}
          >
            Search
          </button>
        </div>
        {weather && <WeatherCard weather={weather} />}
        {/* แสดงอุณหภูมิที่คำนวณแล้ว */}
        {temperature && <p>Temperature: {temperature}</p>}
      </div>
    </main>
  );
}
