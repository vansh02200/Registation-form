const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const PORT = 3000;
const DATA_FILE = 'registrationData.json';

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (like your HTML)

// Handle form submission
app.post('/register', (req, res) => {
    const newEntry = req.body;
    console.log(newEntry);
    // Read existing data
    fs.readFile(DATA_FILE, (err, data) => {
        let jsonData = [];
        if (!err && data.length) {
            jsonData = JSON.parse(data);
        }

        // Add new entry
        jsonData.push(newEntry);

        // Write back to file
        fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 4), (writeErr) => {
            if (writeErr) {
                console.error('Error saving data:', writeErr);
                return res.status(500).send('Error saving data');
            }
            res.send('Registration data saved successfully!');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
