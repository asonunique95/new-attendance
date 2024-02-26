let count = 0;
let attendanceDates = [];

function loadAttendanceData() {
    // Load attendance data from localStorage
    const storedDates = localStorage.getItem('attendanceDates');
    if (storedDates) {
        attendanceDates = JSON.parse(storedDates);
        count = attendanceDates.length;
    }
}

function saveAttendanceData() {
    // Save the updated attendance dates to localStorage
    localStorage.setItem('attendanceDates', JSON.stringify(attendanceDates));
}

function updateDisplay() {
    document.getElementById('attendanceCount').innerText = `Attendance Count: ${count}`;
    let lastVisitedDate = attendanceDates[attendanceDates.length - 1] || 'Not yet visited';
    document.getElementById('lastVisited').innerText = `Last Visited: ${lastVisitedDate}`;
    document.getElementById('attendanceDates').innerHTML = `<strong>Attendance Dates:</strong> ${attendanceDates.join(', ')}`;
}

function markAttendance() {
    const today = new Date().toLocaleDateString();
    
    // Check if today's date is already in the attendanceDates array
    if (!attendanceDates.includes(today)) {
        attendanceDates.push(today);
        count = attendanceDates.length; // Update count based on array length
        saveAttendanceData(); // Save every time attendance is marked
        updateDisplay();
    } else {
        alert("Attendance for today has already been marked.");
    }
}
// Add this function to clear attendance data
function resetAttendance() {
    // Confirm before resetting
    if (confirm("Are you sure you want to reset all attendance data? This action cannot be undone.")) {
        attendanceDates = [];
        count = 0;
        updateDisplay();
        localStorage.removeItem('attendanceDates');
    }
}

// Add this inside the script to attach the event listener to the reset button
document.getElementById('resetButton').addEventListener('click', resetAttendance);

document.getElementById('visitButton').addEventListener('click', markAttendance);

// Initialize
loadAttendanceData(); // Load data when the page loads
updateDisplay(); // And then update the display
