import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {}
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

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
      <h2 className="text-xl grow">{name}</h2>
      <span className="block text-xl">{summaryStat} kWh/person</span>
      <span className="block text-xl">
        <span className="font-medium">Total: </span>
        {totalStat} kWh
      </span>
      {summaryStat - prevSummary > 0 ? (
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
      )}
    </div>
  );
}

function WinnerIcon({ place }: { place: number }) {
  const icons = [
    <FontAwesomeIcon className="text-3xl text-yellow-500" icon={faTrophy} />,
    <FontAwesomeIcon className="text-3xl text-gray-400" icon={faMedal} />,
    <FontAwesomeIcon className="text-3xl text-yellow-700" icon={faMedal} />,
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
    <div className="flex flex-col bg-[#232D4B] text-white gap-2 rounded-md items-center p-2 w-1/3 h-1/3">
      <div className="flex  justify-between px-2 items-center w-full">
        <span className="font-bold text-2xl text-[#E57200] ">{place}</span>
        <WinnerIcon place={place} />
      </div>
      <span className="text-xl">
        <FontAwesomeIcon className="text-2xl px-2" icon={faBuilding} /> {name}
      </span>
      <span className="text-xl">{summaryStat} kWh/person</span>
      <span className="text-xl">
        <span className="font-medium">Total: </span>
        {totalStat}
      </span>
    </div>
  );
}

export default function Leaderboard() {
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <FeaturedCard
          name={"Shannon"}
          place={1}
          summaryStat={10}
          prevSummary={11}
          totalStat={100}
        />
        <FeaturedCard
          name={"Shannon"}
          place={2}
          summaryStat={10}
          prevSummary={11}
          totalStat={100}
        />
        <FeaturedCard
          name={"Shannon"}
          place={3}
          summaryStat={10}
          prevSummary={11}
          totalStat={100}
        />
      </div>
      <LeaderboardListItem
        name={"Gibbons"}
        place={4}
        summaryStat={11}
        prevSummary={11}
        totalStat={100}
      />
    </div>
  );
}