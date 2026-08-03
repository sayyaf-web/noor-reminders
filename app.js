// ===============================
// NOORLY APP
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Welcome to Noorly!");

    updateDashboard();
    getHijriDate();

    setInterval(updateDashboard, 1000);

    // Update Hijri date every hour
    setInterval(getHijriDate, 3600000);

    if ("Notification" in window) {
        console.log("Notifications are supported.");
    } else {
        console.log("Notifications are not supported.");
    }

});

// ===============================
// ENABLE NOTIFICATIONS
// ===============================

async function enableNotifications() {

    if (!("Notification" in window)) {
        alert("Your browser does not support notifications.");
        return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
        alert("Daily reminders have been enabled.");
    } else {
        alert("Notifications were not enabled.");
    }

}

// ===============================
// LIVE CLOCK & DATE
// ===============================

function updateDashboard() {

    const now = new Date();

    // Greeting
    let greeting = "🌙 Assalamu Alaikum";

    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
        greeting = "🌅 Assalamu Alaikum";
    } else if (hour >= 12 && hour < 18) {
        greeting = "☀️ Assalamu Alaikum";
    }

    document.getElementById("greeting").textContent = greeting;

    // Live Clock
    document.getElementById("liveClock").textContent =
        now.toLocaleTimeString("en-GB");

    // Gregorian Date
    document.getElementById("liveDate").textContent =
        now.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

}

// ===============================
// HIJRI DATE FROM API
// ===============================

async function getHijriDate() {

    const hijriEl = document.getElementById("liveHijri");

    try {

        const response = await fetch("https://api.aladhan.com/v1/gToH");

        const data = await response.json();

        const hijri = data.data.hijri;

        hijriEl.textContent =
            `${hijri.day} ${hijri.month.en} ${hijri.year} AH`;

    } catch (error) {

        hijriEl.textContent = "Hijri date unavailable";

    }

}
