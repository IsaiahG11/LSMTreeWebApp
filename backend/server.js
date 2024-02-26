const express = require('express');
const fileUpload = require('express-fileupload');
const loadToMongo = require('./loadToMongo'); // Make sure this is the correct path to your module
require('dotenv').config();

const app = express();
app.use(fileUpload());

app.post('/upload', async (req, res) => {
    if (!req.files || !req.files.transactionLog) {
        return res.status(400).send('No files were uploaded.');
    }

    // Get the uploaded file content
    const fileContent = req.files.transactionLog.data.toString();

    try {
        // Parse the file content into JSON
        const transactionLogs = JSON.parse(fileContent);

        // Validate the transaction logs
        const isValid = validateTransactionLogs(transactionLogs);
        if (!isValid) {
            return res.status(400).send('Invalid transaction log format.');
        }

        // Call the loadToMongo function and pass the transaction logs to it
        await loadToMongo(transactionLogs);

        res.status(200).send('File uploaded and processed successfully.');
    } catch (err) {
        console.error(`Error processing transaction logs: ${err}`);
        res.status(500).send('Error processing file.');
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
