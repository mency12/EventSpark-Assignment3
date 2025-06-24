const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const calculatorService = require("./services/calculatorService");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());

// CORS configuration - same as Spring Boot WebConfig
const corsOptions = {
  origin: [
    "https://event-spark-self.vercel.app",
    "https://event-spark-prod.vercel.app",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["*"],
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/api/calculator", require("./routes/calculatorRoutes"));
app.use("/api", require("./routes/healthRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    result: 0.0,
    message: "An error occurred",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    result: 0.0,
    message: "Endpoint not found",
  });
});

app.listen(PORT, () => {
  console.log(`Calculator Backend is running on port ${PORT}!`);
});

module.exports = app;
