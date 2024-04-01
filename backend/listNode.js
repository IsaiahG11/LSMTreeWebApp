// Simple list node class that represents the memtable
class ListNode{
    constructor(key, value){
        this.key = key;
        this.data = new Map();
        this.data.set(key, value);
        this.next = null;
        this.prev = null;
        this.down = null;
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

    copyNode() {
        let tmpNode = new ListNode(this.key, this.data.get(this.key));
        tmpNode.next = this.next;
        tmpNode.prev = this.prev;
        tmpNode.down = this.down;
    
        return tmpNode;
    }
}

module.exports = ListNode; // Export the ListNode class
