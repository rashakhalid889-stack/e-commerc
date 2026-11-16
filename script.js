// Get saved appointments from localStorage

var appointments = JSON.parse(
    localStorage.getItem("appointments")
) || [];


// Get elements

var bookingForm = document.getElementById("bookingForm");


// Booking Function

if (bookingForm) {

    // Prevent selecting past dates

    var dateInput = document.getElementById("date");

    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, "0");
    var day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;


    bookingForm.addEventListener("submit", function(e) {

        e.preventDefault();

        var name = document.getElementById("customerName").value.trim();
        var phone = document.getElementById("phone").value.trim();
        var service = document.getElementById("service").value;
        var doctor = document.getElementById("doctor").value;
        var date = document.getElementById("date").value;
        var time = document.getElementById("time").value;

        // Get service price

        var prices = {
            "Facial Care": 800,
            "Body Care": 1000,
            "Hair Care": 700,
            "Laser": 1200,
            "Skin Treatment": 900
        };

        // Check phone number

        if (!/^[0-9]{11}$/.test(phone)) {
            document.getElementById("message").innerText =
                "Please enter a valid 11-digit phone number";

            document.getElementById("message").style.color = "red";
            return;
        }

        // Check past date

        if (date < dateInput.min) {
            alert("Please choose a future date");
            return;
        }

        // Create appointment object

        var newAppointment = {
            id: Date.now(),
            name: name,
            phone: phone,
            service: service,
            doctor: doctor,
            date: date,
            time: time,
            price: prices[service],
            status: "Confirmed"
        };

        // Add appointment to array

        appointments.push(newAppointment);

        // Save in localStorage

        localStorage.setItem(
            "appointments",
            JSON.stringify(appointments)
        );

        alert("Your appointment has been booked successfully!");

        // Reset form

        bookingForm.reset();

        // Go to appointments page

        window.location.href = "appointments.html";

    });

}


// Display Appointments Function

var appointmentsList = document.getElementById("appointmentsList");

if (appointmentsList) {

    displayAppointments();

}


function displayAppointments() {

    appointmentsList.innerHTML = "";

    var emptyMessage = document.getElementById("emptyMessage");

    if (appointments.length === 0) {

        emptyMessage.style.display = "block";

        return;
    }

    emptyMessage.style.display = "none";


    appointments.forEach(function(item, index) {

        var row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.service}</td>
            <td>${item.doctor}</td>
            <td>${item.date}</td>
            <td>${item.time}</td>
            <td>${item.price} EGP</td>
            <td>
                <span class="status">${item.status}</span>
            </td>
            <td>
                <button class="cancel-btn"
                onclick="cancelAppointment(${item.id})">
                    Cancel
                </button>
            </td>
        `;

        appointmentsList.appendChild(row);

    });

}


// Cancel Appointment Function

function cancelAppointment(id) {

    var confirmCancel = confirm(
        "Are you sure you want to cancel this appointment?"
    );

    if (confirmCancel) {

        appointments = appointments.filter(function(item) {
            return item.id !== id;
        });

        localStorage.setItem(
            "appointments",
            JSON.stringify(appointments)
        );

        displayAppointments();

        alert("Appointment cancelled successfully");

    }

}