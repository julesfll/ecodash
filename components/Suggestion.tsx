import React, { useEffect, useState } from "react";

export default function Suggestion({data}: any) {


    return (
        <div>
            <div className="flex flex-col items-center p-3 bg-gray-100 shadow-md rounded m-6">
                <h1 >{data.icon} <b>{data.head}</b></h1>
                <p>{data.desc}</p>
            </div>
        </div>
    )
}