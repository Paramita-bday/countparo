// Preset birthday date and time
const presetBirthday = "2025-01-17T00:00:00"; // Example: January 17, 2025, at 12:00 PM
const redirectUrl = "https://sougata.dev/hbdparo"; // Replace with your target URL

let countdownInterval;

// Function to start the countdown
function startCountdown() {
    const birthday = new Date(presetBirthday);
    const now = new Date();

    // If the birthday is in the past, show "Countdown Ended!" and redirect
    if (now >= birthday) {
        displayCountdownEnded();
        return;
    }

    // Start updating the countdown every second
    countdownInterval = setInterval(() => {
        const now = new Date();
        const timeRemaining = birthday - now;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            displayCountdownEnded();
            return;
        }

        // Calculate time components
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Update countdown display
        document.getElementById("days").textContent = String(days).padStart(2, "0");
        document.getElementById("hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

        // Add glowing effect for countdown when less than 5 minutes remain
        const countdownElement = document.getElementById("countdown");
        if (timeRemaining <= 5 * 60 * 1000) { // 5 minutes in milliseconds
            countdownElement.classList.add("countdown-glow");
        } else {
            countdownElement.classList.remove("countdown-glow");
        }
    }, 1000);
}

// Function to display "Countdown Ended!" and redirect
function displayCountdownEnded() {
    document.getElementById("message").innerHTML = `
    <span style="font-size: 1.5rem; color: #FF4500;">
        Waiting is Over!
    </span> 
    <br> 
    <span style="font-size: 2rem; font-weight: bold; color: #FFD700; text-shadow: 2px 2px 5px #FF6347;">
        🎉 Happy Birthday 🎉
    </span>
    `;
    document.getElementById("countdown").style.display = "none";

    // Redirect to the specified URL after 3 seconds
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 3000);
}

// Music play button functionality
const playMusicButton = document.getElementById("playMusicButton");
const music = document.getElementById("backgroundMusic");

playMusicButton.addEventListener("click", () => {
    music.play().catch((error) => {
        console.error("Music play failed:", error); // Handle autoplay issues
    });
    playMusicButton.style.display = "none"; // Hide the button after the music starts
});

// Ensure video plays on mobile and desktop
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("backgroundVideo");

    // Ensure the video starts correctly for both mobile and desktop
    const ensureVideoPlays = () => {
        if (video.paused || video.readyState < 3) {
            video.muted = true; // Safari requires videos to be muted for autoplay
            video.play().catch(() => {
                console.log("Autoplay blocked; user interaction required.");
            });
        }
    };

    // Attempt to play the video immediately
    ensureVideoPlays();

    // Retry play if user interacts with the page
    document.addEventListener("click", ensureVideoPlays, { once: true });
});

// Start the countdown immediately
startCountdown();