import React from "react";
import { useParams } from "react-router-dom";

const Services = () => {
    const { serviceId } = useParams();
  return (
    <div>
      <h1>Services: {serviceId}</h1>
    </div>
  );
};

export default Services;
