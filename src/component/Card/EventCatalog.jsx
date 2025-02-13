import React from "react";
import EventDetailsCard from "./EventDetailsCard";

const EventCatalog = ({ events }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <EventDetailsCard key={index} event={event} />
      ))}
    </div>
  );
};

export default EventCatalog;
