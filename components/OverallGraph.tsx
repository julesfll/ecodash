import { FunctionComponent, useState, useEffect } from "react";
import { Label, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import {data} from "../data"


export default function Dashboard() {
    const dorms = ["GIBBONS HOUSE", "SHANNON HOUSE", "DUNGLISON HOUSE", "TUTTLE-DUNNINGTON HOUSE", "KELLOGG HOUSE"]
    const [dataDorms, setDataDorms] = useState<any[]>([])
    // below contains total energy usage of each dorm sorted
    const [totalEnergyUsage, setTotalEnergyUsage] = useState<any[]>([])
    const [topDormNums, setTopDormNums] = useState<any[]>([])
    const [graphData, setGraphData] = useState<any[]>()

    useEffect(() => {
        let newDataDorms: any[] = []

        // This separate data by dorms (so dataDorms is an array of arrays of dorm energy objects)
        dorms.forEach(dorm => {
            newDataDorms.push(data.filter((entry => entry.name == dorm)))
        })
        setDataDorms(newDataDorms)

        // This calculates the total energy usage for each dorm
        let counter = 0
        let newTotalEnergyUsage: any[] = []
        newDataDorms.forEach(dataDorm => {
            newTotalEnergyUsage.push({dorm: dorms[counter], total: dataDorm.reduce((total: any, entry: any) => total + entry.value, 0)})
            counter += 1
        })
        newTotalEnergyUsage.sort((dorm1, dorm2) => dorm1.total - dorm2.total)
        setTotalEnergyUsage(newTotalEnergyUsage)


        // This finds the index of the least energy dorms in the dorm names array
        let newTopDormNums: any[] = []
        for(let i=0; i<3; i++) {
            let counter2 = 0
            dorms.forEach(dorm => {
                if (dorm == newTotalEnergyUsage[i].dorm) {
                    newTopDormNums.push(counter2)
                }
                counter2 += 1
            })
        }
        setTopDormNums(newTopDormNums)

        // This reorganizes dorm data for the graph
        let newGraphData = []
        for(let i=0; i<30; i++) {
            let topHourlys: any[] = []
            let time = 0
            newTopDormNums.forEach(topDormNum => {
                topHourlys.push(newDataDorms[topDormNum][i].value)
                time = newDataDorms[topDormNum][i].time
            })
            newGraphData.push({time: time, top1: topHourlys[0], top2: topHourlys[1], top3: topHourlys[2]})
        }
        setGraphData(newGraphData)
        console.log(graphData)
    }, []);



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
        <div className="flex justify-center">
            <LineChart width={730} height={250} data={graphData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis label="Time" dataKey="time" tick={<CustomizedAxisTick />} height={60}>
                </XAxis>               
                <YAxis >
                    <Label value="kWh/person" angle={-90}  />
                </YAxis>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="top1" stroke="#232D4B" />
                <Line type="monotone" dataKey="top2" stroke="#E57200" />
                <Line type="monotone" dataKey="top3" stroke="#000000" />
            </LineChart>
        </div>
    );
}