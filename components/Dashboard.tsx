import React, { useEffect, useState } from "react";
import Countdown from "./Countdown";
import SummaryStats from "./SummaryStats";
import Leaderboard from "./Leaderboard";
import Building from "../interfaces/Building";
import { toTitleCase } from "../utils";
import Confetti from "react-confetti";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";

// later add animations to make changs clearer?

export default function Dashboard() {
  const [date, setDate] = useState("2022-03-10T00:00:00.000Z");
  const [allDates, setAllDates] = useState<string[]>([]);
  const [leaderData, setLeaderData] = useState([]);
  const [graphUpperLimit, setGraphUpperLimit] = useState(5);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const onSlide = (e: any) => {
    setGraphUpperLimit(e.target.value);
    // https://eight-bites.blog/en/2021/06/wait-user-typing/
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      checkDMs();
    }, 2000);
    setTimer(newTimer);
  };

  const checkDMs = () => {
    // TODO: more precise comparison
    const keyDates = new Map([
      [
        new Date(2022, 1, 25).toLocaleDateString(),
        "The competition has begun! Let the most energy-efficent dorm win!",
      ],
      [
        new Date(2022, 2, 11).toLocaleDateString(),
        `The competition is halfway complete. Here's the current standings:\n1. ${leaderData[0].name}\n2. ${leaderData[1].name}\n3. ${leaderData[2].name}`,
      ],
    ]);
    if (keyDates.has(new Date(date).toLocaleDateString())) {
      sendMessage(keyDates.get(new Date(date).toLocaleDateString()));
    }
  };

  const sendMessage = async (message: string | undefined) => {
    try {
      const body = {
        phone: "7036226223",
        message,
      };
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return err;
    }
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
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl">History Slider</h1>
      <input
        className="accent-[#E57200]"
        type="range"
        min="0"
        max={allDates.length - 1}
        onChange={onSlide}
        value={graphUpperLimit}
      ></input>

      <h1 className="text-3xl">Overview</h1>
      {date == allDates[allDates.length - 1] ? (
        <>
          <div className="flex flex-col items-center p-3 bg-gray-100 shadow-md rounded">
            <h1 className="text-xl">Competition complete!</h1>
            <h2 className="text-4xl">
              Congratulations to {toTitleCase(leaderData[0].name)}
            </h2>
          </div>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </>
      ) : (
        <Countdown title={"Date"} time={new Date(date).toLocaleDateString()} />
      )}
      <SummaryStats />
      {/* summary stats up to a day */}

      <h1 className="text-3xl">Leaderboard</h1>
      <Leaderboard data={leaderData} graphUpperLimit={graphUpperLimit} />
    </div>
  );
}
