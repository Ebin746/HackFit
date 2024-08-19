document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    const logoutButton = document.getElementById('logout-button');
    const signupContainer = document.getElementById('signup-container');
    const welcomeContainer = document.getElementById('welcome-container');

    // Initialize map centered on Kochi, India
    const map = L.map('map').setView([9.9312, 76.2673], 13); // Kochi coordinates with zoom level 13

    // Load and display tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Marker for user's selected location
    let marker;

    // Event listener to capture click events on the map
    map.on('click', function (e) {
        const { lat, lng } = e.latlng;

        // If marker exists, remove it
        if (marker) {
            map.removeLayer(marker);
        }

        // Add marker to the clicked location
        marker = L.marker([lat, lng]).addTo(map);

        // Update form fields with the selected latitude and longitude
        document.getElementById('latitude').value = lat;
        document.getElementById('longitude').value = lng;

        console.log(`Selected Latitude: ${lat}, Longitude: ${lng}`);
    });

    signupForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;

        // Validate latitude and longitude
        if (!latitude || !longitude) {
            alert("Please select a location on the map.");
            return;
        }

        try {
            let response = await fetch("/user/signup", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ name: username, password, phoneNumber: phone, latitude, longitude })
            });
            let data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }

        // Print the entered values to the console
        console.log("Username: " + username);
        console.log("Password: " + password);
        console.log("Phone Number: " + phone);
        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);

        // Show welcome message and hide signup form
        signupContainer.style.display = 'none';
        welcomeContainer.style.display = 'block';
        document.getElementById('user-name').textContent = username;
    });

    logoutButton.addEventListener('click', function () {
        signupContainer.style.display = 'block';
        welcomeContainer.style.display = 'none';
        signupForm.reset();
    });
});
