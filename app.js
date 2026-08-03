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

        const today = new Date();

const day = String(today.getDate()).padStart(2, "0");
const month = String(today.getMonth() + 1).padStart(2, "0");
const year = today.getFullYear();

const response = await fetch(
    `https://api.aladhan.com/v1/gToH?date=${day}-${month}-${year}`
);

const data = await response.json();

const hijri = data.data.hijri;

        hijriEl.textContent =
            `${hijri.day} ${hijri.month.en} ${hijri.year} AH`;

    } catch (error) {

        hijriEl.textContent = "Hijri date unavailable";

    }

}
// ===============================
// QIBLA COMPASS
// ===============================

function startQiblaCompass() {

    if (!navigator.geolocation) {
        document.getElementById("qiblaStatus").textContent =
            "Geolocation is not supported on this device.";
        return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {

        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        // Kaaba coordinates
        const kaabaLat = 21.4225;
        const kaabaLon = 39.8262;

        const lat1 = userLat * Math.PI / 180;
        const lat2 = kaabaLat * Math.PI / 180;
        const dLon = (kaabaLon - userLon) * Math.PI / 180;

        const y = Math.sin(dLon);
        const x =
            Math.cos(lat1) * Math.tan(lat2) -
            Math.sin(lat1) * Math.cos(dLon);

        const qibla = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;

        document.getElementById("qiblaStatus").textContent =
            "Qibla Direction: " + Math.round(qibla) + "° from North";

        if (window.DeviceOrientationEvent) {

            window.addEventListener("deviceorientation", function(event) {

                const heading = event.alpha;

                if (heading != null) {

                    const rotation = qibla - heading;

                    document.querySelector(".needle").style.transform =
                        `translateX(-50%) rotate(${rotation}deg)`;

                }

            });

        }

    }, function() {

        document.getElementById("qiblaStatus").textContent =
            "Location permission denied.";

    });

}
