class Tree {
  constructor() {
    this.root = null;
  }

  addNode(node) {
    if (!this.root) {
      this.root = node;
    } else {
      this._insert(this.root, node);
    }
  }

  // The _ signals it's an internal helper function
  _insert(current, node) {
    if (node.data < current.data) {
      if (!current.left) {
        current.left = node;
      } else {
        this._insert(current.left, node);   // recursive call inside Tree
      }
    } else {
      if (!current.right) {
        current.right = node;
      } else {
        this._insert(current.right, node);  // recursive call inside Tree
      }
    }
  }

  hasNode(number){
    return this._search(this.root, number)
  }

  _search(current, number){
    if (!current) return false;
    if (current.data == number) return true;
    if (number < current.data) this._search(current.left, number);
    else this._search(current.right, number)
  }


}

module.exports = Tree;