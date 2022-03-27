import React from "react";
import Countdown from "./Countdown";
import SummaryStats from "./SummaryStats";
import Leaderboard from "./Leaderboard";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl">Overview</h1>
      <Countdown title={"Range Countdown"} time={"09:05:32"} />
      <SummaryStats />
      <h1 className="text-3xl">Leaderboard</h1>
      <Leaderboard />
    </div>
  );
}
