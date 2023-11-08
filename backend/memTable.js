/**
 * @author Dylan Miller & Isaiah Hermance
 * @version October 2023
 * @class Basic implementation of a single layer skip list memtable
 */

const SSTable = require('./ssTable'); // Import the SSTable module
const ListNode = require('./listNode'); // Import the SSTable module

// Define a simple Skip List memtable class
class MemTable{
    constructor(head = null){
        this.head = head;
        this.memTableSize = 0; // Size of the list
        this.maxLayers = 3; //Max levels possible in SkipList

        this.ssTable = new SSTable('my_sstable.txt');

        this.init();
    }

    //Initializes each layer with a negative bound. (All inserted values must be 0 or positive)
    init(){

        let negNode = new ListNode("negBound", -1);

        this.head = negNode;

        for(let i = 1; i < this.maxLayers; i++){

            let nextNegNode = new ListNode("negBound", -1);
            negNode.down = nextNegNode;
            negNode = nextNegNode;

        }
    }

    // Inserts the node into the memtable
    insertNode(node){

        let currNode = this.head;

        let nodesBeforeInsert = [];


        while(currNode != null){ //may need to change condition

            if( currNode.next == null || node.getValue() < currNode.next.getValue()){

                nodesBeforeInsert.unshift(currNode);
                currNode = currNode.down;

            }else{

                currNode = currNode.next;
                
            }
        }

        let willPromote = true;

        let downNode = null;

        while(nodesBeforeInsert.length != 0 && willPromote){

            currNode = nodesBeforeInsert.shift();

            node.down = downNode;

            node.next = currNode.next;

            currNode.next = node;

            willPromote = Math.random() < 0.5;

            downNode = currNode;

            node = node.copyNode();
        }

        this.memTableSize++

        if(this.memTableSize > 3) {
            this.writeMemTableToSSTable();
            this.memTableSize = 0;
        }




    // TODO NOT CURRENTLY USED (can probably delete)
    /**

        if(this.head.next == null){
            this.head.next = node;
        }else if(node.getValue() < this.head.getValue()){
            node.next = this.head
            this.head = node;
    
        }else{
            if(node.getValue() != this.head.getValue()){

                var nodesBeforeInsertNode = findNodesBefore(node);

            }else{
                console.log("duplicate values... cannot insert");
                return; //throw error instead here.
            }
            var tmp = this.findNodeBefore(node);
            node.next = tmp.next;
            tmp.next = node;
        }

        this.memTableSize++

        if(this.memTableSize > 3) {
            this.writeMemTableToSSTable();
            this.memTableSize = 0;
        }
        */
    }

    // Search for a node by value
    search(value) {
    let currentNode = this.head;
    let searching = true;

    while (searching) {
        if (currentNode.data.has(currentNode.key) && currentNode.data.get(currentNode.key) === value) {
            return currentNode; // Found a matching node with the target value
        } else if (currentNode.next?.data.has(currentNode.next?.key) && currentNode.next?.data.get(currentNode.next?.key) <= value) {
            currentNode = currentNode.next;
        } else if (currentNode.down) {
            // Move down if the next node's value is greater
            currentNode = currentNode.down;
        } else {
            searching = false;
        }
    }

    return null; // Node with the given value not found
    }


    // Saves the memtable to an sstable
    writeMemTableToSSTable() {
        let dataToWrite = []; 

        let currentNode = this.head;

        let searching = true;

        while(searching){
            if(currentNode.down != null){
                currentNode = currentNode.down;
            }
            else if(currentNode.next !=null){
                currentNode = currentNode.next
                dataToWrite.push([currentNode.key, currentNode.getValue()]);
                console.log(dataToWrite);
                console.log();
            }
            else{
                searching = false;
            }
        }

        console.log("\nFlushing memTable to SSTable")
        this.ssTable.insertBulk(dataToWrite);
    
        // Empty the current memtable
        this.clearMemTableLayers()
        
        /**
        const dataToWrite = [];
    
        let currentNode = this.head;
        while (currentNode) {
            dataToWrite.push([currentNode.key, currentNode.getValue()]);
            currentNode = currentNode.next;
        }
    
        // Serialize the data and write it to the SSTable
        console.log("\nFlushing memTable to SSTable")
        this.ssTable.insertBulk(dataToWrite);
    
        // Clear the memTable by resetting the head to null
        this.head = null;
        */
    }

    //Helper Method to clear the MemTable after is has been flushed to an SSTable
    clearMemTableLayers() {
        let currentLayer = this.head; // Start at the top layer
      
        while (currentLayer) {
          let currentNode = currentLayer;
          while (currentNode) {
            if (currentNode.next) {
              currentNode.next = null;
            }
            currentNode = currentNode.next;
          }
      
          currentLayer = currentLayer.down; // Move to the next layer
        }
    }      
      

    // TESTING PURPOSES, to see what is in our memtable
    printList(){
        let tmp = this.head;
        console.log(tmp);
        while(tmp.next != null){
            tmp = tmp.next;
            console.log(tmp);
        }
    }

    // TESTING PURPOSES, prints visual skiplist w/ layers
    printLayers(){
        let layerString = "\n";
        let node = this.head
        while(node != null){
            layerString += node.getValue();
            let tmp = node;
            while(tmp.next != null){
                layerString += "  ---->  ";
                tmp = tmp.next;
                layerString += tmp.getValue();
            }
            node = node.down;
            if(node != null){
                layerString += "\n |        \n";
            }
        }
        layerString += "\n";
        console.log(layerString);
    }
}

module.exports = MemTable; // Export the SkipList class


// let list = new MemTable();
// list.insertNode(new ListNode("key1", 1));
// list.insertNode(new ListNode("key2", 4));
// list.insertNode(new ListNode("key3", 2));
// list.insertNode(new ListNode("key4", 5));
// list.insertNode(new ListNode("key5", 77));
// list.insertNode(new ListNode("key6", 3));
// list.insertNode(new ListNode("key7", 4));
// list.insertNode(new ListNode("key8", 6));
// list.insertNode(new ListNode("key9", 8));
// list.insertNode(new ListNode("key10", 10));
// list.insertNode(new ListNode("key11", 9));
// list.insertNode(new ListNode("key12", 12));
// list.insertNode(new ListNode("key13", 120));
// list.printLayers();

// const foundNode = list.search(2);

// if (foundNode) {
//     console.log("Found node:", foundNode.getValue());
// } else {
//     console.log("Node not found.");
// }

// const foundAnothaNode = list.search(5);

// if (foundAnothaNode) {
//     console.log("Found node:", foundAnothaNode.getValue());
// } else {
//     console.log("Node not found.");
// }