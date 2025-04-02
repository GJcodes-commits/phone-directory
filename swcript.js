document.addEventListener("DOMContentLoaded", loadContacts);

function addOrUpdateContact() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let designation = document.getElementById("designation").value.trim();
    let editIndex = document.getElementById("editIndex").value; // Get the edit index

    if (name === "" || phone === "" || designation === "") {
        alert("Please fill all fields");
        return;
    }

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    if (editIndex === "") {
        // Adding a new contact
        contacts.push({ name, phone, designation });
    } else {
        // Updating an existing contact
        contacts[parseInt(editIndex)] = { name, phone, designation };
        document.getElementById("editIndex").value = ""; // Reset edit index
    }

    localStorage.setItem("contacts", JSON.stringify(contacts)); // Save to localStorage

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("designation").value = "";

    loadContacts(); // Reload contact list
}

function loadContacts() {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let contactList = document.getElementById("contact-list");
    contactList.innerHTML = ""; // Clear existing table content

    contacts.forEach((contact, index) => {
        let row = `<tr>
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.designation}</td>
            <td>
                <button class="edit-btn" onclick="editContact(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
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
    document.getElementById("editIndex").value = index; // Store index to update later
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
