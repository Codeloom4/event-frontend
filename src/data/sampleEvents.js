// data.js
import productLunch from "../assest/image/catalog/productLunch.jpg";
import wedding from "../assest/image/catalog/wedding.jpg";
import conferences from "../assest/image/catalog/conferences.jpg";
import christmas from "../assest/image/catalog/christmas.jpg";

export const sampleEvents = [
  {
    image: productLunch,
    eventType: "Technology & Innovation",
    date: "22", // Day of the month
    month: "Nov", // Month
    title: "Event title that can go up to two lines",
    venue: "Venue 1",
    time: "00:00AM-00:00PM",
    price: "INR499",
    interestCount: 10,
    interested: false,
  },
  {
    image: wedding,
    eventType: "Art & Culture",
    date: "15", // Day of the month
    month: "Dec", // Month
    title: "Art Exhibition Opening Night",
    venue: "Gallery XYZ",
    time: "06:00PM-09:00PM",
    price: "INR799",
    interestCount: 5,
    interested: true,
  },
  {
    image: conferences,
    eventType: "Business & Networking",
    date: "10", // Day of the month
    month: "Jan", // Month
    title: "Startup Pitch Night",
    venue: "Conference Hall A",
    time: "07:00PM-10:00PM",
    price: "INR999",
    interestCount: 20,
    interested: false,
  },
  {
    image: christmas,
    eventType: "Business & Networking",
    date: "10", // Day of the month
    month: "Jan", // Month
    title: "Startup Pitch Night",
    venue: "Conference Hall A",
    time: "07:00PM-10:00PM",
    price: "INR999",
    interestCount: 20,
    interested: true,
  },
];
