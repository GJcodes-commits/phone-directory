
let isAdmin = false;

function verifyAdmin() {
  const pwd = prompt("Enter admin password:");
  if (pwd !== "CallLog@123") {
    alert("Access denied!");
    window.location.href = "index.html";
  } else {
    isAdmin = true;
    loadContacts();
  }
}

function addOrUpdateContact() {
  let name = document.getElementById("name").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let designation = document.getElementById("designation").value.trim();
  let editIndex = document.getElementById("editIndex").value;

  if (!name || !phone || !designation) {
    alert("Please fill all fields.");
    return;
  }

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  if (editIndex === "") {
    contacts.push({ name, phone, designation });
  } else {
    contacts[editIndex] = { name, phone, designation };
    document.getElementById("editIndex").value = "";
  }

  localStorage.setItem("contacts", JSON.stringify(contacts));

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("designation").value = "";

  loadContacts();
}

function loadContacts() {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  let contactList = document.getElementById("contact-list");
  contactList.innerHTML = "";

  contacts.forEach((contact, index) => {
    let row = `<tr>
        <td>${contact.name}</td>
        <td>${contact.phone}</td>
        <td>${contact.designation}</td>
        <td>
          <button onclick="editContact(${index})">Edit</button>
          <button onclick="deleteContact(${index})">Delete</button>
        </td>
      </tr>`;
    contactList.innerHTML += row;
  });
}

function editContact(index) {
  let contacts = JSON.parse(localStorage.getItem("contacts"));
  let contact = contacts[index];

  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("designation").value = contact.designation;
  document.getElementById("editIndex").value = index;
}

function deleteContact(index) {
  let contacts = JSON.parse(localStorage.getItem("contacts"));
  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  loadContacts();
}

function searchContacts() {
  let filter = document.getElementById("search").value.toLowerCase();
  let rows = document.querySelectorAll("#contact-list tr");

  rows.forEach(row => {
    let name = row.cells[0].textContent.toLowerCase();
    let phone = row.cells[1].textContent.toLowerCase();
    let designation = row.cells[2].textContent.toLowerCase();

    if (name.includes(filter) || phone.includes(filter) || designation.includes(filter)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });


}
function logout() {
  isAdmin = false;
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("designation").value = "";
  document.getElementById("editIndex").value = "";
  window.location.href = "index.html";
}