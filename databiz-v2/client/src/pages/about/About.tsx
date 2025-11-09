import React from "react";
import { Lightbulb, Users, Puzzle, Rocket } from "lucide-react";

const About: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Who We Are
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            <span className="font-semibold text-indigo-600">DataBiz</span> is the
            official <strong>Data Science and Analytics Club of NIT Bhopal</strong>,
            built by students passionate about transforming raw data into real
            insights. We’re a community of learners exploring{" "}
            <strong>Data Science, Machine Learning, and Artificial Intelligence</strong> — 
            from fundamentals to advanced applications.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to <strong>empower students with data-driven thinking</strong>,
            enabling them to solve real-world problems using modern analytical
            tools and technologies.  
            <br />
            <br />
            We believe that <span className="text-indigo-600 font-medium">
              data is not just numbers
            </span>{" "}
            — it’s stories waiting to be told, and we want to inspire every member
            to become a storyteller through data.
          </p>
        </div>

        {/* Core Values */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6 hover:shadow-md transition">
              <Lightbulb className="text-indigo-600 mb-3" size={28} />
              <h3 className="font-semibold text-gray-800 mb-2">Hands-on Learning</h3>
              <p className="text-gray-600 text-sm">
                Engage in workshops and projects to apply concepts to real-world
                problems.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6 hover:shadow-md transition">
              <Users className="text-indigo-600 mb-3" size={28} />
              <h3 className="font-semibold text-gray-800 mb-2">Community First</h3>
              <p className="text-gray-600 text-sm">
                Collaboration and peer learning are at the heart of everything we do.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6 hover:shadow-md transition">
              <Puzzle className="text-indigo-600 mb-3" size={28} />
              <h3 className="font-semibold text-gray-800 mb-2">Interdisciplinary</h3>
              <p className="text-gray-600 text-sm">
                Connecting data with domains like economics, healthcare, and the
                environment.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6 hover:shadow-md transition">
              <Rocket className="text-indigo-600 mb-3" size={28} />
              <h3 className="font-semibold text-gray-800 mb-2">Innovation & Impact</h3>
              <p className="text-gray-600 text-sm">
                Using data for meaningful, socially responsible innovation.
              </p>
            </div>
          </div>
        </div>

        {/* Learning by Doing */}
        <div className="mt-16 bg-[#5052b5] text-white rounded-2xl py-10 px-6 text-center shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Learning by Doing</h2>
          <p className="max-w-2xl mx-auto text-indigo-100 leading-relaxed">
            We believe the best way to master Data Science is by building, experimenting, 
            and collaborating — turning theory into practice, one project at a time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
