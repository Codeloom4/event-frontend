import React from "react";

const Footer = () => {
  return (
    <footer
      className="w-full px-2 pt-16 mt-4 text-white shadow-lg"
      style={{ background: "linear-gradient(135deg, #001B2B, #003E4F)"  }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8">
        {/* Company Info */}
        <div>
          <h3 className="font-bold mb-4 text-xl text-white">Company Info</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about-us" className="text-gray-300 hover:text-white transition-colors duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact-us" className="text-gray-300 hover:text-white transition-colors duration-300">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/careers" className="text-gray-300 hover:text-white transition-colors duration-300">
                Careers
              </a>
            </li>
            <li>
              <a href="/faqs" className="text-gray-300 hover:text-white transition-colors duration-300">
                FAQs
              </a>
            </li>
            <li>
              <a href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-bold mb-4 text-xl text-white">Help</h3>
          <ul className="space-y-2">
            <li>
              <a href="/account-support" className="text-gray-300 hover:text-white transition-colors duration-300">
                Account Support
              </a>
            </li>
            <li>
              <a href="/listing-events" className="text-gray-300 hover:text-white transition-colors duration-300">
                Listing Events
              </a>
            </li>
            <li>
              <a href="/event-ticketing" className="text-gray-300 hover:text-white transition-colors duration-300">
                Event Ticketing
              </a>
            </li>
            <li>
              <a href="/ticket-purchase-terms" className="text-gray-300 hover:text-white transition-colors duration-300">
                Ticket Purchase Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-bold mb-4 text-xl text-white">Categories</h3>
          <ul className="space-y-2">
            <li>
              <a href="/concerts-gigs" className="text-gray-300 hover:text-white transition-colors duration-300">
                Concerts & Gigs
              </a>
            </li>
            <li>
              <a href="/festivals-lifestyle" className="text-gray-300 hover:text-white transition-colors duration-300">
                Festivals & Lifestyle
              </a>
            </li>
            <li>
              <a href="/business-networking" className="text-gray-300 hover:text-white transition-colors duration-300">
                Business & Networking
              </a>
            </li>
            <li>
              <a href="/food-drinks" className="text-gray-300 hover:text-white transition-colors duration-300">
                Food & Drinks
              </a>
            </li>
            <li>
              <a href="/performing-arts" className="text-gray-300 hover:text-white transition-colors duration-300">
                Performing Arts
              </a>
            </li>
            <li>
              <a href="/sports-outdoors" className="text-gray-300 hover:text-white transition-colors duration-300">
                Sports & Outdoors
              </a>
            </li>
            <li>
              <a href="/exhibitions" className="text-gray-300 hover:text-white transition-colors duration-300">
                Exhibitions
              </a>
            </li>
            <li>
              <a href="/workshops-conferences" className="text-gray-300 hover:text-white transition-colors duration-300">
                Workshops, Conferences & Classes
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us & Download App */}
        <div>
          <h3 className="font-bold mb-4 text-xl text-white">Follow Us</h3>
          <div className="flex space-x-4 mb-6">
            <a
              href="https://www.facebook.com/"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com/"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Twitter
            </a>
            <a
              href="https://www.youtube.com/"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              YouTube
            </a>
          </div>

          <h3 className="font-bold mb-4 text-xl text-white">Download The App</h3>
          <div className="space-y-2">
            <a
              href="https://play.google.com/store"
              className="block text-gray-300 hover:text-white transition-colors duration-300"
            >
              Get it on Google Play
            </a>
            <a
              href="https://www.apple.com/app-store/"
              className="block text-gray-300 hover:text-white transition-colors duration-300"
            >
              Download on the App Store
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
        <p>©2025 Eventify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
