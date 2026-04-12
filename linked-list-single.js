class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}
 
class LinkedList {
    constructor(value) {
        const newNode = new Node(value);
        this.head = newNode;
        this.tail = this.head;
        this.length = 1;
    }
    
    push(value){
        const newNode = new Node(value);
        console.log(this.head)
        if(this.head == null){
            
            this.head = newNode;
            this.tail = newNode;
        }else{
            let node = this.head
            while(node.next){
                
                node = node.next
            }
            node.next = newNode;
            this.tail = newNode
        }
        
        this.length++
    }
   

}
 

let linkedList = new LinkedList(1)
console.log(linkedList)
linkedList.push(2)
console.log(linkedList)



/*
    EXPECTED OUTPUT:
    ----------------
    Head: 1
    Tail: 2
    Length: 2

    Linked List:
    1
    2

*/