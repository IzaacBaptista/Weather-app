import React from "react";
import WeatherDetailsCard from "./WeatherDetailsCard";

function WeatherCard({ forecast }) {
  return (
    <WeatherDetailsCard data={forecast} isExpanded />
  );
}

export default WeatherCard;
