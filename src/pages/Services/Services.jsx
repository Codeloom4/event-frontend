import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PackageCard from "../../component/Card/PackageCard";

const Services = () => {
  const { serviceId } = useParams();
  const [packages, setPackages] = useState([]);

  const packageList = [
    { 
      id: 1, 
      name: "Basic Package", 
      price: 1000, 
      description: "Includes essential features with basic support.", 
      features: [
        "Access to core features",
        "Email support",
        "Limited customization"
      ]
    },
    { 
      id: 2, 
      name: "Standard Package", 
      price: 2000, 
      description: "Offers additional features and priority support.", 
      features: [
        "All Basic Package features",
        "Priority email support",
        "Advanced customization options",
        "Analytics dashboard"
      ]
    },
    { 
      id: 3, 
      name: "Premium Package", 
      price: 3000, 
      description: "Includes all features with premium 24/7 support.", 
      features: [
        "All Standard Package features",
        "24/7 priority support",
        "Dedicated account manager",
        "API access & integrations",
        "Custom branding"
      ]
    },
    {
      id: 4,
      name: "Custom Package",
      price: 5000,
      description: "Customize your package with tailored features and support.",
      features: [
        "Custom features",
        "Personalized support",
        "Flexible pricing"
      ]
    }
  ];
  

  //get packages
  // const fetchPackages = async () => {
  //   const packageResponse = await PublicService.getPackages();
  //   if (packageResponse.data.responseCode === "00") {
  //     setPackages(packageResponse.data.content);
  //   } else {
  //     console.error("Failed to fetch packages:", packageResponse.data);
  //   }
  // };

  useEffect(() => {
    // fetchPackages();
    setPackages(packageList);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Services: {serviceId}</h1>

      {/* Grid Layout for 3 Cards in a Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((packageData) => (
          <PackageCard key={packageData.id} packageData={packageData} />
        ))}
      </div>
    </div>
  );
};

export default Services;
