class Node {
  constructor(v = 0) {
    this.value = v;
    this.prev = null;
    this.next = null;
  }
}

class Queue {
  constructor(n) {
    let prevNode = null;

    this.head = null;
    this.tail = null;
    this.size = 0;

    for (let i = 0; i < n; i++) {
      const newNode = new Node(i + 1);
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        prevNode.next = newNode;
        newNode.prev = prevNode;
        this.tail = newNode;
      }
      prevNode = newNode;
      this.size++;
    }
  }

  pop = () => {
    const nextNode = this.head.next;

    if (nextNode !== null) nextNode.prev = null;
    else this.tail = null;
    this.head = nextNode;
    this.size--;
  };

  push = (value) => {
    const newNode = new Node(value);
    const lastNode = this.tail;

    if (this.tail !== null) lastNode.next = newNode;
    else this.head = newNode;
    newNode.prev = lastNode;
    this.tail = newNode;
    this.size++;
  };

  front = () => this.head.value;
}
