import React from "react";

export default function Countdown({
  time,
  title,
}: {
  time: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center p-3 bg-gray-100 shadow-md rounded">
      <h1 className="text-xl">{title}</h1>
      <h2 className="text-5xl"> {time}</h2>
    </div>
  );
}
