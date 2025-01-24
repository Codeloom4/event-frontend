import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold mb-4">Company Info</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-bold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Account Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Listing Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Event Ticketing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Ticket Purchase Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Concerts & Gigs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Festivals & Lifestyle
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Business & Networking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Food & Drinks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Performing Arts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Sports & Outdoors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Exhibitions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Workshops, Conferences & Classes
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us & Download App */}
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="hover:text-gray-400">
                Facebook
              </a>
              <a href="#" className="hover:text-gray-400">
                Instagram
              </a>
              <a href="#" className="hover:text-gray-400">
                Twitter
              </a>
              <a href="#" className="hover:text-gray-400">
                YouTube
              </a>
            </div>

            <h3 className="font-bold mb-4">Download The App</h3>
            <div className="space-y-2">
              <a href="#" className="block hover:text-gray-400">
                Get it on Google Play
              </a>
              <a href="#" className="block hover:text-gray-400">
                Download on the App Store
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>©2023 Eventify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
