// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { data, capacities } from "../../../data";

export default function handler(req: NextApiRequest, res: any) {
  const { date } = req.query; //filter by this string date
  const datesFiltered = data.filter((d) => {
    if (!date) {
      return true;
    }
    let dateNoHours = new Date(d.time);
    let filterDate = new Date(date.toString());
    dateNoHours.setHours(0, 0, 0, 0); //filters daily
    filterDate.setHours(0, 0, 0, 0);
    return dateNoHours.toString() === filterDate.toString();
  });
  datesFiltered.sort((a, b) => {
    return a.value / capacities[a.name] - b.value / capacities[b.name];
  });
  res.status(200).json({ data: datesFiltered });
}
