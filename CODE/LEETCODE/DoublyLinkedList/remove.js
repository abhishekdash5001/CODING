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
  
    unshift(val) {
      const newNode = new Node(val);
      if (this.length === 0) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
  
      this.length++;
  
      return this;
    }
  
    shift() {
      if (this.length === 0) {
        return;
      }
  
      let temp = this.head;
  
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = temp.next;
  
        temp.prev = null;
        temp.next = null;
        this.head.prev = null;
      }
  
      this.length--;
      return temp;
    }
  
  
    get(index) {
  
      if(index<0 || index > this.length-1){
        return
      }
        let temp  = this.head;
        let counter =0;
  
        while(counter < index){
            temp = temp.next;
            counter++
        }
  
  
        return temp
    }

    insert(index,value){
        if(index<0 || index >this.length){
            return undefined
        }
        else if(index ===0){
            this.unshift(value)
        }else if(index === this.length){
            this.push(value)
        }else{
            let newNode = new Node(value)
            let temp = this.head

            for(let i =1;i<index;i++){
   temp = temp.next
            }
            let  p = temp.next;
            temp.next = newNode;
            newNode.prev = temp;
            newNode.next = p;
            p.prev = newNode

            this.length++
        }


    }

    set(index,value){
        if(index<0 || index >=this.length){
            return undefined
        }
        let temp = this.head;
         for(let i =0;i<index;i++){
            temp = temp.next
         }
         temp.value = value
    }


    remove(index){
        if(index< 0 || index >= this.length){
            return 
        }

        else if(index === 0){
           return this.shift()
        }else if(index === this.length -1){
            return this.pop()
        }
        else{
            let temp = this.head;
            for(let i =0;i <index-1;i++){
             temp  = temp.next
            }
            let detach = temp.next
            let next = temp.next.next;
            temp.next = next;
            next.prev = temp;

            detach.next = null
            detach.prev = null
          

this.length--
return detach
        }
    }
   
  }
  
  
  
  let a = new DoublyLinkedList(1);
  a.push(2);
  a.push(3);
  a.unshift(-1);
 
  a.insert(1,56)
  a.set(1,57)

  console.log(a)