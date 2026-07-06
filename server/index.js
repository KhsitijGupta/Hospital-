require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const Doctor = require("./models/doctor");
const Appointment = require("./models/appointment");
const Feedback = require("./models/feedback");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
~app.use(express.urlencoded({ extended: true }));

// API Routes
app.get("/api/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/appointments", async (req, res) => {
  try {
    const { name, email, phone, date, comments } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !date) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const newAppointment = new Appointment({
      name,
      email,
      phone,
      preferredDate: new Date(date),
      comments,
    });

    await newAppointment.save();
    console.log("Appointment saved successfully");
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error("Error saving appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/feedback", async (req, res) => {
  try {
    const { name, email, phone, description } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !description) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const newFeedback = new Feedback({
      name,
      email,
      phone,
      description,
    });

    await newFeedback.save();
    console.log("Feedback saved successfully");
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Serve Static Assets in Production
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running successfully 🚀",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
