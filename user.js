
function loadContacts() {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  let contactList = document.getElementById("contact-list");
  contactList.innerHTML = "";

  contacts.forEach(contact => {
    let row = `<tr>
        <td>${contact.name}</td>
        <td>${contact.phone}</td>
        <td>${contact.designation}</td>
      </tr>`;
    contactList.innerHTML += row;
  });
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

window.onload = loadContacts;
