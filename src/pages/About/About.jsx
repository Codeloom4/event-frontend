import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          About Us
        </h1>
        <div className="space-y-6 text-lg text-gray-700">
          <p>
            Welcome to <strong className="text-yellow-500">Eventify</strong>, your one-stop solution for managing events, inventory, and more. Our platform is designed to help you streamline your operations and make event planning a breeze.
          </p>
          <p>
            At Eventify, we believe in providing top-notch services to our users. Whether you're organizing a small gathering or a large-scale event, our tools and features are here to support you every step of the way.
          </p>
          <p>
            Our team is dedicated to ensuring that you have the best experience possible. If you have any questions or need assistance, feel free to reach out to us through the <strong className="text-yellow-500">Contact</strong> page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;