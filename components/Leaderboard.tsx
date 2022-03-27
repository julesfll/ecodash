import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {}
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import Building from "../interfaces/Building";
import OverallGraph from "./OverallGraph";

function LeaderboardListItem({
  name,
  place,
  summaryStat,
  totalStat,
  prevSummary,
}: {
  name: string;
  place: number;
  summaryStat: number;
  totalStat: number;
  prevSummary: number;
}) {
  return (
    <div className="flex p-2 px-5 items-center justify-start gap-10 bg-gray-100 rounded">
      <h1 className="text-2xl font-bold">{place}</h1>
      <FontAwesomeIcon className="text-3xl" icon={faBuilding} />
      <h2 className="text-xl grow capitalize">{name.toLowerCase()}</h2>
      <span className="block text-xl">{summaryStat.toFixed(2)} kWh/person</span>
      <span className="block text-xl">
        <span className="font-medium">Total: </span>
        {totalStat.toFixed(2)} kWh
      </span>
      {/* {summaryStat - prevSummary > 0 ? (
        <span>increasing :(</span>
      ) : (
        <>
          {summaryStat - prevSummary == 0 ? (
            <span>Steady</span>
          ) : (
            <span>decreasing :)</span>
          )}
        </>
        // add fontawesome icons
      )} */}
    </div>
  );
}

function WinnerIcon({ place }: { place: number }) {
  const icons = [
    <FontAwesomeIcon
      key={0}
      className="text-3xl text-yellow-500"
      icon={faTrophy}
    />,
    <FontAwesomeIcon
      key={1}
      className="text-3xl text-gray-400"
      icon={faMedal}
    />,
    <FontAwesomeIcon
      key={2}
      className="text-3xl text-yellow-700"
      icon={faMedal}
    />,
  ];
  return <>{icons[place - 1]}</>;
}

function FeaturedCard({
  name,
  place,
  summaryStat,
  totalStat,
  prevSummary,
}: {
  name: string;
  place: number;
  summaryStat: number;
  totalStat: number;
  prevSummary: number;
}) {
  return (
    <div className="flex flex-col bg-[#232D4B] text-white gap-2 rounded-md items-center p-2 w-1/3">
      <div className="flex  justify-between px-2 items-center w-full">
        <span className="font-bold text-2xl text-[#E57200] ">{place}</span>
        <WinnerIcon place={place} />
      </div>
      <span className="text-center text-xl grow capitalize">
        <FontAwesomeIcon className="text-2xl px-2" icon={faBuilding} />
        {name.toLowerCase()}
      </span>
      <span className="text-md">{summaryStat.toFixed(2)} kWh/person</span>
      <span className="text-md">
        <span className="font-medium">Total: </span>
        {totalStat.toFixed()} kWh
      </span>
    </div>
  );
}

export default function Leaderboard({ data }: { data: Building[] }) {
  return (
    <div>
      <div className="flex gap-2 mb-4">
        {data.slice(0, 3).map((d, i) => {
          return (
            <FeaturedCard
              key={i}
              name={d.name}
              place={i + 1}
              summaryStat={d.value / 100}
              prevSummary={d.value / 100}
              totalStat={d.value}
            />
          );
        })}
      </div>
      <div>
        {data.slice(3).map((d, i) => {
          return (
            <LeaderboardListItem
              key={i}
              name={d.name}
              place={i + 4}
              summaryStat={d.value / 100}
              prevSummary={d.value / 100}
              totalStat={d.value}
            />
          );
        })}
      </div>

      <OverallGraph />
    </div>
  );
}
