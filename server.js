const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Add Patient
app.post("/add-patient", (req, res) => {
  const { name, phone } = req.body;
  db.query("INSERT INTO Patient (Name, Phone) VALUES (?, ?)", [name, phone], (err) => {
    if (err) throw err;
    res.send("Patient Added");
  });
});

// Add Doctor
app.post("/add-doctor", (req, res) => {
  const { name, specialization } = req.body;
  db.query("INSERT INTO Doctor (Name, Specialization) VALUES (?, ?)", [name, specialization], (err) => {
    if (err) throw err;
    res.send("Doctor Added");
  });
});

// Book Appointment
app.post("/add-appointment", (req, res) => {
  const { patientId, doctorId, date, time } = req.body;
  db.query(
    "INSERT INTO Appointment (PatientID, DoctorID, Date, Time) VALUES (?, ?, ?, ?)",
    [patientId, doctorId, date, time],
    (err) => {
      if (err) throw err;
      res.send("Appointment Booked");
    }
  );
});

// View Appointments
app.get("/appointments", (req, res) => {
  db.query(`
    SELECT AppointmentID, Patient.Name AS PatientName, Doctor.Name AS DoctorName, Date, Time
    FROM Appointment
    JOIN Patient ON Appointment.PatientID = Patient.PatientID
    JOIN Doctor ON Appointment.DoctorID = Doctor.DoctorID
  `, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
// Get Patients
app.get("/patients", (req, res) => {
  db.query("SELECT * FROM Patient", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Get Doctors
app.get("/doctors", (req, res) => {
  db.query("SELECT * FROM Doctor", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});