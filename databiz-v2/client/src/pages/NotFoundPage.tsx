import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4 pt-32 md:pt-40 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"></div>
      </div>

      {/* Animated 404 Text */}
      <motion.h1
        className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 relative z-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        404
      </motion.h1>

      {/* Subheading */}
      <motion.h2
        className="text-2xl md:text-3xl font-semibold mt-4 text-gray-100 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Oops! Page Not Found
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-gray-400 mt-3 max-w-md text-center text-sm md:text-base relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        It seems the page you're looking for doesn't exist or might have been moved.
        Let's get you back to the right path.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 relative z-10"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>

      {/* Floating Glow Animation */}
      <motion.div
        className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};

export default NotFoundPage;
