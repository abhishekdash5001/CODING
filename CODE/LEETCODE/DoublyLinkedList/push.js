class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
      this.prev = null;
    }
  }
  
  class DoublyLinkedList {
    constructor(value) {
      const newNode = new Node(value);
      this.head = newNode;
      this.tail = this.head;
      this.length = 1;
    }

    push(a){
        
        const newNode =  new Node(a);

        if(!this.head){
            this.head = newNode;
            this.tail = newNode
        }else{
            this.tail.next  = newNode;
            newNode.prev = this.tail;
            this.tail= newNode
        }
       

        this.length++
        return this
    }
  }
  
  let a  = new DoublyLinkedList(23)
  a.push(24)
  console.log(a)