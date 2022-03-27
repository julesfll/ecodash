import React, { useEffect, useState } from "react";
import Countdown from "./Countdown";
import SummaryStats from "./SummaryStats";
import Leaderboard from "./Leaderboard";
import Building from "../interfaces/Building";

// later add animations to make changs clearer?

export default function Dashboard() {
  const [date, setDate] = useState("2022-03-10T00:00:00.000Z");
  const [allDates, setAllDates] = useState<string[]>([]);
  const [leaderData, setLeaderData] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/buildings`)
      .then((response) => response.json())
      .then((data) => {
        const allDates: string[] = data.data.map((d: Building) => d.time);
        const dateSet = new Set(allDates);
        let uniqueDates: string[] = [];
        dateSet.forEach((d) => uniqueDates.push(d));

        uniqueDates.sort((a: string, b: string) => {
          const a_date = new Date(a).getTime();
          const b_date = new Date(b).getTime();
          return a_date - b_date;
        });
        setAllDates(uniqueDates);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/buildings?date=${date}`)
      .then((response) => response.json())
      .then((data) => {
        setLeaderData(data.data);
      });
  }, [date]);

  const parseDate = (date: string) => {
    const dateObj = new Date(date);
    const dateStr =
      dateObj.getMonth() + "/" + dateObj.getDay() + "/" + dateObj.getFullYear();
    return dateStr;
  };
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl">Overview</h1>
      <Countdown title={"Date"} time={parseDate(date)} />
      <SummaryStats />
      {/* summary stats up to a day */}
      <h1 className="text-3xl">Leaderboard</h1>
      <Leaderboard data={leaderData} />
    </div>
  );
}
