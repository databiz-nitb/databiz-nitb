import React from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
    text: string;
    delay?: number;
    className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay = 0, className = "" }) => {
    // Split text into characters
    const characters = Array.from(text);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: delay,
            },
        },
    };

    const charVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <motion.span
            className={`inline-block ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {characters.map((char, index) => (
                <motion.span key={index} variants={charVariants}>
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default Typewriter;
