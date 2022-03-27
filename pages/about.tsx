import React from "react";
import Image from "next/image";
import DormImage from "../public/sickdorms.jpg";

export default function About() {
  return (
    <div>
      <h1 className="text-3xl font-medium pb-3">About</h1>
      <p className="text-lg">
        Energy Race aims to gamify the reduction of energy usage on university
        campuses. This project was inspired by the first year Dorm Energy
        Competition, where dorms competed to use the lowest amount of energy
        over a certain time span. However, there was no way to view live updates
        of how dorms’ energy usage compared to each other.
        <div className="py-5">
          <Image className="rounded-md" src={DormImage} />
        </div>
        Our solution to this problem was to develop a realtime dashboard for
        university energy competitions. UVA and other universities can use this
        platform in order to gamify the reduction of energy usage across dorms,
        school buildings, etc. Our platform uses the UVA facilities API in order
        to get data relating to energy, heating, and water usage.{" "}
      </p>
      <h1 className="text-3xl font-medium py-3">Our Team</h1>
    </div>
  );
}
