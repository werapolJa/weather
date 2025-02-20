interface WeatherProps {
  weather: {
    name: string;
    main: {
      temp: number;
    };
  };
}

const WeatherCard: React.FC<WeatherProps> = ({ weather }) => {
  const celsiusTemp = Math.round(weather?.main.temp - 273.15);

  return (
    <div className=" my-8 w-full  p-4 flex flex-col items-center text-white">
      <h2 className="text-4xl font-bold">{weather?.name}</h2>
      <div className=" mt-10">
        <div className="bg-white bg-opacity-15  h-80 w-80 flex justify-center items-center rounded-full">
     
          <h3 className="text-[7rem] font-bold text-white">{celsiusTemp}°C</h3>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
