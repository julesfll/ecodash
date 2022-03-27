import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <nav className="bg-[#232D4B] sticky top-0">
      <div className="flex m-auto w-[750px] items-center text-white py-2.5 gap-10  ">
        <h1 className="text-2xl">
          <FontAwesomeIcon className="text-yellow-400" icon={faBolt} />
          <span className="px-3">Energy Race</span>
        </h1>
        <Link href="/">
          <h1 className="text-xl cursor-pointer pl-2">Dashboard</h1>
        </Link>
        <Link href="/about">
          <h1 className="text-xl cursor-pointer pl-2">About</h1>
        </Link>
        <Link href="/previous">
          <h1 className="text-xl cursor-pointer pl-2 flex-grow">
            Previous Years
          </h1>
        </Link>
        <button className="p-1.5 rounded-md bg-[#E57200]">Subscribe</button>
      </div>
    </nav>
  );
}
