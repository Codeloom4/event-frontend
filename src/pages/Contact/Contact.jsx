import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Contact Us
        </h1>
        <div className="space-y-6 text-lg text-gray-700">
          <p>
            We'd love to hear from you! Whether you have a question, feedback, or need assistance, our team is here to help.
          </p>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Get in Touch
            </h2>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@eventify.com"
                className="text-yellow-500 hover:underline"
              >
                support@eventify.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+11234567890"
                className="text-yellow-500 hover:underline"
              >
                +1 (123) 456-7890
              </a>
            </p>
            <p>
              <strong>Address:</strong> 123 Eventify Lane, Event City, EC 12345
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Office Hours
            </h2>
            <p>
              <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
            </p>
            <p>
              <strong>Saturday - Sunday:</strong> Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;