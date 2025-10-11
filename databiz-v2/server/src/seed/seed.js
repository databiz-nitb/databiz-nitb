require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const connectDB = require("../config/db");
const User = require("../models/User");
const Pathway = require("../models/Pathway");
const Resource = require("../models/Resource");

const seed = async () => {
  try {
    await connectDB();

    console.log("Cleaning database...");
    await User.deleteMany();
    await Pathway.deleteMany();
    await Resource.deleteMany();

    // --- Create Admins ---
    const passwordHash = await bcrypt.hash("Admin@123", 10);

    const admins = [
      {
        name: "Debashish",
        email: "debashish@databiz.com",
        passwordHash,
        role: "admin",
        year: 4,
        isGroupAdmin: true,
      },
      {
        name: "Test Admin",
        email: "testadmin@databiz.com",
        passwordHash,
        role: "admin",
        year: 3,
        isGroupAdmin: false,
      },
    ];

    const adminUsers = await User.insertMany(admins);
    console.log(
      "Admins created:",
      adminUsers.map((a) => a.email)
    );

    // --- Create Sample Resources ---
    const resources = [
      {
        title: "Intro to Python",
        url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        type: "video",
        tags: ["python", "basics"],
      },
      {
        title: "Machine Learning Basics",
        url: "https://www.coursera.org/learn/machine-learning",
        type: "course",
        tags: ["ML", "AIML"],
      },
      {
        title: "Data Analytics with Pandas",
        url: "https://pandas.pydata.org/docs/getting_started/index.html",
        type: "article",
        tags: ["DA", "python"],
      },
    ];

    const createdResources = await Resource.insertMany(resources);
    console.log(
      "Resources created:",
      createdResources.map((r) => r.title)
    );

    // --- Create Sample Pathways ---
    const pathways = [
      {
        title: "Data Science Beginner Path",
        description:
          "A beginner-friendly pathway to start learning Data Science.",
        category: "DS",
        createdBy: adminUsers[0]._id,
        resources: [createdResources[0]._id, createdResources[2]._id],
      },
      {
        title: "AI & ML Pathway",
        description: "Introductory path for AI & ML enthusiasts.",
        category: "AIML",
        createdBy: adminUsers[1]._id,
        resources: [createdResources[1]._id],
      },
    ];

    const createdPathways = await Pathway.insertMany(pathways);
    console.log(
      "Pathways created:",
      createdPathways.map((p) => p.title)
    );

    console.log("✅ Database seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
