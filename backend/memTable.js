/**
 * @author Dylan Miller & Isaiah Hermance
 * @version October 2023
 * @class Basic implementation of a single layer skip list memtable
 */

const fs = require('fs'); // Import the 'fs' module
const SSTable = require('./ssTable'); // Import the SSTable module

class SkipList{
    constructor(head = null){
        this.head = head;
        this.memTableSize = 0; //Size of the list
    }


    findInsertLocation(node){
        var tmp = this.head;
        var tmpNext = null;
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

    insertNode(node){
        if(this.head == null){
            this.head = node;
        }else if(node.getValue() < this.head.getValue()){
            node.next = this.head
            this.head = node;
        }else{
            var tmp = this.findInsertLocation(node);
            node.next = tmp.next;
            tmp.next = node;
        }

        this.memTableSize++ //

        if(this.memTableSize > 3) { //
            this.writeMemTableToSSTable(sstable);
            this.memTableSize = 0;
        }
        
    }

    writeMemTableToSSTable(sstable) { //
        const dataToWrite = [];
    
        let currentNode = this.head;
        while (currentNode) {
            dataToWrite.push([currentNode.key, currentNode.getValue()]);
            currentNode = currentNode.next;
        }
    
        // Serialize the data and write it to the SSTable
        sstable.insertBulk(dataToWrite);
    
        // Clear the memTable by resetting the head to null
        this.head = null;
    }

    printList(){
        var tmp = this.head;
        console.log(tmp);
        while(tmp.next != null){
            tmp = tmp.next;
            console.log(tmp);
        }
    }
}

class ListNode{
    constructor(key, value){
        this.key = key;
        this.data = new Map();
        this.data.set(key, value);
        this.next = null;
    }

    setNext(nextNode){
        this.next = nextNode;
    }

    getNext(){
        return this.next;
    }

    getValue(){
        return this.data.get(this.key);
    }
}

const sstable = new SSTable('my_sstable.txt');

var list = new SkipList();
var node0 = new ListNode("value0", 0);
list.insertNode(node0);
console.log("Added node0")

var node1 = new ListNode("value1", 1);
list.insertNode(node1);
console.log("Added node1")

var node2 = new ListNode("value2", 2);
list.insertNode(node2);
console.log("Added node2")

var node3 = new ListNode("value3", 3);
list.insertNode(node3);
console.log("Added node3")

var node4 = new ListNode("value4", 4);
list.insertNode(node4);

var node5 = new ListNode("value5", 5);
list.insertNode(node5);

var node6 = new ListNode("value6", 6);
list.insertNode(node6);

var node7 = new ListNode("value7", 7);
list.insertNode(node7);

var node8 = new ListNode("value8", 8);
list.insertNode(node8);

list.printList();
