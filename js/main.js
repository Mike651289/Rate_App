// Load restaurant data and display it
async function loadRestaurants() {
  try {
    const response = await fetch('data/restaurants.json');
    const restaurants = await response.json();
    displayRestaurants(restaurants);
  } catch (error) {
    console.error("Failed to load restaurant data:", error);
  }
}

// Display all restaurants
function displayRestaurants(restaurants) {
  const container = document.getElementById('recentRatings');
  container.innerHTML = '';

  restaurants.forEach((restaurant) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${restaurant.image}" alt="${restaurant.name}" style="width:100%; border-radius: 10px;">
      <h4>${restaurant.name}</h4>
      <p>Rating: ${restaurant.rating} ⭐ (${restaurant.reviews} reviews)</p>
      <div style="display:flex; align-items:center; margin-top:10px;">
        <img src="${restaurant.latestReview.profilePic}" alt="${restaurant.latestReview.user}" style="width:40px; height:40px; border-radius:50%; margin-right:10px;">
        <div>
          <strong>${restaurant.latestReview.user}</strong><br/>
          <small>"${restaurant.latestReview.comment}"</small>
        </div>
      </div>
    `;

    container.appendChild(card);
    
  });
  
}

// Search handler
document.getElementById('searchButton').addEventListener('click', async() => {
  const term = document.getElementById('searchinput').value.toLowerCase();

  try{
    const response = await fetch('data/restaurants.json');
    const restaurants = await response.json();
    const filtered = restaurants.filter(r => r.name.toLowerCase().includes(term));
    displayRestaurants(filtered);
  } catch (err){
    console.error("Search failed:", err);
  }
});
function toggleMenu() {
      document.getElementById("mobileNav").classList.toggle("active");
    }
// Load on page ready
window.onload = loadRestaurants;

// Sign Up form
document.addEventListener("DOMContentLoaded", () =>{
  const signupForm = document.getElementById("signupForm");

  if (signupForm){
    signupForm.addEventListener("submit", function (e){
      e.preventDefault();

      // Get input values
      const fullName = document.getElementById("fullname").value.trim();
      const email = document.getElementById("email").value.trim();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      // Form validation
      if (!fullName || !email || !username || !password || !confirmPassword){
        alert("Please fill in all fields.");
        return;
      }

      // load users
      let users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.some(
        (user) => user.email === email || user.username === username
      );
      if (userExists){
        alert("Email or username already exists. Please use a different one.");
        return;
      }
      if(password != confirmPassword){
        alert("Password Missmatch. Enter valid password");
        return;
      }

      // Creating user object
      const newUser = {
        fullName,
        email,
        username,
        password
      };

      // save to locastorage
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Account created successfully");
      window.location.href = "dashboard.html";
    });
  }
});

// Login Java Script
document.addEventListener("DOMContentLoaded", () =>{
  const loginForm = document.getElementById("loginForm");
  if(loginForm){
    loginForm.addEventListener("submit", function (e){
      e.preventDefault();

      const input = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;

      // Fetch stored users
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Find user by email or user name
      const founduser = users.find(
        (user) => (user.email.toLowerCase() === input || user.username.toLowerCase() === input) && user.password === password
      );

       if (founduser) {
        alert(`Welcome back, ${founduser.fullName}!`);
        localStorage.setItem("loggedInUser", JSON.stringify(founduser)); 
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid email/username or password. Please try again.");
      }

    })
  }
})