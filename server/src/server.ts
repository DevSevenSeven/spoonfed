const forceDatabaseRefresh = false;

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import routes from "./routes/index.js";
import { sequelize } from "./models/index.js";
import { authenticateToken } from "./middleware/auth.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  console.log(`Incoming request to: ${req.method} ${req.path}`);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log("Request body:", req.body);
  next();
});

app.use(express.json());
app.use(routes);

// Serves static files in the entire client's dist folder
app.use(express.static("../client/dist"));

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
