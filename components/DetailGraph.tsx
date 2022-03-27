import { FunctionComponent, useState, useEffect } from "react";
import { Label, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';


export default function OverallGraph({graphData, topDormNames}: any) {

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

    return (
        <div>
            <LineChart width={500} height={300} data={graphData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="time" tick={<CustomizedAxisTick />} height={60}>
                    <Label dy={25} value="Date" />
                </XAxis>               
                <YAxis>
                    <Label dx={-30} value="kWh/person" angle={-90}  />
                </YAxis>
                <Tooltip/>
                <Line name={topDormNames[0]} type="monotone" dataKey="top1" stroke="#232D4B" />
            </LineChart>
        </div>
    )
}