// Select elements
let currentDate = new Date(); // Start with the current date

// Sample data: race availability status
const raceDays = {
    "2024-12-10": "available",
    "2024-12-11": "unavailable",
    "2024-12-12": "completed",
    "2024-12-13": "available",
};

// Generate the calendar for the selected month and year
function generateCalendar(date = new Date()) {
    const calendarContainer = document.getElementById("calendar");
    calendarContainer.innerHTML = "";

    const month = date.getMonth(); // Current month
    const year = date.getFullYear(); // Current year

    // Update the displayed month and year
    const currentMonthYear = document.getElementById("current-month-year");
    currentMonthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

    // Start from the first day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Calculate the number of days in the month
    const totalDays = lastDay.getDate();

    // Add empty divs for alignment before the first day
    const startingDay = firstDay.getDay();
    for (let i = 0; i < startingDay; i++) {
        const emptyDiv = document.createElement("div");
        calendarContainer.appendChild(emptyDiv);
    }

    // Loop through the days of the current month
    for (let i = 1; i <= totalDays; i++) {
        const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const dayDiv = document.createElement("div");
        dayDiv.textContent = i;

        // Check if the day is available, unavailable, or completed
        const status = raceDays[dateStr] || "available"; // Default to available if no status
        dayDiv.classList.add(status);

        // Add event listener for the day selection
        dayDiv.addEventListener("click", () => selectRaceDay(dateStr, status));

        calendarContainer.appendChild(dayDiv);
    }
}

// Handle navigation to the previous month
document.getElementById("prev-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1); // Go to the previous month
    generateCalendar(currentDate);
});

// Handle navigation to the next month
document.getElementById("next-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1); // Go to the next month
    generateCalendar(currentDate);
});

// Handle day selection and availability check
function selectRaceDay(dateStr, status) {
    const confirmButton = document.getElementById("confirm-race-day");
    const availabilityMessage = document.getElementById("availability-message");

    if (status === "available") {
        availabilityMessage.textContent = `Race is available on ${dateStr}. Confirm to join!`;
        availabilityMessage.style.color = "green";
        confirmButton.style.display = "inline-block"; // Show confirm button
        confirmButton.onclick = () => confirmRaceDay(dateStr);
    } else if (status === "unavailable") {
        availabilityMessage.textContent = `No race available on ${dateStr}. Please choose another day.`;
        availabilityMessage.style.color = "red";
        confirmButton.style.display = "none"; // Hide confirm button
    } else if (status === "completed") {
        availabilityMessage.textContent = `Race on ${dateStr} has already been completed.`;
        availabilityMessage.style.color = "gray";
        confirmButton.style.display = "none"; // Hide confirm button
    }
}

// Confirm the race day and redirect to vehicle verification page
function confirmRaceDay(dateStr) {
    alert(`You have selected ${dateStr} for the race! Proceeding to vehicle verification.`);
    window.location.href = "verify-vehicle.html";
}

// Initialize calendar when the page loads
window.onload = () => generateCalendar(currentDate);







