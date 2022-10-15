const tab = "\u00A0\u00A0\u00A0\u00A0"

export const map = {
    binarysearch: [
        "binarySearch(arr, target, start, end) {",
        tab + "if (start > end)",
        tab + tab + "return false",
        tab + "let mid = (start + end) / 2 );",
        tab + "if (arr[mid] === target)",
        tab + tab + "return mid",
        tab + "if (arr[mid] > target)", 
        tab + tab + "return binarySearch(arr from start..mid-1);",
        tab + "else",
        tab + tab + "return binarySearch(arr from mid + 1..end);",
        "}"
    ],
    linearsearch: [
        "linearSearch(arr, target) {",
        tab + "for (let i = 0; i < arr.length; i++) {",
        tab + tab + "if (arr[i] === target) return true",
        tab + "}",
        "}"
    ],
    mergesort: [
        "function merge(left, right) {",
        tab + "let arr = []",
        tab + "while (left.length && right.length) {",
        tab + tab + "if (left[0] < right[0]) arr.push(left.shift());", 
        tab + tab + "else arr.push(right.shift())", 
        tab + "}",
        tab + "return [...arr, ...left, ...right]",
        "}",
        
        "function sort(array) {",
        tab + "const half = array.length / 2",
        tab + "if (array.length < 2) return array;", 
        tab + "const left = array.splice(0, half);",
        tab + "return merge(sort(left), sort(array))",   
        "}"
    ],
    bstinsertion: [
        "add(root, element) {",
        tab + "if (root == null) {",
        tab + tab + "root = new Node(element);",
        tab + tab + "return root;",
        tab + "}",

        tab + "if (element < root.element) root.left = add(root.left, element);",
        tab + "else if (element > root.element) root.right = add(root.right, element);",
        tab + "return root;",
        "}"
    ],
    bststructure: [],
    postorder: [
        "postOrder(node) {",
        tab + "if (node == null) return;",
        tab + "postOrder(node.left);",
        tab + "postOrder(node.right);",
        tab + "print node.key;",
        "}"
    ],
    preorder: [
        "preOrder(node) {",
        tab + "if (node == null) return;",
        tab + "print node.key;",
        tab + "preOrder(node.left);",
        tab + "preOrder(node.right);",
        "}"
    ],
    inorder: [
        "inOrder(node) {",
        tab + "if (node == null) return;",
        tab + "inOrder(node.left);",
        tab + "print node.key;",
        tab + "inOrder(node.right);",
        "}"
    ],
    singlylinkedlist: [
        "insert(element) {",
        tab + "let node = new Node(element);",
        tab + "if (head === null)",
        tab + tab + "head = node;",
        tab + "else {",
        tab + tab + "let current = head;",
        tab + tab + "while (current.next)",
        tab + tab + tab + "current = current.next;",
        tab + tab + "current.next = node;",
        tab + "}",
        tab + "size++;",
        "}",

        "removeTail() {",
        tab + "let current = head;",
        tab + "if (current.next === null)",
        tab + tab + "current = null;",
        tab + "else { ",
        tab + tab + "while (current.next != null)", 
        tab + tab + tab + "current = current.next;",
        tab + tab + "current.next = null;",
        tab + "}",
        "}"
    ]
}