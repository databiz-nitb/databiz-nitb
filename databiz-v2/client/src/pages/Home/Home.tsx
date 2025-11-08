import React from "react";
import {
  BookOpen,
  FlaskConical,
  Trophy,
  Share2,
  Users,
  
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import landing from "../../../public/Landing.jpg"
const DataBizHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
     {/* Hero Section */}
      <section className="relative w-full">
        <div className="text-center absolute top-32 left-1/2 -translate-x-1/2 -translate-y-[80%]">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">DataBiz</h2>
          <p className="text-gray-600 text-sm">Empowering Minds Through Data</p>
        </div>
        <div className="w-full h-[80vh] flex flex-col justify-center items-center text-center">
          <img
            src={landing}
            alt="DataBiz illustration"
            className="w-full h-full object-contain"
          />
        </div>
        
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6">
        {/* About Section */}
        <section className="py-10">
          <h2 className="text-red-600 font-semibold mb-3">About DataBiz</h2>
          <p className="text-gray-700 text-sm mb-3">
            DataBiz is the official Data Science and Analytics Club of NIT
            Bhopal, built by students who are passionate about transforming raw
            data into real insights.
          </p>
          <p className="text-gray-700 text-sm mb-4">
            We aim to create a community where learners explore the exciting
            world of Data Science, Machine Learning, and Artificial Intelligence
            — from fundamentals to advanced applications.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition">
            Details
          </button>
        </section>

        {/* What We Do */}
        <section className="py-10">
          <h2 className="text-lg font-semibold mb-6">What We Do?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
            <div>
              <BookOpen className="mx-auto mb-2 text-blue-600" size={28} />
              <p className="text-sm font-medium">Workshops & Bootcamps</p>
            </div>
            <div>
              <FlaskConical className="mx-auto mb-2 text-purple-600" size={28} />
              <p className="text-sm font-medium">Projects & Research</p>
            </div>
            <div>
              <Trophy className="mx-auto mb-2 text-yellow-500" size={28} />
              <p className="text-sm font-medium">Hackathons & Competitions</p>
            </div>
            <div>
              <Share2 className="mx-auto mb-2 text-green-600" size={28} />
              <p className="text-sm font-medium">Knowledge Sharing</p>
            </div>
            <div>
              <Users className="mx-auto mb-2 text-pink-600" size={28} />
              <p className="text-sm font-medium">Community Building</p>
            </div>
          </div>
        </section>

        {/* Events */}
        <section className="py-10 border-t border-gray-200">
          <h2 className="text-red-600 font-semibold mb-6">Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-lg p-6 text-center shadow-sm">
              <p className="text-gray-600 text-sm mb-2">
                List all of the events. If possible, give links to the details
                for each event.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 text-center shadow-sm">
              <p className="text-gray-600 text-sm mb-1">
                Photo / some details
              </p>
              <p className="font-medium">Name of the event</p>
            </div>
          </div>
        </section>

        {/* Members */}
        <section className="py-10 border-t border-gray-200">
          <h2 className="text-red-600 font-semibold mb-6">Members</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="text-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mb-3 mx-auto"></div>
                  <p className="font-medium text-sm">Full Name Title</p>
                  <p className="text-gray-500 text-xs">@Upcoming SDE Microsoft</p>
                </div>
              ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default DataBizHome;
