/**
 * @author Dylan Miller & Isaiah Hermance
 * @version October 2023
 * @class 
 */

const fs = require('fs');

// Define a simple SSTable class
class SSTable {
  constructor(filename) {
    this.filename = filename;
    this.data = new Map();
  }

  // Insert a key-value pair into the SSTable
  insert(key, value) {
    this.data.set(key, value);
  }

  insertBulk(entries) {
    for (const [key, value] of entries) {
        this.data.set(key, value);
    }
    this.serialize();
    }

  // Retrieve a value by key
  get(key) {
    return this.data.get(key);
  }

  // Serialize the SSTable to a file
  serialize() {
    const serializedData = JSON.stringify(Array.from(this.data.entries()));
    fs.writeFileSync(this.filename, serializedData, 'utf8');
  }

  // Deserialize the SSTable from a file
  deserialize() {
    const fileData = fs.readFileSync(this.filename, 'utf8');
    const entries = JSON.parse(fileData);
    this.data = new Map(entries);
  }
}

module.exports = SSTable; // Export the SSTable class

// Create an SSTable instance and perform basic operations
//const sstable = new SSTable('my_sstable.txt');
//sstable.insert('key1', 'value1');
//sstable.insert('key2', 'value2');
//sstable.insert('key3', 'value3');
//sstable.serialize();

// Read from the SSTable
//const newSSTable = new SSTable('my_sstable.txt');
//newSSTable.deserialize();
//console.log(newSSTable.get('key2')); // Output: value2