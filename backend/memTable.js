

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
