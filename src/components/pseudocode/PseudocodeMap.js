const tab = "\u00A0\u00A0\u00A0\u00A0"

export const map = {
    binarysearch: [
        "binarySearch(arr, target) {",
        tab + "let recursiveSearch = function(arr, target, start, end) {",
        tab + tab + "if (start > end)",
        tab + tab + tab + "return false",
        tab + tab + "let mid = (start + end) / 2 );",
        tab + tab + "if (arr[mid] is equal to target)",
        tab + tab + tab + "return true",
        tab + tab + "if (arr[mid] > target)", 
        tab + tab + tab + "return recursiveSearch(arr from start..mid-1);",
        tab + tab + "else",
        tab + tab + tab + "return recursiveSearch(arr from mid + 1..end);",
        tab + "}"
    ],
    bubblesort: [
        "bubbleSort( arr, n) {",
        tab + "var i, j;",
        tab + "for (i = 0; i < n-1; i++) {",
        tab + tab + tab + "for (j = 0; j < n-i-1; j++) {",
        tab + tab + tab + tab + "if (arr[j] > arr[j+1])",
        tab + tab + tab + tab + tab + "swap(arr,j,j+1);",
        tab + tab + tab + "}", 
        tab + "}",
        "}"
    ],
    linearsearch: [
        "linearSearch(arr, target) {",
        tab + "for (let i = 0; i < arr.length; i++) {",
        tab + tab + "if (arr[i] is equal to target)",
        tab + tab + tab + "return true",
        tab + "}",
        "}"
    ],
    mergesort: [
        "merge(left, right) {",
        tab + "let arr = []",
        tab + "while (left.length and right.length) {",
        tab + tab + "if (left[0] < right[0]) arr.push(left.shift());", 
        tab + tab + "else arr.push(right.shift())", 
        tab + "}",
        tab + "return [...arr, ...left, ...right]",
        "}",
        
        "sort(array) {",
        tab + "const half = array.length / 2",
        tab + "if (array.length < 2) return array;", 
        tab + "const left = array.splice(0, half);",
        tab + "return merge(sort(left), sort(array))",   
        "}"
    ],
    bstinsertion: [
        "add(root, element) {",
        tab + "if (root is equal to null) {",
        tab + tab + "root = new Node(element);",
        tab + tab + "return root;",
        tab + "}",

        tab + "if (element < root.element) root.left = add(root.left, element);",
        tab + "else if (element > root.element) root.right = add(root.right, element);",
        tab + "return root;",
        "}"
    ],
    bststructure: [],
    heapsort: [
        "function sort(arr) {",
        tab + "var N = arr.length;",
        // Build heap (rearrange array)
        tab + "for (var i = Math.floor(N / 2) - 1; i >= 0; i--)",
        tab + tab + "heapify(arr, N, i);",
        // One by one extract an element from heap
        tab + "for (var i = N - 1; i > 0; i--) {",
            // Move current root to end
        tab + tab + "var temp = arr[0];",
        tab + tab + "arr[0] = arr[i];",
        tab + tab + "arr[i] = temp;",
            // call max heapify on the reduced heap
        tab + tab + "heapify(arr, i, 0);",
        tab + "}",
        "}",
 
        // To heapify a subtree rooted with node i which is
        // an index in arr[]. n is size of heap
        "function heapify(arr, N, i) {",
        tab + "var largest = i;", // Initialize largest as root
        tab + "var l = 2 * i + 1;", // left = 2*i + 1
        tab + "var r = 2 * i + 2;", // right = 2*i + 2
 
        // If left child is larger than root
        tab + "if (l < N && arr[l] > arr[largest])",
        tab + tab + "largest = l;",
 
        // If right child is larger than largest so far
        tab + "if (r < N && arr[r] > arr[largest])",
        tab + tab + "largest = r;",
 
        // If largest is not root
        tab + "if (largest != i) {",
        tab + tab + "var swap = arr[i];",
        tab + tab + "arr[i] = arr[largest];",
        tab + tab + "arr[largest] = swap;",
            // Recursively heapify the affected sub-tree
        tab + tab + "heapify(arr, N, largest);",
        tab + "}",
        "}"
    ],
    postorder: [
        "postOrder(node) {",
        tab + "if (node is equal to null) return;",
        tab + "postOrder(node.left);",
        tab + "postOrder(node.right);",
        tab + "print node.key;",
        "}"
    ],
    preorder: [
        "preOrder(node) {",
        tab + "if (node is equal to null) return;",
        tab + "print node.key;",
        tab + "preOrder(node.left);",
        tab + "preOrder(node.right);",
        "}"
    ],
    inorder: [
        "inOrder(node) {",
        tab + "if (node is equal to null) return;",
        tab + "inOrder(node.left);",
        tab + "print node.key;",
        tab + "inOrder(node.right);",
        "}"
    ],
    insertionsort: [
        "insertionSort(arr, n) {",
        tab + "let i, key, j;", 
        tab + "for (i = 1; i < n; i++) {", 
        tab + tab + "key = arr[i];", 
        tab + tab + "j = i - 1;", 
        tab + tab + "while (j >= 0 and arr[j] > key) {", 
        tab + tab + tab + "arr[j + 1] = arr[j];", 
        tab + tab + tab + "j = j - 1;", 
        tab + tab + "}", 
        tab + tab + "arr[j + 1] = key;", 
        tab + "}", 
        "}" 
    ],
    singlylinkedlist: [
        "insert(element) {",
        tab + "let node = new Node(element);",
        tab + "if (head is equal to null) head = node;",
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
        tab + "if (current.next is equal to null) current = null;",
        tab + "else { ",
        tab + tab + "while (current.next.next != null)", 
        tab + tab + tab + "current = current.next;",
        tab + "current.next = null;",
        tab + "}",
        "}"
    ],
    selectionsort: [
       "selectionSort(arr,  n) {",
       tab + "let i, j, min_idx;",
       tab + "for (i = 0; i < n-1; i++) {",
       tab + tab + "min_idx = i;",
       tab + tab + "for (j = i + 1; j < n; j++) {",
       tab + tab + tab + "if (arr[j] < arr[min_idx])",
       tab + tab + tab + tab + "min_idx = j;",
       tab + tab + "}",
       tab + tab + "swap(arr,min_idx, i);",
       tab + "}",
       "}"
    ],
    
    quicksort: [
        "quickSort(arr, low, high) {",
        tab + "if (low < high) {", 
        tab + tab + "let pi = partition(arr, low, high);",
        tab + tab + "quickSort(arr, low, pi - 1);",
        tab + tab + "quickSort(arr, pi + 1, high);",
        tab + "}",
        '}',
        "partition(arr, low, high) {",
            tab + "let pivot = arr[high];",
            tab + "let i = (low - 1);",
            tab + "for (let j = low; j <= high - 1; j++) {",
            tab + tab + "if (arr[j] < pivot) {",
            tab + tab + tab + "i++;",
            tab + tab + tab + "swap(arr, i, j);",
            tab + tab + "}",
            tab + "}",
            tab + "swap(arr, i + 1, high);",
            tab + "return (i + 1);",
        "}"
    ]
}