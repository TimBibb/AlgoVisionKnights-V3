const tab = "\u00A0\u00A0\u00A0\u00A0"

export const map = {
    binarysearch: [ //fixed parenthesis and closing bracket issues
        "binarySearch(arr, target) {",
        tab + "let recursiveSearch = function(arr, target, start, end) {",
        tab + tab + "if (start > end)",
        tab + tab + tab + "return false;",
        tab + tab + "let mid = ((start + end) / 2 );",
        tab + tab + "if (arr[mid] is equal to target)",
        tab + tab + tab + "return true;",
        tab + tab + "if (arr[mid] > target)", 
        tab + tab + tab + "return recursiveSearch(arr from start..mid-1);",
        tab + tab + "else",
        tab + tab + tab + "return recursiveSearch(arr from mid + 1..end);",
        tab + "}",
        "}"
    ],
    bubblesort: [ //changed for loop indentations
        "bubbleSort( arr, n) {",
        tab + "var i, j;",
        tab + "for (i = 0; i < n-1; i++) {",
        tab + tab + "for (j = 0; j < n-i-1; j++) {",
        tab + tab + tab + "if (arr[j] > arr[j+1])",
        tab + tab + tab + tab + "swap(arr,j,j+1);",
        tab + tab + "}", 
        tab + "}",
        "}"
    ],
    linearsearch: [ //done
        "linearSearch(arr, target) {",
        tab + "for (let i = 0; i < arr.length; i++) {",
        tab + tab + "if (arr[i] is equal to target)",
        tab + tab + tab + "return true;",
        tab + "}",
        "}"
    ],
    mergesort: [
        "merge(left, right) {",
        tab + "let arr = [];",
        tab + "while (left.length and right.length) {",
        tab + tab + "if (left[0] < right[0])",
        tab + tab + tab +  "arr.push(left.shift());", 
        tab + tab + "else",
        tab + tab + tab + "arr.push(right.shift());", 
        tab + "}",
        tab + "return [...arr, ...left, ...right];",
        "}",
        
        "sort(array) {",
        tab + "const half = array.length / 2;",
        tab + "if (array.length < 2)",
        tab + tab + "return array;", 
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
    bststructure: [
        "binarySearchTree(){",
        tab + "while(i < MAX_NODE){",
        tab + tab + "let temp = rand();",
        tab + tab + "if(!root)",
        tab + tab + tab + "root = temp;",
        tab + tab + "else {",
        tab + tab + tab + "let node = root;",
        tab + tab + tab + "while(true) {",
        tab + tab + tab + tab + "if(firstStep)",
        tab + tab + tab + tab + tab + "insert temp;",
        tab + tab + tab + tab + "if(temp < node.value){",
        tab + tab + tab + tab + tab + "if(node.left != null) traverse left;",
        tab + tab + tab + tab + tab + "else left node = temp;",
        tab + tab + tab + tab + "}",
        tab + tab + tab + tab + "else if(temp > node.value) {",
        tab + tab + tab + tab + tab + "if(node.right != null) traverse right;",
        tab + tab + tab + tab + tab + "else right node = temp;",
        tab + tab + tab + tab + "}",
        tab + tab + tab + tab + "else traverse forward;",
        tab + tab + tab + "}",
        tab + tab + "}",
        tab + "}",
        "}"
    ],
    heapsort: [
        "sort(arr) {",
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
        "heapify(arr, N, i) {",
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
        tab + "if (node == null)", 
        tab + tab + "return", 
        tab + "inOrder(node.left);", 
        tab + "print node.key;", 
        tab + "inOrder(node.right);", 
        "}" 
    ],
    insertionsort: [ //removed closing bracket highlights
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
        tab + "if (head == null) head = node;",
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
        tab + "if (current.next == null) current = null;",
        tab + "else { ",
        tab + tab + "while (current.next.next != null)", 
        tab + tab + tab + "current = current.next;",
        tab + "current.next = null;",
        tab + "}",
        "}"
    ],
    selectionsort: [ //added spacing in swap function call
       "selectionSort(arr,  n) {",
       tab + "let i, j, min_idx;",
       tab + "for (i = 0; i < n-1; i++) {",
       tab + tab + "min_idx = i;",
       tab + tab + "for (j = i + 1; j < n; j++) {",
       tab + tab + tab + "if (arr[j] < arr[min_idx])",
       tab + tab + tab + tab + "min_idx = j;",
       tab + tab + "}",
       tab + tab + "swap(arr, min_idx, i);",
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
        tab + tab + "Hash Table Full!",
        tab + "for(i = 0; i < tableLength; i++) {",
        tab + tab + "if (info.deleted[index] && firstDeleted == -1) ",
        tab + tab + tab + "firstDeleted = index;",
        tab + tab + "if (info.table[index] == value) ",
        tab + tab + tab + "Skip to Prevent Reinsertion!",
        tab + tab + "if (info.table[index] == null) ",
        tab + tab + tab + "if(firstDeleted == -1) ",
        tab + tab + tab + tab + "Insert Value!",
        tab + tab + "if (info.deleted[index]) ",
        tab + tab + tab + "Already Deleted! Move Forward",
        tab + tab + "else ",
        tab + tab + tab + "Occupied! Move Forward",
        tab + "}",
        "}",
        "deletion(x)",
        tab + "for(i = 0; i < tableLength; i++){",
        tab + tab + "if(deleted[index])",
        tab + tab + tab + "Already Deleted!",
        tab + tab + "if(table[index] == x)",
        tab + tab + tab + "Value Found! Marked as Deleted",
        tab + tab + "if(table[index] == null)",
        tab + tab + tab + "break;",
        tab + "}",
        "}",
        "search(x)",
        tab + "for(i = 0; i < tableLength; i++){",
        tab + tab + "if(deleted[index])",
        tab + tab + tab + "Ignore Value!",
        tab + tab + "if(table[index] == x)",
        tab + tab + tab + "Found Value!",
        tab + tab + "if(table[index] == null)",
        tab + tab + tab + "break;",
        tab + "}",
        "}"
    ],

    hashtablequadratic: [
        "insertion(x)",
        tab + "for(i = 0; i < tableLength; i++){",
        tab + tab + "if(deleted[index] && firstDeleted == -1)",
        tab + tab + tab + "Found First Deleted Index!",
        tab + tab + "if(table[index] == x)",
        tab + tab + tab + "Skip to Prevent Reinsertion!",
        tab + tab + "if(table[index] == null)",
        tab + tab + tab + "Insert x;",
        tab + "}",
        "deletion(x)",
        tab + "for(i = 0; i < tableLength; i++){",
        tab + tab + "if(deleted[index])",
        tab + tab + tab + "Value Already Deleted!",
        tab + tab + "if(table[index] == x)",
        tab + tab + tab + "Value Found! Marked as Deleted",
        tab + tab + "if(table[index] == null)",
        tab + tab + tab + "break;",
        tab + "}",
        "search(x)",
        tab + "for(i = 0; i < tableLength; i++){",
        tab + tab + "if(deleted[index])",
        tab + tab + tab + "Ignore",
        tab + tab + "if(table[index] == x)",
        tab + tab + tab + "Value Found!",
        tab + tab + "if(table[index] == null)",
        tab + tab + tab + "break;",
        tab + "}",
        "}"
    ],

    dijkstras: [ //fixed tabbing and added closing bracket
        "dijkstras(graph, first) {",
        tab + "minQueue = [(first, 0)];",
        tab + "visitedNum = 0;",
        tab + "while(minQueue.length != 0 && visitedNum != numOfNodes){ ",
        tab + tab + "if(head[0] != first)",
        tab + tab + tab + "head[0] is the Unvisited Neighbor",
        tab + tab + "head = head[0];",
        tab + tab + "for(i = 0; i < adjaceny of head[0]; i++){",
        tab + tab + tab + "temp = head[0][i][1];",
        tab + tab + tab + "weight = head[0][i][2];",
        tab + tab + tab + "edge = head[0][i][3];",
        tab + tab + tab + "if(graph.distances[temp] == -1){",
        tab + tab + tab + tab + "parent = head[0];",
        tab + tab + tab + "else if(graph.distances[head[0]] + weight < graph.distances[temp])",
        tab + tab + tab + tab + "parent = head[0]",
        tab + tab + tab + "else",
        tab + tab + tab + tab + "Same Distance! No Parent Change Required!",
        tab + tab + "Finished with New head[0] Node",
        tab + "}",
        "}"
    ],

    bellmanford: [ //done
        "bellmanford(graph) {",
        tab + "for(iterations = 0; iterations < numberOfNodes - 1; iterations++) {",
        tab + tab + "for(edge = 0; edge < numberOfEdges; edge++) {",
        tab + tab + tab + "if(distance[node1] == -1)",
        tab + tab + tab + tab + "Cannot Update",
        tab + tab + tab + "else {",
        tab + tab + tab + tab + "if(distance1 != -1) {",
        tab + tab + tab + tab + tab + "Update Distance at Parent Node",
        tab + tab + tab + tab +"else {",
        tab + tab + tab + tab + tab + "Do Not Update Parent Node",
        tab + "}",
        "}"
    ],

    breadthfirst: [ //added closing brackets for all loops
       "breadthfirst(graph, queue) {", //0
        tab + "var temp = randInRange(0, graph.numberofNodes);", //1
        tab + "nodeLevel[temp] = 0;", //2
        tab + "let currNode, adjNode, edgeId;", //3
        tab + "for(var i = 0; i < graph.numberOfNodes; ++i) {", //4
        tab + tab + "for(const edge of graph.adjacencyList[temp]) {", //5
        tab + tab + tab + "[currNode, adjNode, edgeId] = edge;", //6
        tab + tab + tab + "if(currentNode[currNode] == false)", //7
        tab + tab + tab + tab + "currentNode[currNode] = true;", //8
        tab + tab + tab + "if(!(nodeQueue.includes(currNode)))", //9
        tab + tab + tab + tab + "nodeQueue.push(currNode);", //10
        tab + tab + tab + "if(!(nodeVisited[adjNode]) && nodeLevel[adjNode] == 0)",
        tab + tab + tab + tab + "nodeLevel[adjNode] = nodeLevel[currNode] + 1;",
        tab + tab + tab + "if(!(nodeVisited[adjNode])) {",
        tab + tab + tab + tab + "if(edgeSelected[adjNode] == false) {", //14
        tab + tab + tab + tab + tab + "currNode Shares Edge with adjNode!",
        tab + tab + tab + tab + tab + "if(!(nodeQueue.includes(adjNode)))",
        tab + tab + tab + tab + tab + tab + "nodeQueue.push(adjNode);",
        tab + tab + tab + tab + "else nodeVisited[currNode] = true;", //18
        tab + tab + tab + "else currNode Shares Edge with adjNode!",
        tab + tab + "}",
        tab + "}",
        "}"
    ],

    depthfirst: [ //done
        "depthFirstSearch(graph, stack){",
        tab + "nodeStack = []",
        tab + "edgeStack = []",
        tab + "let head = randInRange(0, 6)",
        tab + "current location is node[head]",
        tab + "for(let node = 0; node < graph.adjacencyList[head].length; node++){",
        tab + tab + "if(nodeVisited = false)",
        tab + tab + tab + "add graph.adjacenyList[head][node][1] to stack",
        tab + "}",
        tab + "while(nodeStack.length != 0){",
        tab + tab + "s = nodeStack.pop()",
        tab + tab + "if(nodeVisited = false)",
        tab + tab + tab + "travel to new node, mark prev as visited",
        tab + tab + "else",
        tab + tab + tab + "node already visited",
        tab + tab + tab + "travel back to parent node",
        tab + tab + tab + "add ajacent unvisited to stack",
        tab + tab + "for(let node = 0; node < graph.adjacencyList[head].length; node++){",
        tab + tab + tab + "if(nodeVisited = false)",
        tab + tab + tab + tab + "add graph.adjacenyList[head][node][1] to stack",
        tab + tab + "}",
        tab + "}",
        "}"
    ],

    //to edit
    prims: [
        "prims(graph, vertex, vertices){ ",
        tab + "for (edge of graph.adjacencyList[0]){ ",
        tab + tab + "let [node1, node2, weight, edgeID] = edge;",
        tab + tab + "queue.push(edgeID);",
        tab + "}",
        tab + "for (i = 0; tempArray.length > 0 && i < 50; i++) {",
        tab + tab + "Calculate Lowest Weighted Edge",
        tab + tab + "if (nodeVisited[node1] && nodeVisited[node2])",
        tab + tab + tab + "Edge Already Added! Ignore",
        tab + tab + "for (edge of graph.adjacencyList[nodeUnvisited]) {",
        tab + tab + tab + "queue.push(edgeID);",
        tab + tab + "}",
        tab + "}",
        tab + "var holdEdges;",
        tab + "for (i = 0; i < graph.numberofEdges; i++) {",
        tab + tab + "if(edgeSelected[i]) holdEdges = graph.edges[i][0] + graph.edges[i][1];",
        tab + "All Edges Found!",
        "}",
        ""
    ],

    heaps: [
        //heapify
        "heapify(arr, x){",
        tab + "i = x - 1;",
        tab + "while(i > 0)",
        tab + tab + "swap arr[0] and arr[i];",
        tab + tab + "arr[i - 1];",
        tab + tab + "i--;",
        "}"
    ],

    nqueens: [
        "nqueens(board, col, row, n){",
        tab + "solveNQueens(board, col){",
        tab + tab + "if(col >= n)",
        tab + tab + tab + "nQueens Solution Found!",
        tab + tab + "for(i = 0; i < n; i++){",
        tab + tab + tab + "if(i + 1 != n)",
        tab + tab + tab + tab + "Move to Next Available Space!",
        tab + tab + tab + "else",
        tab + tab + tab + tab + "Backtracking!",
        tab + tab + "}",
        tab + "}",
        tab + "queenSafe(board, row, col, n){",
        tab + tab + "for(i = 0; i < col; i++){",
        tab + tab + tab + "if(board[row][i] == 1)",
        tab + tab + tab + tab + "Identify Queen in Range!",
        tab + tab + "}",
        tab + tab + "for(i = row, j = col; i >= 0 && j >= 0; i--, j--)",
        tab + tab + tab + "if(board[i][j] == 1)",
        tab + tab + tab + tab + "Identify Queen in Range!",
        tab + tab + "}",
        tab + tab + "for(i = row, j = col; i < n && j >= 0; i++, j--)",
        tab + tab + tab + "if(board[i][j] == 1)",
        tab + tab + tab + tab + "Identify Queen in Range!",
        tab + tab + "}",
        tab + tab + "No Queens in Range!",
        tab + "}",
        "}"
    ],

    fibonacci: [ //done
        "fib(n){",
        tab + "if(n <= 1) return n;",
        tab + "return fib(n - 1) + fib(n - 2);",
        "}"
    ],

    hanoi: [
        "hanoi(n, from, to, aux){",
        tab + "if(n == 0) return;",
        tab + "if(n > 1) Move n - 1 Disks to Aux",
        tab + "hanoi(n - 1, from, aux, to);",
        tab + "hanoi(n - 1, aux, to, from);",
        "}"
    ]
}