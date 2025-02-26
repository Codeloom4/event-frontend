import React from "react";
import EventDetailsCard from "./EventDetailsCard";

const EventCatalog = ({ events }) => {

  const packageData = {
    name: "Premium Event",
    price: "$299",
    description: "A premium event package with exclusive perks.",
    features: ["VIP Seating", "Free Drinks", "Live Music", "Photo Booth"],
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <EventDetailsCard key={index} event={event} name={packageData.name} price={packageData.price} description={packageData.description} features={packageData.features} />
      ))}
    </div>
  );
};

export default EventCatalog;
