import React, { useEffect, useState } from "react";
import DetailGraph from "./DetailGraph"
import { capacities, data } from "../data";
import { useRouter } from "next/router";


export default function DetailView({dorm}: {dorm: any}) {
    const router = useRouter()
    const {id} = router.query
    const dorms = [
        "GIBBONS HOUSE",
        "SHANNON HOUSE",
        "DUNGLISON HOUSE",
        "TUTTLE-DUNNINGTON HOUSE",
        "KELLOGG HOUSE",
      ];
      const [graphUpperLimit, setGraphUpperLimit] = useState<any>(30);
      const [dataDorm, setDataDorm] = useState<any[]>([]);
      const [dormPlace, setDormPlace] = useState<any>(0);
      const [dataDorms, setDataDorms] = useState<any[]>([]);
      // below contains total energy usage of each dorm sorted
      const [totalEnergyUsage, setTotalEnergyUsage] = useState<any[]>([]);
      const [topDormNums, setTopDormNums] = useState<any[]>([]);
      const [topDormNames, setTopDormNames] = useState<any[]>([]);
      const [graphData, setGraphData] = useState<any[]>();
      //   const [bound, setBound] = useState(10);
      useEffect(() => {
        // This prepares graph data
        if(!router.isReady) return;
        let newDataDorm: any[] = data.filter((entry) => entry.name == dorm)
        setDataDorm(newDataDorm)

        let entryData: any[] = [];
        newDataDorm.forEach((entry: any) => {
            let newValue = entry.value / capacities[entry.name]
            entryData.push({
                id: entry.id,
                name: entry.name,
                type: entry.type,
                value: newValue,
                unit: "kWh/person",
                time: entry.time,
            })
        })

        updateGraphData(entryData, graphUpperLimit);


        // This is code from OverallGraph to calculate place of dorm
        let newDataDormsBefore: any[] = [];

        // This separate data by dorms (so dataDorms is an array of arrays of dorm energy objects)
        dorms.forEach((dorm) => {
        newDataDormsBefore.push(data.filter((entry) => entry.name == dorm));
        });
        setDataDorms(newDataDormsBefore);

        let newDataDorms: any[] = [];
        newDataDormsBefore.forEach(newDataDorm => {
            let entryData: any[] = [];
            newDataDorm.forEach((entry: any) => {
                let newValue = entry.value / capacities[entry.name]
                // console.log(capacities[entry.name])
                entryData.push({
                    id: entry.id,
                    name: entry.name,
                    type: entry.type,
                    value: newValue,
                    unit: "kWh/person",
                    time: entry.time,
                })
            })
            newDataDorms.push(entryData)
        })
        setDataDorms(newDataDorms);
        // console.log(newDataDorms, "newDataDorms")

        // This calculates the total energy usage for each dorm
        let counter = 0;
        let newTotalEnergyUsage: any[] = [];
        newDataDorms.forEach((dataDorm1) => {
        newTotalEnergyUsage.push({
            dorm: dorms[counter],
            total: dataDorm1.reduce(
            (total: any, entry: any) => total + entry.value,
            0
            ),
        });
        counter += 1;
        });
        newTotalEnergyUsage.sort((dorm1, dorm2) => dorm1.total - dorm2.total);
        setTotalEnergyUsage(newTotalEnergyUsage);

        let counter2 = 0;
        newTotalEnergyUsage.forEach(entry => {
            if (entry.dorm == dorm) {
                setDormPlace(counter2)
            }
            counter2 += 1
        })



    }, [router.isReady]);
    
      const updateGraphData = (
        newDataDorm: any,
        graphUpperLimit: number
      ) => {
        // This reorganizes dorm data for the graph
        let newGraphData = [];
        for (let i = 0; i < graphUpperLimit; i++) {
            const curTime = new Date(newDataDorm[i].time);
            // +1 as getMonth range is [0,11]
            newGraphData.push({
                time: curTime.getMonth() + 1 + "-" + curTime.getDate(),
                value: newDataDorm[i].value
            });
        };
        setGraphData(newGraphData);
        }

        function toTitleCase(str: string) {
            if (!str) return "";
            return str.replace(/([^\W_]+[^\s-]*) */g, function (txt: string) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
          }

    return (
        <div>
            <div className="flex flex-col items-center p-3 bg-gray-100 shadow-md rounded">
                <h1 className="text-xl">{toTitleCase(dorm)}</h1>
                <h1 className="text-xl">{dormPlace}</h1>
            </div>
            <DetailGraph graphData={graphData} dorm={dorm}/>
        </div>
    )
}