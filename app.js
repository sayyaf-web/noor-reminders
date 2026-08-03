// ===============================
// NOORLY APP
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to Noorly!");

    updateDashboard();

    // Update dashboard every second
    setInterval(updateDashboard, 1000);

    // Check notification support
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
// LIVE DASHBOARD
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
    } else {
        greeting = "🌙 Assalamu Alaikum";
    }

    const greetingEl = document.getElementById("greeting");
    if (greetingEl) {
        greetingEl.textContent = greeting;
    }

    // Live Clock
    const clockEl = document.getElementById("liveClock");

    if (clockEl) {
        const time = now.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

        clockEl.textContent = time;
    }

    // Gregorian Date
    const dateEl = document.getElementById("liveDate");

    if (dateEl) {
        const date = now.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        dateEl.textContent = date;
    }

    // Hijri Date
    const hijriEl = document.getElementById("liveHijri");

    if (hijriEl) {

        try {

            const hijri = new Intl.DateTimeFormat(
                "en-u-ca-islamic",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            ).format(now);

            hijriEl.textContent = hijri + " AH";

        } catch (error) {

            hijriEl.textContent = "Hijri date unavailable";

        }
    }

}
