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

        var negNode = new ListNode("negBound", -1);

        this.head = negNode;

        for(let i = 1; i < this.maxLayers; i++){

            let nextNegNode = new ListNode("negBound", -1);
            negNode.down = nextNegNode;
            negNode = nextNegNode;

        }
    }

    // Finds where the node needs to be inserted to keep ordering
    findInsertLocation(node){
        var tmp = this.head;
        var tmpNext = null;
        var tmpPrev = null;
        if(tmp.next != null){
            tmpNext = tmp.next;
        }else{
            return tmp;
        }
        while(node.getValue() > tmp.next.getValue()){
            if(tmpNext.next == null){
                tmp = tmpNext;
                break;
            }else{
                tmpNext = tmpNext.next;
                tmp = tmp.next;
            }
        }
        return tmp;
    }

    findNodesBefore(node){




    }

    // Inserts the node into the memtable
    insertNode(node){

        if(this.head == null){
            this.head = node;
        /**
        }else if(node.getValue() < this.head.getValue()){
            node.next = this.head
            this.head = node;
        */
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
    }

    // Saves the memtable to an sstable
    writeMemTableToSSTable() {
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
        
    }

    // TESTING PURPOSES, to see what is in our memtable
    printList(){
        var tmp = this.head;
        console.log(tmp);
        while(tmp.next != null){
            tmp = tmp.next;
            console.log(tmp);
        }
    }

    printLayers(){
        var layerString = "\n";
        var node = this.head
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


var list = new MemTable();

list.printLayers();


/**
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


var node7 = new ListNode("value7", 7);
console.log("Adding node7")
list.insertNode(node7);


var node8 = new ListNode("value8", 8);
console.log("Adding node8")
list.insertNode(node8);

console.log();

list.printList();

*/


