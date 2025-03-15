function toggleDropdown(id) {
    // Get all dropdowns and close them except the one being clicked
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        if (dropdown.id !== id) {
            dropdown.classList.remove("active");
        }
    });

    // Toggle the clicked dropdown
    var dropdown = document.getElementById(id);
    dropdown.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=Kerala')
    .then(response => response.json())
    .then(data => {
        document.getElementById("weather").innerHTML = `🌡️ ${data.current.temp_c}°C | ${data.current.condition.text}`;
    })
    .catch(error => console.log("Weather data unavailable."));
});

function toggleCompose() {
    let composeBox = document.getElementById('composeMailBox');
    if (composeBox.style.display === "none" || composeBox.style.display === "") {
        composeBox.style.display = "block";
    } else {
        composeBox.style.display = "none";
    }
}
// Save Profile & Show Welcome Message
document.addEventListener("DOMContentLoaded", function () {
    let profileForm = document.getElementById("profileForm");
    let savedName = document.getElementById("savedName");
    let welcomeMessage = document.getElementById("welcomeMessage");

    // Check if name is saved in localStorage
    let storedName = localStorage.getItem("profileName");
    if (storedName) {
        savedName.textContent = storedName;
        welcomeMessage.style.display = "block";
    }

    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("profileName").value;
        localStorage.setItem("profileName", name);

        savedName.textContent = name;
        welcomeMessage.style.display = "block";

        alert("Profile saved successfully!");
    });
});

// Confirm Logout - Clears Name & Hides Message
function confirmLogout() {
    localStorage.removeItem("profileName");
    alert("You have logged out.");
    window.location.href = "/"; // Redirect to home
}

// Cancel Logout - Stay on Page
function cancelLogout() {
    window.history.back();
}
// Function to toggle dropdown menus
function toggleDropdown(id) {
    let dropdown = document.getElementById(id);

    // Close any other open dropdowns
    document.querySelectorAll('.dropdown').forEach(menu => {
        if (menu.id !== id) {
            menu.classList.remove('active');
        }
    });

    // Toggle the selected dropdown
    dropdown.classList.toggle('active');
}

// Close dropdown if clicked outside
document.addEventListener("click", function(event) {
    if (!event.target.closest('.icon-wrapper')) {
        document.querySelectorAll('.dropdown').forEach(menu => {
            menu.classList.remove('active');
        });
    }
});
/* Dropdown Menu */
.dropdown {
    display: none;
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    border-radius: 8px;
    right: 0; /* Aligns dropdown to the right */
    width: 150px;
    text-align: left;
}

/* Show dropdown when active */
.dropdown.active {
    display: block;
}

/* Dropdown Items */
.dropdown a {
    display: block;
    padding: 8px 12px;
    text-decoration: none;
    color: white;
    transition: background 0.3s;
}

.dropdown a:hover {
    background: orange;
}

function toggleDropdown(id) {
    document.querySelectorAll(".dropdown").forEach(drop => {
        if (drop.id !== id) drop.style.display = "none";
    });

    let dropdown = document.getElementById(id);
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";

    // Close dropdown on menu item click
    dropdown.querySelectorAll("a").forEach(item => {
        item.addEventListener("click", () => {
            dropdown.style.display = "none";
        });
    });
}
