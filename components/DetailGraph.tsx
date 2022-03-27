import { FunctionComponent, useState, useEffect } from "react";
import { Label, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';


export default function OverallGraph({graphData, dorm}: any) {

  console.log(graphData, "graphData")

    const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
        const { x, y, payload } = props;
      
        return (
          <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
              {payload.value}
            </text>
          </g>
        );
      };

        // https://stackoverflow.com/a/196991
      function toTitleCase(str: string) {
        if (!str) return "";
        return str.replace(/([^\W_]+[^\s-]*) */g, function (txt: string) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }

    return (
        <div className="flex justify-center">
            <LineChart width={500} height={300} data={graphData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="time" tick={<CustomizedAxisTick />} height={60}>
                    <Label dy={25} value="Date" />
                </XAxis>               
                <YAxis type="number" domain={["auto", "auto"]}>
                    <Label dx={-30} value="kWh/person" angle={-90}  />
                </YAxis>
                <Tooltip/>
                <Line name={toTitleCase(dorm)} type="monotone" dataKey="value" stroke="#232D4B" />
            </LineChart>
        </div>
    )
}