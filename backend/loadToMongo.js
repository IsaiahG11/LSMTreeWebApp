/**
 * @author Dylan Miller & Isaiah Hermance
 * @version September 2023
 * @class Converts json files to collections for our MongoDB database
 */
// loadToMongo.js
const { MongoClient } = require("mongodb");
require('dotenv').config();

async function loadToMongo(transactionLogs, filename) {
  const uri = process.env.MONGODB_URI;  // Make sure to use the environment variable for URI
  const client = new MongoClient(uri);

  // Sanitize the filename to use as a collection name
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9_]+/g, '_');

  try {
    await client.connect();
    const dbName = "transaction_logs";
    const database = client.db(dbName);

    // Check if the collection already exists
    const collections = await database.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    if (collectionNames.includes(sanitizedFilename)) {
      throw new Error('Collection already exists');  // Custom error for existing collection
    }

    const collection = database.collection(sanitizedFilename);
    await collection.deleteMany({});  // Caution: Consider the implications in production!
    await collection.insertMany(transactionLogs);
    console.log(`Inserted documents into collection ${sanitizedFilename}`);
  } catch (err) {
    throw err; // Re-throw the error to be handled by the caller
  } finally {
    await client.close();
  }
}

module.exports = loadToMongo;
