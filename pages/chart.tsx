import type { NextPage } from 'next'
import Head from 'next/head'
import { Label, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart: NextPage = () => {
    // placeholder data
    const data = [
        {
            time: "2017-03-23T16:00:00.000Z",
            top1: 10,
            top2: 7,
            top3: 5
        },
        {
            time: "2017-03-23T16:00:01.000Z",
            top1: 11,
            top2: 8,
            top3: 6
        },
        {
            time: "2017-03-23T16:00:02.000Z",
            top1: 10,
            top2: 7,
            top3: 5
        },
        {
            time: "2017-03-23T16:00:03.000Z",
            top1: 11,
            top2: 8,
            top3: 6
        },
        {
            time: "2017-03-23T16:00:04.000Z",
            top1: 10,
            top2: 7,
            top3: 5
        },
        {
            time: "2017-03-23T16:00:05.000Z",
            top1: 11,
            top2: 8,
            top3: 6
        },
      ]

    return (
        <div className="flex justify-center">
            <Head>Chart</Head>
            <LineChart width={730} height={250} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="time">
                    <Label value="Time" offset={-7} position="insideBottom" />
                </XAxis>               
                <YAxis >
                    <Label value="kWh/person" angle={-90}  />
                </YAxis>
                <Tooltip />
                <Legend/>
                <Line type="monotone" dataKey="top1" stroke="#232D4B" />
                <Line type="monotone" dataKey="top2" stroke="#E57200" />
                <Line type="monotone" dataKey="top3" stroke="#000000" />
            </LineChart>
        </div>
    );
};

export default Chart;