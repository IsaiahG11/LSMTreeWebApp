const express = require('express');
const multer = require('multer');
const loadToMongo = require('./loadToMongo');
const bodyParser = require('body-parser');
const simulationRoutes = require('./loadFromMongo'); // Use the correct path
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000

const app = express();
app.use(cors());
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
        const transactionLogs = JSON.parse(req.file.buffer.toString());

        const isValid = validateTransactionLogs(transactionLogs);
        if (!isValid) {
            return res.status(400).send('Invalid transaction log format.');
        }

        await loadToMongo(transactionLogs, req.file.originalname);
        res.status(200).json({
            message: 'File uploaded and processed successfully.',
            logs: transactionLogs  // Include the logs in the response
        });
    } catch (err) {
        console.error(`Error processing transaction logs: ${err}`);
        res.status(500).json({ message: `Error processing file: ${err.message}` });
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
