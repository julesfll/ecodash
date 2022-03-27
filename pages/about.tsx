import React from "react";
import Image from "next/image";
import DormImage from "../public/sickdorms.jpg";
import AdrielProfile from "../public/adriel.jpg";
import JulesProfile from "../public/jules.jpg";
import OliverProfile from "../public/oliver.jpg";

function Profile({
  img,
  name,
  desc,
  link,
}: {
  img: any;
  name: string;
  desc: string;
  link: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <Image className="rounded-full" src={img} width={225} height={225} />
      <span className="block text-lg font-medium pt-2">{name}</span>
      <span className="block text-md text-gray-500 italic">{desc}</span>
      <a href={link} target="_blank" rel="noreferrer" className="text-blue-500">
        Github
      </a>
    </div>
  );
}

export default function About() {
  return (
    <div>
      <h1 className="text-3xl font-medium pb-3">About</h1>
      <p className="text-lg">
        EcoDash aims to gamify the reduction of energy usage on university
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
      <div className="flex flex-row justify-between">
        <Profile
          img={AdrielProfile}
          name={"Adriel Kim"}
          desc={"3rd Year Computer Science"}
          link={"https://github.com/adrielk"}
        />
        <Profile
          img={JulesProfile}
          name={"Jules Le Menestrel"}
          desc={"3rd Year Computer Science"}
          link={"https://github.com/julesfll"}
        />
        <Profile
          img={OliverProfile}
          name={"Oliver Song"}
          desc={"2nd Year Computer Science"}
          link={"https://github.com/obs4qqf"}
        />
      </div>
    </div>
  );
}
