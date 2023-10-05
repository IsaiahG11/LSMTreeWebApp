

class SkipList{
    constructor(head = null){
        this.head = head;
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

var list = new SkipList();
var node0 = new ListNode("value0", 324);
list.insertNode(node0);
console.log("Added node0")

var node1 = new ListNode("value1", 400);
list.insertNode(node1);
console.log("Added node1")

var node2 = new ListNode("value2", 123);
list.insertNode(node2);
console.log("Added node2")

var node3 = new ListNode("value3", 7);
list.insertNode(node3);
console.log("Added node3")

var node4 = new ListNode("value4", 1);
list.insertNode(node4);


list.printList();
