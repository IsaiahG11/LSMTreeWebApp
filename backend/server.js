const express = require('express');
const multer = require('multer');
const loadToMongo = require('./loadToMongo');
const bodyParser = require('body-parser');
const simulationRoutes = require('./loadFromMongo'); // Use the correct path
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(simulationRoutes);

// Setup Multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('transactionLog'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }

    try {
        // Since file is in memory, use buffer directly to parse JSON
        const transactionLogs = JSON.parse(req.file.buffer.toString());
        await loadToMongo(transactionLogs, req.file.originalname);
        // Validate the transaction logs
        const isValid = validateTransactionLogs(transactionLogs);
        if (!isValid) {
            return res.status(400).send('Invalid transaction log format.');
        }

        // Call the loadToMongo function and pass the transaction logs and file name
        await loadToMongo(transactionLogs, req.file.originalname);

        res.status(200).send('File uploaded and processed successfully.');
    } catch (err) {
        if (err.message === 'Collection already exists') {
            res.status(409).send({ message: "Collection already exists. Please rename the file or choose a different file." });
        } else {
            console.error(`Error processing transaction logs: ${err}`);
            res.status(500).send('Error processing file.');
        }
    }
});

// Validation function
function validateTransactionLogs(logs) {
    if (!Array.isArray(logs)) return false;

    for (const entry of logs) {
        if (typeof entry !== 'object' || entry === null) return false;
        if (!['insert', 'update', 'search', 'delete'].includes(entry.operation)) return false;

        if (!entry.data || typeof entry.data !== 'object') return false;
        if (!isValidNumberString(entry.data.key)) return false;

        if ((entry.operation === 'insert' || entry.operation === 'update') &&
            !isValidNumberString(entry.data.value)) return false;
    }
    return true;
}

// Helper function to check if a string is a valid number string
function isValidNumberString(str) {
    return typeof str === 'string' && !isNaN(str) && !isNaN(parseFloat(str));
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
