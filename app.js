// Noorly App

document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to Noorly!");

    // Check if notifications are supported
    if ("Notification" in window) {
        console.log("Notifications are supported.");
    } else {
        console.log("Notifications are not supported.");
    }
});

// Ask for notification permission
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
// Live greeting, clock and date

function updateDashboard() {
  const now = new Date();

  // Greeting
  const hour = now.getHours();
  let greeting = "🌙 Assalamu Alaikum";

  if (hour < 12) {
    greeting = "🌅 Assalamu Alaikum";
  } else if (hour < 18) {
    greeting = "☀️ Assalamu Alaikum";
  }

  const greetingEl = document.getElementById("greeting");
  if (greetingEl) greetingEl.textContent = greeting;

 // Live Clock
const clockEl = document.getElementById("liveClock");
if (clockEl) {
  clockEl.textContent = "CLOCK TEST";
} 

  // Gregorian Date
  const dateEl = document.getElementById("liveDate");
  if (dateEl) {
    dateEl.textContent = now.toDateString();
  }

  // Hijri Date
  const hijriEl = document.getElementById("liveHijri");
  if (hijriEl) {
    try {
      hijriEl.textContent = new Intl.DateTimeFormat(
        "en-TN-u-ca-islamic",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      ).format(now);
    } catch {
      hijriEl.textContent = "";
    }
  }
}

updateDashboard();
setInterval(updateDashboard, 1000);
