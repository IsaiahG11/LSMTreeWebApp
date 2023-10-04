/**
 * @author Dylan Miller & Isaiah Hermance
 * @version September 2023
 * @class Converts json files to collections for our MongoDB database
 */
const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");
require('dotenv').config();

async function run() {
  // connection string with Altas cluster specifics stored in .env
  const uri = process.env.MONGODB_URI; //uses environment variable
  // The MongoClient is the object that references the connection to our
  // datastore (Atlas, for example)
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  //connects to the specified MongoClient
  await client.connect();

  // Name of the target database to add data
  const dbName = "transaction_logs";
  // Create references to the database and collection in order to run
  // operations on them.
  const database = client.db(dbName);

  try {
    // Folder path where the transaction logs are located
    const logsFolderPath = path.join(__dirname, "../transaction_logs");

    // Read all JSON files in the transaction logs folder
    const logFiles = fs.readdirSync(logsFolderPath);
    
    
    //counter for each log file
    let log_count = 1
    // Process each JSON file in the folder
    for (const logFile of logFiles) {
      if (logFile.endsWith(".json")) {
        //changes the current collection for each transaction log file
        const collectionName = "log" + log_count;
        const collection = database.collection(collectionName);

        //clears the collection of any data if it already exists
        await collection.deleteMany();

        //finds the files, reads them, parses them to JSON objects
        const logFilePath = path.join(logsFolderPath, logFile);
        const logsData = fs.readFileSync(logFilePath, "utf8");
        const transactionLogs = JSON.parse(logsData);

        //adds the entries to the collection
        for (const logEntry of transactionLogs) {
          await collection.insertOne({ operation: logEntry.operation, data: logEntry.data });
          console.log(`Inserted document with key: ${logEntry.data.key} to collection ${collectionName}`);
        }
        log_count++;
        console.log();
      }
    }  
  } catch (err) {
    console.error(`Error processing transaction logs: ${err}`);
  }

  await client.close();
}
run().catch(console.dir);