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
