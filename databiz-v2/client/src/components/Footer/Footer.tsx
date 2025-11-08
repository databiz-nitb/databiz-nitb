import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-600 text-white py-10 mt-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>Home</li>
              <li>Events</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p>Phone number</p>
            <p>Email id</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p>DataBiz Club, NIT Bhopal</p>
          </div>
        </div>
        <div className="text-center text-xs mt-6 text-gray-200">
          © {new Date().getFullYear()} DataBiz. All rights reserved.
        </div>
      </footer>
  );
};

export default Footer;
