import React from "react";
import { Link } from "react-router-dom";
import ImgSlider from "./ImgSlider";
import EventDetailsCard from "../../component/Card/EventDetailsCard";
import { sampleEvents } from "../../data/sampleEvents";
import ImageDateHomeCard from "../../component/Card/ImageDateHomeCard";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center">
      <ImgSlider />

      {/* Upcoming Events Section */}
      <section className="mt-12 w-full px-8">
        <h1 className="text-3xl font-bold text-white mb-6">Upcoming Events</h1>
        <div className="pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {sampleEvents.map((event, index) => (
            <ImageDateHomeCard key={index} event={event} />
          ))}
        </div>
      </section>

      {/* Uncomment and update these sections if needed */}
      {/* <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Eventify
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Discover and create amazing events with Eventify. Join us today and
          never miss out on the fun!
        </p>
        <div className="flex space-x-4 justify-center">
          <Link
            to="/events"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Explore Events
          </Link>
          <Link
            to="/create-event"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Event
          </Link>
        </div>
      </div> */}

      {/* Featured Events Section */}
      {/* <section className="mt-12 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-white mb-2">Music Festival</h3>
            <p className="text-gray-300 mb-4">
              Join us for an unforgettable night of music and fun!
            </p>
            <Link
              to="/events/music-festival"
              className="text-blue-400 hover:text-blue-600"
            >
              Learn More →
            </Link>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-white mb-2">Tech Conference</h3>
            <p className="text-gray-300 mb-4">
              Explore the latest trends in technology and innovation.
            </p>
            <Link
              to="/events/tech-conference"
              className="text-blue-400 hover:text-blue-600"
            >
              Learn More →
            </Link>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-white mb-2">Food Fair</h3>
            <p className="text-gray-300 mb-4">
              Taste delicious cuisines from around the world.
            </p>
            <Link
              to="/events/food-fair"
              className="text-blue-400 hover:text-blue-600"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section> */}

      {/* Call to Action Section */}
      {/* <section className="mt-12 bg-blue-600 text-white p-8 rounded-lg shadow-md w-full max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Join?</h2>
        <p className="text-lg mb-6">
          Sign up now to create and manage your own events or explore exciting
          events near you.
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-gray-100"
        >
          Sign Up Today
        </Link>
      </section> */}
    </div>
  );
};

export default Home;