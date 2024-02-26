const express = require('express');
const fileUpload = require('express-fileupload');
const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(fileUpload());

app.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // Get the uploaded file
    const transactionLog = req.files.transactionLog;

    // Convert the uploaded file data to a JSON object
    const transactionLogs = JSON.parse(transactionLog.data.toString());

    // MongoDB URI
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const dbName = "transaction_logs";
        const database = client.db(dbName);
        
        // You can customize this to use a specific collection or based on file name etc.
        const collectionName = "uploaded_logs";
        const collection = database.collection(collectionName);

        // Optionally clear the collection before inserting new documents
        await collection.deleteMany({});

        // Insert the parsed logs into the collection
        await collection.insertMany(transactionLogs);
        console.log(`Inserted documents into collection ${collectionName}`);

        res.status(200).send('File uploaded and processed successfully.');
    } catch (err) {
        console.error(`Error processing transaction logs: ${err}`);
        res.status(500).send('Error processing file.');
    } finally {
        await client.close();
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
