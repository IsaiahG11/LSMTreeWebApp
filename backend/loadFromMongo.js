/**
 * @author Dylan Miller & Isaiah Hermance
 * @version September 2023
 * @class Loads collections from our MongoDB database
 */
const express = require('express');
const { MongoClient } = require("mongodb");
const ListNode = require('./listNode'); // Import the ListNode module
const MemTable = require('./memTable'); // Import the MemTable module
require('dotenv').config();

const router = express.Router();
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

router.post('/simulate', async (req, res) => {
  const collectionName = req.body.collectionName; // Assume the front end sends this

  try {
    await client.connect();
    const dbName = "transaction_logs";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const cursor = await collection.find();
    const transactions = await cursor.toArray();

    let skipList = new MemTable();

    transactions.forEach((item, i) => {
      switch (item.operation) {
        case "insert":
          let nodeToInsert = new ListNode(item.data.key, parseInt(item.data.value));
          skipList.insertNode(nodeToInsert);
          break;
        case "update":
          skipList.updateNode(item.data.key, parseInt(item.data.value));
          break;
        case "delete":
          skipList.deleteNode(item.data.key);
          break;
        case "search":
          skipList.search(item.data.key);
          break;
      }
    });

    res.status(200).json({ message: 'Simulation completed successfully.' });
  } catch (err) {
    console.error(`Error while simulating LSM Tree operations: ${err}`);
    res.status(500).send('Failed to simulate LSM Tree operations.');
  } finally {
    await client.close();
  }
});

module.exports = router;
