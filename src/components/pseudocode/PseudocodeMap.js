const tab = "\u00A0\u00A0\u00A0\u00A0"

export const map = {
    binarysearch: [ //done
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
    bubblesort: [ //done
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
    linearsearch: [ //done
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
    postorder: [ //done
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
    inorder: [ //done
        "inOrder(node) {", //0
        tab + "if (node is equal to null)", //1
        tab + tab + "return", //2
        tab + "inOrder(node.left);", //3
        tab + "print node.key;", //4
        tab + "inOrder(node.right);", //5
        "}" //6
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
    ],

    hashtable: [
        "insertion(value) {",
        tab + "if (info == tableLength) ",
        tab + tab + "hash table is full",
        tab + "for(i = 0; i < tableLength; i++) {",
        tab + tab + "if (info.deleted[index] && firstDeleted == -1) ",
        tab + tab + tab + "firstDeleted = index;",
        tab + tab + "if (info.table[index] == value) ",
        tab + tab + tab + "skip reinsertion",
        tab + tab + "if (info.table[index] == null) ",
        tab + tab + tab + "if(firstDeleted == -1) ",
        tab + tab + tab + tab + "insert value here",
        tab + tab + "if (info.deleted[index]) ",
        tab + tab + tab + "deleted - move to next location",
        tab + tab + "else ",
        tab + tab + tab + " occupied - move to next location",
        tab + "}",
        "}"
    ],

    hashtablequadratic: [

    ],

    dijkstras: [
        "dijkstras(graph, first)",
        tab + "while(length && number != numberOfNodes) ",
    ],

    bellmanford: [
        "bellmanford(graph) {",
        tab + "for(iterations = 0; iterations < numberOfNodes - 1; iterations++) {",
        tab + tab + "for(edge = 0; edge < numberOfEdges; edge++) {",
        tab + tab + tab + "if(distance[node1] == -1)",
        tab + tab + tab + tab + "cannot update",
        tab + tab + tab + "else {",
        tab + tab + tab + tab + "if(distance1 != -1) {",
        tab + tab + tab + tab + tab + "update distance at parent node",
        tab + tab + tab + tab +"else {",
        tab + tab + tab + tab + tab + "do not update parent node",
        tab + "}",
        "}"
    ],

    breadthfirst: [
        "breadthfirst(graph, queue) {",
        tab + "for(i = 0; i < numOfNodes; ++i) {",
        tab + tab + "if(currentNode[node] == false) {",
        tab + tab + tab + "current node = node",
        tab + tab + "while(queue != empty) {",
        tab + tab + tab + "temp = queue.dequeue()",
        tab + tab + tab + "for(nodeNeighbor of temp in graph) {",
        tab + tab + tab + tab + "if(nodeNeighbor not used) {",
        tab + tab + tab + tab + tab + "enqueue nodeNeighbor, nodeNeighbor = visited",
        "}"
    ],

    //to edit
    prims: [
        "prims(graph, vertex, vertices){ ",
        tab + "temp = 0;",
        tab + "vertex = { 1 };",
        tab + "while (vertex != vertices) {",
        tab + tab + "let (vertex, vertices)",
        tab + tab + "temp = temp vertex {(vertex, vertices)}",
        tab + tab + "vertex = vertex vertex {(vertices)}",
        "}"
    ],

    //to edit
    heaps: [
        //heapify
        "heapify(arr, x){",
        tab + "i = x - 1",
        tab + "while(i > 0)",
        tab + tab + "swap arr[0] and arr[i]",
        tab + tab + "move down the array by 1",
        tab + tab + "decrease i by 1",
        "}"
    ]
}