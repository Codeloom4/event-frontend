import React, { useState } from "react";

const EventDetailsCard = ({ event }) => {
  const [interested, setInterested] = useState(event.interested);

  const toggleInterest = () => {
    setInterested(!interested);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="relative w-[512px] h-[168px]">
        <div className="absolute top-2 left-2">
          <button
            onClick={toggleInterest}
            className="flex items-center justify-center p-1 bg-white rounded-full shadow-md w-5 h-5"
          >
            <span className="text-yellow-500">{interested ? "★" : "☆"}</span>
          </button>
        </div>

        <img
          className="w-full h-full object-cover mx-auto"
          src={event.image}
          alt={event.title}
        />
        <div className="absolute bottom-0 left-0 bg-yellow-400 text-sm text-gray-600 uppercase font-semibold p-1">
          {event.eventType}
        </div>
      </div>

      <div className="p-2">
        {/* Title and Date on the same row */}
        <div className="flex justify-between items-center mb-2 gap-4">
          <div className="flex flex-col items-center mb-2">
            <p className="text-gray-700 text-lg font-semibold ">
              {event.month}
            </p>
            <p className="text-gray-700 text-base">{event.date}</p>
          </div>
          <div>
            <div className="font-bold text-xl">{event.title}</div>

            {/* Venue and Time aligned to the left */}
            <p className="text-gray-700 text-base mb-2">{event.venue}</p>
            <p className="text-gray-700 text-base mb-2">{event.time}</p>

            {/* Price */}
            <p className="text-gray-700 text-base">{event.price}</p>
          </div>
        </div>
      </div>

      <div className="px-2 pt-2 pb-2">
        <span className="ml-2">
          {event.interestCount + (interested ? 1 : 0)}
        </span>
      </div>
    </div>
  );
};

export default EventDetailsCard;
