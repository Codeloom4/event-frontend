import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardActions, Button } from "@mui/material"; 

const EventDetailsCard = ({ event, name, price, description, features }) => {
  const [interested, setInterested] = useState(event.interested);

  const toggleInterest = () => {
    setInterested(!interested);
  };

  // return (
  //   <div className="max-w-sm overflow-hidden bg-white rounded shadow-lg">
  //     <div className="relative w-[512px] h-[168px]">
  //       <div className="absolute top-2 left-2">
  //         <button
  //           onClick={toggleInterest}
  //           className="flex items-center justify-center w-5 h-5 p-1 bg-white rounded-full shadow-md"
  //         >
  //           <span className="text-yellow-500">{interested ? "★" : "☆"}</span>
  //         </button>
  //       </div>

  //       <img
  //         className="object-cover w-full h-full mx-auto"
  //         src={event.image}
  //         alt={event.title}
  //       />
  //       <div className="absolute bottom-0 left-0 p-1 text-sm font-semibold text-gray-600 uppercase bg-yellow-400">
  //         {event.eventType}
  //       </div>
  //     </div>

  //     <div className="p-2">
  //       {/* Title and Date on the same row */}
  //       <div className="flex items-center justify-between gap-4 mb-2">
  //         <div className="flex flex-col items-center mb-2">
  //           <p className="text-lg font-semibold text-gray-700 ">
  //             {event.month}
  //           </p>
  //           <p className="text-base text-gray-700">{event.date}</p>
  //         </div>
  //         <div>
  //           <div className="text-xl font-bold">{event.title}</div>

  //           {/* Venue and Time aligned to the left */}
  //           <p className="mb-2 text-base text-gray-700">{event.venue}</p>
  //           <p className="mb-2 text-base text-gray-700">{event.time}</p>

  //           {/* Price */}
  //           <p className="text-base text-gray-700">{event.price}</p>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="px-2 pt-2 pb-2">
  //       <span className="ml-2">
  //         {event.interestCount + (interested ? 1 : 0)}
  //       </span>
  //     </div>
  //   </div>
  // );
  return (
    <Card className="bg-white border border-gray-200 shadow-lg w-80 rounded-2xl">
      <CardHeader
        title={<span className="text-xl font-semibold">{name}</span>}
        subheader={<span className="text-lg font-medium text-gray-600">{price}</span>}
        className="p-4 border-b border-gray-200 bg-gray-50"
      />
      <CardContent className="p-4">
        <p className="text-sm text-gray-700">{description}</p>
        <ul className="mt-3 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-800">
              {/* <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> */}
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardActions className="p-4 border-t border-gray-200">
        <Button variant="contained" color="primary" className="w-full capitalize">
          Select Package
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventDetailsCard;
