import React, { useEffect, useState } from "react";
import Countdown from "./Countdown";
import SummaryStats from "./SummaryStats";
import Leaderboard from "./Leaderboard";
import Building from "../interfaces/Building";

// later add animations to make changs clearer?

export default function Dashboard() {
  const [date, setDate] = useState("2022-03-10T00:00:00.000Z");
  const [allDates, setAllDates] = useState<string[]>([]);
  const [allData, setAllData] = useState<Building[]>([]);
  const [leaderData, setLeaderData] = useState([]);
  const [graphUpperLimit, setGraphUpperLimit] = useState(5);

  const onSlide = (e: any) => {
    setGraphUpperLimit(e.target.value);
    // console.log(e.target.value);
  };

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
        setAllData(data.data);
      });
  }, []);

  useEffect(() => {
    if (allDates.length > 0) {
      setDate(allDates[graphUpperLimit]);
    }
  }, [graphUpperLimit]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/buildings?date=${date}`)
      .then((response) => response.json())
      .then((data) => {
        setLeaderData(data.data);
      });
  }, [date]);

  return (
    <div className="flex flex-col gap-2.5">
      <h1 className="text-2xl font-medium">History Slider</h1>
      <input
        type="range"
        min="0"
        max={allDates.length - 1}
        onChange={onSlide}
        value={graphUpperLimit}
      ></input>

      <h1 className="text-2xl font-medium">Overview</h1>
      <Countdown title={"Date"} time={new Date(date).toLocaleDateString()} />
      <h1 className="text-2xl font-medium">Summary</h1>
      <SummaryStats data={leaderData} allData={allData} curDate={date} />
      {/* summary stats up to a day */}

      <h1 className="text-2xl font-medium">Leaderboard</h1>
      <Leaderboard
        data={leaderData}
        allData={allData}
        graphUpperLimit={graphUpperLimit}
      />
    </div>
  );
}
