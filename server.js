const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const CONTACTS_FILE = path.join(__dirname, 'contacts.json');

// Endpoint to receive contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const newContact = { name, email, message, date: new Date().toISOString() };

    // Read existing contacts
    fs.readFile(CONTACTS_FILE, 'utf8', (err, data) => {
        let contacts = [];
        if (!err && data) {
            try {
                contacts = JSON.parse(data);
            } catch (e) {
                contacts = [];
            }
        }
        contacts.push(newContact);

        // Save updated contacts
        fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save contact.' });
            }
            res.json({ message: 'Contact saved successfully.' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
