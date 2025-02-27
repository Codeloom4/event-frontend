import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PackageCard from "../../component/Card/PackageCard";

const Package = () => {
  const { packageId } = useParams();
  

  //get package details
  // const fetchPackage = async () => {
  //   const packageResponse = await PublicService.getPackages();
  //   if (packageResponse.data.responseCode === "00") {
  //     setPackages(packageResponse.data.content);
  //   } else {
  //     console.error("Failed to fetch packages:", packageResponse.data);
  //   }
  // };

  useEffect(() => {
    // fetchPackages();
  }, []);

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Package: {packageId}</h1>
    </div>
  );
};

export default Package;
