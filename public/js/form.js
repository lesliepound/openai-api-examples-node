async function loadFormData() {
    const response = await fetch('/data');
    const jsonData = await response.json();

    const form = document.getElementById('jsonForm');
    jsonData.forEach(item => {
        const div = document.createElement('div');
        // ... (Create input fields for each property dynamically)
        form.appendChild(div);
    });
}

async function saveFormData() {
    const jsonData = []; // Collect data from the form

    const response = await fetch('/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    });

    if (response.ok) {
        alert("Data saved successfully!");
    } else {
        alert("Error saving data.");
    }
}

loadFormData();
