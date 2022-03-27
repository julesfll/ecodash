import React from "react";

export default function Countdown({
  time,
  title,
  remaining,
}: {
  time: string;
  title: string;
  remaining: number;
}) {
  return (
    <div className="flex justify-center  gap-10 items-center p-2 bg-gray-100 shadow-md rounded">
      <div className="flex flex-col items-center w-40">
        <h1 className="text-xl">{title}</h1>
        <h2 className="text-4xl text-left"> {time}</h2>
      </div>
      <div className="flex flex-col items-center w-40">
        <h1 className="text-xl">Days Remaining</h1>
        <h2 className="text-4xl"> {remaining}</h2>
      </div>
    </div>
  );
}
