import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 via-indigo-100 to-indigo-100 text-gray-200 px-6">
      {/* Animated 404 Text */}
      <motion.h1
        className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        404
      </motion.h1>

      {/* Subheading */}
      <motion.h2
        className="text-2xl md:text-3xl font-semibold mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Oops! Page Not Found
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-gray-400 mt-3 max-w-md text-center text-sm md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        It seems the page you’re looking for doesn’t exist or might have been moved.
        Let’s get you back to the right path.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-medium hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/30"
        >
          Go Back Home
        </Link>
      </motion.div>

      {/* Floating Glow Animation */}
      <motion.div
        className="absolute w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};

export default NotFoundPage;
