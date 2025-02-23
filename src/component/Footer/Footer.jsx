import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white px-2 mt-4 pt-16 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8">
        {/* Company Info */}
        <div>
          <h3 className="font-bold mb-4">Company Info</h3>
          <ul className="space-y-2">
            <li><a href="/about-us" className="hover:text-gray-400">About Us</a></li>
            <li><a href="/contact-us" className="hover:text-gray-400">Contact Us</a></li>
            <li><a href="/careers" className="hover:text-gray-400">Careers</a></li>
            <li><a href="/faqs" className="hover:text-gray-400">FAQs</a></li>
            <li><a href="/terms-of-service" className="hover:text-gray-400">Terms of Service</a></li>
            <li><a href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-bold mb-4">Help</h3>
          <ul className="space-y-2">
            <li><a href="/account-support" className="hover:text-gray-400">Account Support</a></li>
            <li><a href="/listing-events" className="hover:text-gray-400">Listing Events</a></li>
            <li><a href="/event-ticketing" className="hover:text-gray-400">Event Ticketing</a></li>
            <li><a href="/ticket-purchase-terms" className="hover:text-gray-400">Ticket Purchase Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-bold mb-4">Categories</h3>
          <ul className="space-y-2">
            <li><a href="/concerts-gigs" className="hover:text-gray-400">Concerts & Gigs</a></li>
            <li><a href="/festivals-lifestyle" className="hover:text-gray-400">Festivals & Lifestyle</a></li>
            <li><a href="/business-networking" className="hover:text-gray-400">Business & Networking</a></li>
            <li><a href="/food-drinks" className="hover:text-gray-400">Food & Drinks</a></li>
            <li><a href="/performing-arts" className="hover:text-gray-400">Performing Arts</a></li>
            <li><a href="/sports-outdoors" className="hover:text-gray-400">Sports & Outdoors</a></li>
            <li><a href="/exhibitions" className="hover:text-gray-400">Exhibitions</a></li>
            <li><a href="/workshops-conferences" className="hover:text-gray-400">Workshops, Conferences & Classes</a></li>
          </ul>
        </div>

        {/* Follow Us & Download App */}
        <div>
          <h3 className="font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4 mb-6">
            <a href="https://www.facebook.com/" className="hover:text-gray-400">Facebook</a>
            <a href="https://www.instagram.com/" className="hover:text-gray-400">Instagram</a>
            <a href="https://twitter.com/" className="hover:text-gray-400">Twitter</a>
            <a href="https://www.youtube.com/" className="hover:text-gray-400">YouTube</a>
          </div>

          <h3 className="font-bold mb-4">Download The App</h3>
          <div className="space-y-2">
            <a href="https://play.google.com/store" className="block hover:text-gray-400">Get it on Google Play</a>
            <a href="https://www.apple.com/app-store/" className="block hover:text-gray-400">Download on the App Store</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-8 text-center">
        <p>©2025 Eventify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
