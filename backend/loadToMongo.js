/**
 * @author Dylan Miller & Isaiah Hermance
 * @version September 2023
 * @class Converts json files to collections for our MongoDB database
 */
// loadToMongo.js
const { MongoClient } = require("mongodb");
require('dotenv').config();

async function loadToMongo(transactionLogs, filename) {
  const uri = "mongodb+srv://LSMTest:wztYw7BcN6bNqL50@cluster0.uijsyak.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  console.log(filename);
  // Sanitize the filename to use as a collection name
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9_]+/g, '_');

  try {
    await client.connect();
    const dbName = "transaction_logs";
    const database = client.db(dbName);
    const collectionName = sanitizedFilename || "default_collection";
    const collection = database.collection(collectionName);

    await collection.deleteMany({});  // Be cautious with this in production!
    await collection.insertMany(transactionLogs);
    console.log(`Inserted documents into collection ${collectionName}`);
  } catch (err) {
    throw err; // Re-throw the error to be handled by the caller
  } finally {
    await client.close();
  }
}

module.exports = loadToMongo;