/**
 * @author Dylan Miller & Isaiah Hermance
 * @version September 2023
 * @class Converts json files to collections for our MongoDB database
 */
// loadToMongo.js
const { MongoClient } = require("mongodb");
require('dotenv').config();

async function loadToMongo(transactionLogs) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  try {
    await client.connect();
    const dbName = "transaction_logs";
    const database = client.db(dbName);
    const collectionName = "uploaded_log";
    const collection = database.collection(collectionName);

    await collection.deleteMany({});
    await collection.insertMany(transactionLogs);
    console.log(`Inserted documents into collection ${collectionName}`);
  } catch (err) {
    throw err; // Re-throw the error to be handled by the caller
  } finally {
    await client.close();
  }
}

module.exports = loadToMongo;
