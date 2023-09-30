class Node {
  constructor(v) {
    this.value = v;
    this.prev = null;
    this.next = null;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push_back = (v) => {
    const newNode = new Node(v);
    if (!this.size) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.size++;
  };

  push_front = (v) => {
    const newNode = new Node(v);
    if (!this.size) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
  };

  pop_front = () => {
    let ret;
    if (!this.size) return null;
    else if (this.size === 1) {
      ret = this.head;
      this.head = null;
      this.tail = null;
    } else {
      let next = this.head.next;
      ret = this.head;
      ret.next = null;
      next.prev = null;
      this.head = next;
    }
    this.size--;
    return ret.value;
  };

  pop_back = () => {
    let ret;
    if (!this.size) return null;
    else if (this.size === 1) {
      ret = this.head;
      this.head = null;
      this.tail = null;
    } else {
      let prev = this.tail.prev;
      ret = this.tail;
      ret.prev = null;
      prev.next = null;
      this.tail = prev;
    }
    this.size--;
    return ret.value;
  };

  print = () => {
    let curr = this.head;
    const lst = [];
    for (let i = 0; i < this.size; i++) {
      lst.push(curr.value);
      curr = curr.next;
    }
    console.log("[ " + lst.join(", ") + " ]");
  };
}

module.exports = Deque;
