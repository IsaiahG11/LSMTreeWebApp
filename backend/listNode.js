// Simple list node class that represents the memtable
class ListNode{
    constructor(key, value){
        this.key = key;
        this.data = new Map();
        this.data.set(key, value);
        this.next = null;
        this.down = null;
        this.prev = null;
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

module.exports = ListNode; // Export the ListNode class
