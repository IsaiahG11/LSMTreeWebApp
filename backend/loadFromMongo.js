/**
 * @author Dylan Miller & Isaiah Hermance
 * @version September 2023
 * @class Loads collections from our MongoDB database
 */


const ListNode = require('./listNode'); //Import the ListNode module
const MemTable = require('./memTable'); //Import the MemTable module

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

  // Name of the target database to read data
  const dbName = "transaction_logs";
  //Name of the target collection to read from
  const collectionName = "log4";
  // Create references to the database and collection in order to run
  // operations on them.
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  var transactions = [];
  try {
    const cursor = await collection.find();
    await cursor.forEach(item => {

      transactions.push(item.data);

    });

    var skipList = new MemTable();

    for(i = 0; i < transactions.length; i++){

      console.log("Adding node" + (i + 1));

      var node = new ListNode(transactions[i].key, transactions[i].value);

      skipList.insertNode(node);

      console.log();

    }

    // add a linebreak
    console.log();
  } catch (err) {
    console.error(`Something went wrong trying to find the documents: ${err}\n`);
  }
  await client.close();
}

run()