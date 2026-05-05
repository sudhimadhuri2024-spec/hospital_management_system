function addPatient() {
  fetch("/add-patient", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: pname.value,
      phone: pphone.value
    })
  }).then(() => loadPatients());
}

function addDoctor() {
  fetch("/add-doctor", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: dname.value,
      specialization: dspec.value
    })
  }).then(() => loadDoctors());
}

function addAppointment() {
  fetch("/add-appointment", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      patientId: pid.value,
      doctorId: did.value,
      date: date.value,
      time: time.value
    })
  }).then(() => loadAppointments());
}

function loadPatients() {
  fetch("/patients")
    .then(res => res.json())
    .then(data => {
      patients.innerHTML = "";

      data.forEach(p => {
        patients.innerHTML += `<li class="patient-item">👤 ${p.Name} - ${p.Phone}</li>`;
      });

      // ✅ UPDATE COUNT
      document.getElementById("patient-count").innerText = data.length;
    });
}

function loadDoctors() {
  fetch("/doctors")
    .then(res => res.json())
    .then(data => {
      doctors.innerHTML = "";

      data.forEach(d => {
        doctors.innerHTML += `<li class="doctor-item">🩺 ${d.Name} - ${d.Specialization}</li>`;
      });

      // ✅ UPDATE COUNT
      document.getElementById("doctor-count").innerText = data.length;
    });
}

function loadAppointments() {
  fetch("/appointments")
    .then(res => res.json())
    .then(data => {
      appointments.innerHTML = "";

      data.forEach(a => {
        appointments.innerHTML += `<li class="appointment-item">📅 ${a.PatientName} → ${a.DoctorName} (${a.Date})</li>`;
      });

      // ✅ UPDATE COUNT
      document.getElementById("appointment-count").innerText = data.length;
    });
}

window.onload = () => {
  loadPatients();
  loadDoctors();
  loadAppointments();
};