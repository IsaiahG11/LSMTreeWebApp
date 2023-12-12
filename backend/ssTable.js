/**
 * @author Dylan Miller & Isaiah Hermance
 * @version October 2023
 * @class A backend implementation of SSTables using compaction
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

  // Insert a bulk of entries (A.K.A flushing from the memtable)
  insertBulk(entries) {
    for (const [key, value] of entries) {
        this.data.set(key, value);
    }
    this.serialize();
  }

  //TODO Search
  //TODO Update
  
  // Mark a key as deleted with a tombstone
  delete(key) {
    this.data.set(key, '*'); // Using null as the tombstone marker
  }

  // Retrieve a value by key with tombstones handled
  get(key) {
    const value = this.data.get(key);
    if (value === '*') { // Check for tombstone
      return null; // Or indicate that the key is deleted
    }
    return value;
  }

  search(lookupValue) {
    const ssTableFile = fs.readFileSync(this.filename + (this.serCount - 1), 'utf8');
    let data = new Map(JSON.parse(ssTableFile));
    var foundNode = null;
    data.forEach((value, key) => {
      if (value == lookupValue){ // TODO: check fot a tombstone here
        foundNode = [key, value];
      }
    });
    return foundNode;
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

  /** 
   * Compacts all data in SSTable. Data is flushed to SSTable as a set of 4 [k,v] pairs.
   * Pairs within sets are ordered by value.
   * These sets are then compacted into one file.
   * Sets of [k,v] pairs are sorted newest to oldest.
   */
  compact() {
    console.log("Compacting SSTable\n");

    const serCountMinus = this.serCount - 1;

    const newFileData = fs.readFileSync(this.filename + this.serCount, 'utf8');
    const oldFileData = fs.readFileSync(this.filename + serCountMinus, 'utf8');

    const newer = new Map(JSON.parse(newFileData));
    const old = new Map(JSON.parse(oldFileData));

    // Merge and exclude tombstoned entries
    old.forEach((value, key) => {
      if (newer.has(key) && newer.get(key) === '*') { // deletion
        newer.delete(key); // Remove tombstoned keys
      } else if (newer.has(key) && value !== '*') { // updates
        newer.set(key, newer.get(key));
      } else if (value !== '*') {
        newer.set(key, value); // normal insertion / compaction
      }
    });

    // Serialize the merged data excluding tombstoned keys
    const serializedData = JSON.stringify(Array.from(newer.entries()));
    fs.writeFileSync(this.filename + (this.serCount+1), serializedData, 'utf8');

    // Move the old file to backups
    fs.rename(this.filename + serCountMinus, ("../backups/" + this.filename + serCountMinus), (err) => {
        if (err) throw err;
    });

    fs.rename(this.filename + this.serCount, ("../backups/" + this.filename + this.serCount), (err) => {
      if (err) throw err;
    });
    this.serCount++;
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