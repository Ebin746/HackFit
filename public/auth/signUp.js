document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const logoutButton = document.getElementById('logout-button');
    const signupContainer = document.getElementById('signup-container');
    const welcomeContainer = document.getElementById('welcome-container');

    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();
      
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;

        try {
            let response = await fetch("/user/signup", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ username, password, phone })
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
      
        // Show welcome message and hide signup form
        signupContainer.style.display = 'none';
        welcomeContainer.style.display = 'block';
        document.getElementById('user-name').textContent = username;
    });

    logoutButton.addEventListener('click', function() {
        signupContainer.style.display = 'block';
        welcomeContainer.style.display = 'none';
        signupForm.reset();
    });
});
