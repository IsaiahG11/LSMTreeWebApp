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
        this.memTableSize = 0; //
    }


    findInsertLocation(node){
        var tmp = this.head;
        var tmpNext = null;
        if(tmp.next != null){
            tmpNext = tmp.next;
        }else{
            return tmp;
        }
        while(node.data.value > tmp.next.data.value){
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
        }else if(node.data.value < this.head.data.value){
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
            dataToWrite.push([currentNode.data.key, currentNode.data.value]);
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
    constructor(data){
        this.data = data;
        this.next = null;
    }

    setNext(nextNode){
        this.next = nextNode;
    }

    getNext(){
        return this.next;
    }
}

class Data{
    constructor(key, value){
        this.key = key;
        this.value = value;
        this.data ={};
        this.data[this.key] = value;
    }
}

const sstable = new SSTable('my_sstable.txt');

var list = new SkipList();
var data0 = new Data("value0", 324)
var node0 = new ListNode(data0);
list.insertNode(node0);
console.log("Added node0")

var data1 = new Data("value1", 400);
var node1 = new ListNode(data1);
list.insertNode(node1);
console.log("Added node1")

var data2 = new Data("value2", 123);
var node2 = new ListNode(data2);
list.insertNode(node2);
console.log("Added node2")

var data3 = new Data("value3", 7);
var node3 = new ListNode(data3);
list.insertNode(node3);
console.log("Added node3")

var data4 = new Data("value4", 1);
var node4 = new ListNode(data4);
list.insertNode(node4);


list.printList();
