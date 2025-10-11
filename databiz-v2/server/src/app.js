const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const logger = require("./middlewares/logger.middleware");

dotenv.config();

const app = express();
app.use(logger);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/pathways", require("./routes/pathways.routes"));
app.use("/api/resources", require("./routes/resources.routes"));
app.use("/api/progress", require("./routes/progress.routes"));
app.use("/api/blogs", require("./routes/blogs.routes"));
app.use("/api/events", require("./routes/events.routes"));
app.use("/api/public", require("./routes/public.routes"));

// Error handler (middleware)
app.use(require("./middlewares/error.middleware"));

if (process.env.NODE_ENV !== "test") {
  connectDB();
}

module.exports = app;
