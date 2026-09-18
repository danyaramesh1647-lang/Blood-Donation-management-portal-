// ---------- Mock Data ----------
const donors = [
  { name: "Rahul Sharma", blood: "O+", city: "Chennai", phone: "9876543210" },
  { name: "Priya Nair", blood: "A+", city: "Bangalore", phone: "9876500001" },
  { name: "Amit Verma", blood: "B-", city: "Chennai", phone: "9876500002" },
  { name: "Sneha Iyer", blood: "AB+", city: "Coimbatore", phone: "9876500003" },
  { name: "Karan Singh", blood: "O-", city: "Bangalore", phone: "9876500004" },
  { name: "Divya Menon", blood: "A-", city: "Chennai", phone: "9876500005" },
];

const camps = [
  {
    name: "City Hospital Blood Drive",
    city: "Chennai",
    date: "2026-10-02",
    time: "9:00 AM - 4:00 PM",
  },
  {
    name: "Tech Park Donation Camp",
    city: "Bangalore",
    date: "2026-10-10",
    time: "10:00 AM - 3:00 PM",
  },
  {
    name: "College Fest Camp",
    city: "Coimbatore",
    date: "2026-10-18",
    time: "9:00 AM - 1:00 PM",
  },
];

const bloodStock = [
  { type: "O+", units: 24 },
  { type: "O-", units: 8 },
  { type: "A+", units: 18 },
  { type: "A-", units: 6 },
  { type: "B+", units: 15 },
  { type: "B-", units: 4 },
  { type: "AB+", units: 10 },
  { type: "AB-", units: 3 },
];
// ---------- Helpers ----------
function showStatus(el, message, type) {
  el.textContent = message;
  el.className = "status-msg " + type;
}

// ---------- Donors Page ----------
function renderDonors(list) {
  const container = document.getElementById("donor-list");
  if (!container) return;
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = "<p>No donors found matching your filters.</p>";
    return;
  }
  list.forEach((d) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = ` <h3>${d.name} <span class="badge">${d.blood}</span></h3> <p>City: ${d.city}</p> <p>Phone: ${d.phone}</p> `;
    container.appendChild(card);
  });
}

function initDonorsPage() {
  const list = document.getElementById("donor-list");
  if (!list) return;
  renderDonors(donors);

  const bloodFilter = document.getElementById("filter-blood");
  const cityFilter = document.getElementById("filter-city");

  function applyFilters() {
    const b = bloodFilter.value;
    const c = cityFilter.value.trim().toLowerCase();
    const filtered = donors.filter(
      (d) =>
        (b === "" || d.blood === b) &&
        (c === "" || d.city.toLowerCase().includes(c))
    );
    renderDonors(filtered);
  }

  bloodFilter.addEventListener("change", applyFilters);
  cityFilter.addEventListener("input", applyFilters);
}
// ---------- Camps Page ----------
function initCampsPage() {
  const container = document.getElementById("camp-list");
  if (!container) return;
  container.innerHTML = "";
  camps.forEach((c) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = ` <h3>${c.name}</h3> <p>City: ${c.city}</p> <p>Date: ${c.date}</p> <p>Time: ${c.time}</p> `;
    container.appendChild(card);
  });
}

// ---------- Availability Page ----------
function initAvailabilityPage() {
  const tbody = document.getElementById("stock-body");
  if (!tbody) return;
  tbody.innerHTML = "";
  bloodStock.forEach((s) => {
    const row = document.createElement("tr");
    const low = s.units < 5;
    row.innerHTML = ` <td>${s.type}</td> <td>${s.units}</td> <td>${ low ? '<span class="badge" style="background:#e67e22">Low</span>' : '<span class="badge">Available</span>' }</td> `;
    tbody.appendChild(row);
  });
}
// ---------- Register Page ----------
function initRegisterForm() {
  const form = document.getElementById("register-form");
  if (!form) return;
  const status = document.getElementById("register-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("reg-name").value.trim();
    const blood = document.getElementById("reg-blood").value;
    const city = document.getElementById("reg-city").value.trim();
    const phone = document.getElementById("reg-phone").value.trim();

    if (!name || !blood || !city || !phone) {
      showStatus(status, "Please fill in all fields.", "error");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      showStatus(status, "Enter a valid 10-digit phone number.", "error");
      return;
    }

    donors.push({ name, blood, city, phone });
    showStatus(
      status,
      `Thank you, ${name}! You are now registered as a donor.`,
      "success"
    );
    form.reset();
  });
}

// ---------- Request Page ----------
function initRequestForm() {
  const form = document.getElementById("request-form");
  if (!form) return;
  const status = document.getElementById("request-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const patient = document.getElementById("req-patient").value.trim();
    const blood = document.getElementById("req-blood").value;
    const units = document.getElementById("req-units").value;
    const hospital = document.getElementById("req-hospital").value.trim();
    const contact = document.getElementById("req-contact").value.trim();

    if (!patient || !blood || !units || !hospital || !contact) {
      showStatus(status, "Please fill in all fields.", "error");
      return;
    }
    if (!/^\d{10}$/.test(contact)) {
      showStatus(status, "Enter a valid 10-digit contact number.", "error");
      return;
    }

    showStatus(
      status,
      `Emergency request submitted for ${patient} (${blood}, ${units} unit(s)). Nearby donors will be notified.`,
      "success"
    );
    form.reset();
  });
}

// ---------- Init on load ----------
document.addEventListener("DOMContentLoaded", function () {
  initDonorsPage();
  initCampsPage();
  initAvailabilityPage();
  initRegisterForm();
  initRequestForm();
});