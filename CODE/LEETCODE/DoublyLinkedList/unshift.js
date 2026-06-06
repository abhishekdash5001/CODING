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
  
    push(a) {
      const newNode = new Node(a);
  
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
  
      this.length++;
      return this;
    }
  
    pop() {
      if (!this.head) {
        return;
      }
      if (this.length === 1) {
        let poped = this.head;
        this.head = null;
        this.tail = null;
  
        this.length--;
        return poped;
      }
      let removedNode = this.tail;
  
      let prevNode = this.tail.prev;
  
      this.tail = prevNode;
      this.tail.next = null;
      removedNode.prev = null;
  
      this.length--;
      return removedNode;
    }


    unshift(val){
    
       const newNode = new Node(val)
       if(this.length === 0){
        this.head = newNode;
        this.tail = newNode
       }else{
        newNode.next = this.head
        this.head.prev = newNode;
        this.head = newNode
       }


      

        this.length++

        return this
    }
  }
  
  let a = new DoublyLinkedList(1);
  a.push(2);
  a.push(3);
  a.unshift(-1)

  console.log(a)
  
  
