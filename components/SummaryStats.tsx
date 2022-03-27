import React from "react";
import Building from "../interfaces/Building";
import { capacities } from "../data";
//include a graph of aggregate energy usage?
//try to use prisma bc i kinda wanna learn it and flex that we used it..
export default function SummaryStats({
  data,
  allData,
  curDate,
}: {
  data: Building[];
  allData: Building[];
  curDate: string;
}) {
  const computeTotal = () => {
    let agg = 0;

    data.forEach((d) => {
      agg += d.value;
    });
    return agg.toFixed(0);
  };

  const computeTotalPerPerson = () => {
    let totalCap = 0;
    Object.keys(capacities).forEach((key) => {
      totalCap += capacities[key];
    });
    return (parseInt(computeTotal()) / totalCap).toFixed(2);
  };

  const computeCumulative = () => {
    const date = new Date(curDate).getTime();
    let total = 0;
    allData.forEach((d) => {
      const d_date = new Date(d.time).getTime();
      if (d_date <= date) {
        total += d.value;
      }
    });
    return total;
  };

  return (
    <div className="flex flex-col items-center p-2 bg-gray-100 shadow-md rounded">
      <div className="flex flex-col justify-center gap-2">
        <span>
          <span className="text-2xl font-medium px-2">Today's Total:</span>{" "}
          {/* 
//from https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        */}
          <span className="text-2xl">{computeTotal()} kWh</span>
        </span>
        <span>
          <span className="text-2xl font-medium px-2">Per Person:</span>
          <span className="text-2xl">{computeTotalPerPerson()} kWh/person</span>
        </span>

        <span>
          <span className="text-2xl font-medium px-2">Cumulative:</span>
          <span className="text-2xl">
            {computeCumulative()
              .toFixed(0)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            kWh
          </span>
        </span>
      </div>
    </div>
  );
}
