/**
 * @author Dylan Miller & Isaiah Hermance
 * @version October 2023
 * @class Skip list memtable with multiple layers
 */

const SSTable = require('./ssTable');
const ListNode = require('./listNode');

class MemTable {
    constructor() {
        this.layers = [[]]; // Initialize with one layer
        this.maxLayers = 3; // Maximum number of layers
        this.ssTable = new SSTable('my_sstable.txt');
    }

    // Insert a node into the memtable on a specific layer
    insertNodeInLayer(node, layer) {
        if (!this.layers[layer]) {
            this.layers[layer] = [];
        }

        const layerNodes = this.layers[layer];
        let insertionIndex = 0;

        while (insertionIndex < layerNodes.length && node.getValue() > layerNodes[insertionIndex].getValue()) {
            insertionIndex++;
        }

        layerNodes.splice(insertionIndex, 0, node);
    }

    // Insert a node into the memtable on all layers
    insertNode(key, value) {
        const newNode = new ListNode(key, value);

        // Insert into the first layer
        this.insertNodeInLayer(newNode, 0);

        // Iterate through the layers to add the node with a 50/50 chance
        for (let layer = 1; layer < this.maxLayers; layer++) {
            if (Math.random() < 0.5) {
                this.insertNodeInLayer(newNode, layer);
            } else {
                break; // Stop if the 50/50 chance fails
            }
        }

        // Check if the memtable needs to be flushed and cleared
        if (this.layers[0].length >= 4) {
            this.writeMemTableToSSTable();
            this.clearMemTable();
        }
    }

    // Serialize the memtable to an SSTable
    writeMemTableToSSTable() {
        const dataToWrite = this.layers[0].map((node) => [node.key, node.getValue()]);
        console.log("\nFlushing memTable to SSTable\n");
        this.ssTable.insertBulk(dataToWrite);
    }



    // Clear the memtable
    clearMemTable() {
        this.layers = [[]];
    }

    // Print the content of the memtable (for testing purposes)
    printMemTable() {
        console.log('MemTable Content:');
        for (let layer = 0; layer < this.layers.length; layer++) {
            if (this.layers[layer]) {
                console.log(`Layer ${layer}:`, this.layers[layer].map((node) => [node.key, node.getValue()]));
            } else {
                console.log(`Layer ${layer}: []`);
            }
        }
    }
}

module.exports = MemTable;


console.log();

var list = new MemTable();
var node0 = new ListNode("value0", 0);
console.log("Adding node0")
list.insertNode(node0);


var node1 = new ListNode("value1", 1);
console.log("Adding node1")
list.insertNode(node1);


var node2 = new ListNode("value2", 2);
console.log("Adding node2")
list.insertNode(node2);


var node3 = new ListNode("value3", 3);
console.log("Adding node3")
list.insertNode(node3);


var node4 = new ListNode("value4", 4);
console.log("Adding node4")
list.insertNode(node4);


var node5 = new ListNode("value5", 5);
console.log("Adding node5")
list.insertNode(node5);


var node6 = new ListNode("value6", 6);
console.log("Adding node6")
list.insertNode(node6);


//var node7 = new ListNode("value7", 7);
//console.log("Adding node7")
//list.insertNode(node7);


//var node8 = new ListNode("value8", 8);
//console.log("Adding node8")
//list.insertNode(node8);

console.log();

list.printMemTable();

