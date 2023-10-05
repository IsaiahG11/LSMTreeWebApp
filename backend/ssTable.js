/**
 * @author Dylan Miller & Isaiah Hermance
 * @version October 2023
 * @class 
 */

const fs = require('fs');

// Define a simple SSTable class
class SSTable {
  constructor(filename) {
    this.serCount = 0;
    this.filename = filename;
    this.data = new Map();
    this.ext = "txt";
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
    fs.writeFileSync(this.filename + this.serCount, serializedData, 'utf8');
    if(this.serCount > 0){
      this.compact();
    }
    this.serCount++;
    this.data.clear();
  }

  // Deserialize the SSTable from a file
  deserialize() {
    const fileData = fs.readFileSync(this.filename + this.serCount, 'utf8');
    const entries = JSON.parse(fileData);
    this.data = new Map(entries);
  }

  /** 
   * Compacts all data in SSTable. Data is flushed to SSTable as a set of 4 [k,v] pairs.
   * Pairs within sets are ordered by value.
   * These sets are then compacted into one file.
   * Sets of [k,v] pairs are sorted newest to oldest.
   */
  compact(){
    var serCountMinus = this.serCount - 1;

    const newFileData = fs.readFileSync(this.filename + this.serCount, 'utf8');
    const oldFileData = fs.readFileSync(this.filename + serCountMinus, 'utf8');

    let newer = JSON.parse(newFileData);
    let old = JSON.parse(oldFileData);

    for (const [key, value] of old) {
      newer.push([key, value]);
    }

    var serializedData = "";
    for(const [key, value] of newer){
      serializedData += JSON.stringify([key, value]);
    }
    
    fs.writeFileSync(this.filename + this.serCount, serializedData, 'utf8');
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