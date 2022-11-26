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
        tab + "}", //11
        "}" //12
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
        tab + tab + tab + tab + "}", //13
        tab + tab + tab + tab + "else if(temp > node.value) {",
        tab + tab + tab + tab + tab + "if(node.right != null) traverse right;",
        tab + tab + tab + tab + tab + "else right node = temp;",
        tab + tab + tab + tab + "}", //17
        tab + tab + tab + tab + "else traverse forward;",
        tab + tab + tab + "}", //19
        tab + tab + "}", //20
        tab + "}", //21
        "}" //22
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
        tab + tab + "}", //8 
        tab + tab + "arr[j + 1] = key;", 
        tab + "}", //10
        "}" //11 
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
        tab + "}", //8
        tab + "size++;",
        "}", //10
        "removeTail() {",
        tab + "let current = head;",
        tab + "if (current.next == null) current = null;",
        tab + "else { ",
        tab + tab + "while (current.next.next != null)", 
        tab + tab + tab + "current = current.next;",
        tab + "current.next = null;",
        tab + "}", //18
        "}" //19
    ],
    selectionsort: [ //added spacing in swap function call
       "selectionSort(arr,  n) {",
       tab + "let i, j, min_idx;",
       tab + "for (i = 0; i < n-1; i++) {",
       tab + tab + "min_idx = i;",
       tab + tab + "for (j = i + 1; j < n; j++) {",
       tab + tab + tab + "if (arr[j] < arr[min_idx])",
       tab + tab + tab + tab + "min_idx = j;",
       tab + tab + "}", //7
       tab + tab + "swap(arr, min_idx, i);",
       tab + "}", //9
       "}" //10
    ],
    
    quicksort: [
        "quickSort(arr, low, high) {",
        tab + "if (low < high) {", 
        tab + tab + "let pi = partition(arr, low, high);",
        tab + tab + "quickSort(arr, low, pi - 1);",
        tab + tab + "quickSort(arr, pi + 1, high);",
        tab + "}", //5
        '}', //6
        "partition(arr, low, high) {",
        tab + "let pivot = arr[high];",
        tab + "let i = (low - 1);",
        tab + "for (let j = low; j <= high - 1; j++) {",
        tab + tab + "if (arr[j] < pivot) {",
        tab + tab + tab + "i++;",
        tab + tab + tab + "swap(arr, i, j);",
        tab + tab + "}", //14
        tab + "}", //15
        tab + "swap(arr, i + 1, high);",
        tab + "return (i + 1);",
        "}" //18
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
        tab + "}", //15
        "}", //16
        "deletion(x) {",
        tab + "for(i = 0; i < tableLength; i++){",
        tab + tab + "if(deleted[index])",
        tab + tab + tab + "Already Deleted!",
        tab + tab + "if(table[index] == x)",
        tab + tab + tab + "Value Found! Marked as Deleted",
        tab + tab + "if(table[index] == null)",
        tab + tab + tab + "break;",
        tab + "}", //25
        "}", //26
        "search(x) {",
        tab + "for(i = 0; i < tableLength; i++){",
        tab + tab + "if(deleted[index])",
        tab + tab + tab + "Ignore Value!",
        tab + tab + "if(table[index] == x)",
        tab + tab + tab + "Found Value!",
        tab + tab + "if(table[index] == null)",
        tab + tab + tab + "break;",
        tab + "}", //35
        "}" //36
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
        tab + "}", //8
        "deletion(x)",
        tab + "for(i = 0; i < tableLength; i++){",
        tab + tab + "if(deleted[index])",
        tab + tab + tab + "Value Already Deleted!",
        tab + tab + "if(table[index] == x)",
        tab + tab + tab + "Value Found! Marked as Deleted",
        tab + tab + "if(table[index] == null)",
        tab + tab + tab + "break;",
        tab + "}", //17
        "search(x)",
        tab + "for(i = 0; i < tableLength; i++){",
        tab + tab + "if(deleted[index])",
        tab + tab + tab + "Ignore",
        tab + tab + "if(table[index] == x)",
        tab + tab + tab + "Value Found!",
        tab + tab + "if(table[index] == null)",
        tab + tab + tab + "break;",
        tab + "}", //26
        "}" //27
    ],
    hashtablelinkedlist: [
        "insert(num) {",
        tab + "let hash = num % tableLen;",
        tab + "if (hash < 0)",
        tab + tab + "hash += tableLen;",
        tab + "for (let i = 0; i < tableLen; i++) {",
        tab + tab + "let index = (hash + i) % tableLen;",
        tab + tab + "let current = table[index];",
        tab + tab + "if (current === null)",
        tab + tab + tab + "table[index] = new Node(num);",
        tab + tab + "else {",
        tab + tab + tab + "if (current.data === num)",
        tab + tab + tab + tab + "return;",
        tab + tab + tab + "while(current.next != null) {",
        tab + tab + tab + tab + "if (current.next.data === num)",
        tab + tab + tab + tab + tab +"return;",
        tab + tab + tab + tab + "current = current.next;",
        tab + tab + tab + "}",
        tab + tab + tab + "current.next = new Node(num);",
        tab + tab + "}",
        tab + "}",
        "}",
        "delete(num) {",
        tab + "let hash = num % tableLen;",
        tab + "if (hash < 0)",
        tab + tab + "hash += tableLen;",
        tab + "for (let i = 0; i < tableLen; i++) {",
        tab + tab + "let index = (hash + i) % tableLen;",
        tab + tab + "let current = table[index];",
        tab + tab + "if (current === null)",
        tab + tab + tab + "return;",
        tab + tab + "else {",
        tab + tab + tab + "if (current.data === num) {",
        tab + tab + tab + tab + "current = current.next;",
        tab + tab + tab + tab + "return;",
        tab + tab + tab + "}",
        tab + tab + tab + "while(current.next != null) {",
        tab + tab + tab + tab + "if (current.next.data === num) {",
        tab + tab + tab + tab + tab +"current.next = current.next.next;",
        tab + tab + tab + tab + tab +"return;",
        tab + tab + tab + tab + "}",
        tab + tab + tab + tab + "current = current.next;",
        tab + tab + tab + "}",
        tab + tab + "}",
        tab + "}",
        "}"

    ],

    dijkstras: [ //fixed tabbing and added closing bracket
        "dijkstras(graph, first) {",
        tab + "var minQueue = [(first, 0)];",
        tab + "var visitedNum = 0;",
        tab + "graph.distance[first] = 0;",
        tab + "while(minQueue.length != 0 && visitedNum != graph.numOfNodes) { ",
        tab + tab + "var head = minQueue.shift();",
        tab + tab + "if(graph.visited[head[0]] == true) {",
        tab + tab + tab + "continue;",
        tab + tab + "}",
        tab + tab + "if(head[0] != first) {",
        tab + tab + tab + "head[0] is the unvisited neighbor",
        tab + tab + "}",
        tab + tab + "for(var i = 0; i < graph.adjacencyList[head[0]].length; i++) {",
        tab + tab + tab + "var v = head[0][i][1];", //13
        tab + tab + tab + "var weight = head[0][i][2];",
        tab + tab + tab + "var edge = head[0][i][3];",
        tab + tab + tab + "if(graph.visited[v] == true) {", //16
        tab + tab + tab + tab + "continue;",
        tab + tab + tab + "}",
        tab + tab + tab + "if(graph.distances[v] == -1) {", //19
        tab + tab + tab + tab + "graph.parents[v] = head[0];",
        tab + tab + tab + tab + "graph.parentEdges[v] = edge;",
        tab + tab + tab + tab + "graph.distances[v] = graph.distances[head[0]] + weight;",
        tab + tab + tab + "}",
        tab + tab + tab + "else if(graph.distances[head[0]] + weight < graph.distances[v]) {",
        tab + tab + tab + tab + "graph.parents[v] = head[0];", //25
        tab + tab + tab + tab + "graph.parentEdges[v] = edge;",
        tab + tab + tab + tab + "graph.distances[v] = graph.distances[head[0]] + weight;",
        tab + tab + tab + "}",
        tab + tab + tab + "else {", //29
        tab + tab + tab + tab + "Same Distance! No Parent Change Required!",
        tab + tab + tab + "}",
        tab + tab + "}",
        tab + tab + "graph.visited[head[0]] = true;", //33
        tab + "}", //18
        "}" //19
    ],

    bellmanford: [ //done
        "bellmanFord(graph) {",
        tab + "for(let iterations = 0; iterations < graph.numberOfNodes - 1; iterations++) {",
        tab + tab + "for(let edgeId = 0; edgeId < graph.numberOfEdges; edgeId++) {",
        tab + tab + tab + "let [node1, node2, weight, _edgeId] = graph.edges[edgeId];",
        tab + tab + tab + "let dist1 = parseInt(graph.distances[node1];",
        tab + tab + tab + "let dist2 = parseInt(graph.distances[node2];",
        tab + tab + tab + "if(graph.distances[node1] == -1)",
        tab + tab + tab + tab + "return;",
        tab + tab + tab + "else {",
        tab + tab + tab + tab + "if(dist1 != -1 && (dist2 == -1 || dist1 + weight < dist2)) {",
        tab + tab + tab + tab + tab + "graph.distances[node2] = dist1 + weight;",
        tab + tab + tab + tab + tab + "graph.parents[node2] = node1;",
        tab + tab + tab + tab + "}",
        tab + tab + tab + tab + "else {", //13
        tab + tab + tab + tab + tab + "return;",
        tab + tab + tab + tab + "}",
        tab + tab + tab + "}",
        tab + tab + "}",
        tab + "}", 
        "}" 
    ],

    breadthfirst: [ //added closing brackets for all loops
       "breadthfirst(graph, queue) {", //0
        tab + "var temp = randInRange(0, graph.numberofNodes);", //1
        tab + "var nodeQueue = [];",
        tab + "var nodeStack = [];",
        tab + "nodeLevel[temp] = 0;", 
        tab + "let currNode, adjNode, edgeId;", 
        tab + "for(var i = 0; i < graph.numberOfNodes; ++i) {", //6
        tab + tab + "for(const edge of graph.adjacencyList[temp]) {", 
        tab + tab + tab + "[currNode, adjNode, edgeId] = edge;", 
        tab + tab + tab + "if(currentNode[currNode] == false)",
        tab + tab + tab + tab + "currentNode[currNode] = true;", 
        tab + tab + tab + "if(!(nodeQueue.includes(currNode)))", //11
        tab + tab + tab + tab + "nodeQueue.push(currNode);", 
        tab + tab + tab + "if(!(nodeVisited[adjNode]) && nodeLevel[adjNode] == 0)",
        tab + tab + tab + tab + "nodeLevel[adjNode] = nodeLevel[currNode] + 1;",
        tab + tab + tab + "if(!(nodeVisited[adjNode])) {",
        tab + tab + tab + tab + "if(edgeSelected[adjNode] == false) {", 
        tab + tab + tab + tab + tab + "if(!(nodeQueue.includes(adjNode))) {",
        tab + tab + tab + tab + tab + tab + "nodeQueue.push(adjNode);",
        tab + tab + tab + tab + tab + tab + "nodeStack.push(adjNode);",
        tab + tab + tab + tab + tab + "}",
        tab + tab + tab + tab + "}",
        tab + tab + tab + tab + "else {", //22
        tab + tab + tab + tab + tab + "nodeVisited[currNode] = true;", 
        tab + tab + tab + tab + "}",
        tab + tab + tab + "}",
        tab + tab + tab + "else {",
        tab + tab + tab + tab + "currNode shares edge with adjNode.",
        tab + tab + tab + "}",
        tab + tab + "}",
        tab + "}",
        tab + "nodeQueue.shift();", //31
        "}"
    ],

    depthfirst: [ //done
        "depthFirstSearch(graph, stack) {",
        tab + "let nodeStack = [];",
        tab + "let edgeStack = [];",
        tab + "let nodeVisited = [];",
        tab + "let head = randInRange(0, 6);", //4
        tab + "nodeVisited[head] = true;",
        tab + "for(let node = 0; node < graph.adjacencyList[head].length; node++) {", //6
        tab + tab + "if(nodeVisited[graph.adjacencyList[head][node][1]] == false) {",
        tab + tab + tab + "nodeStack.push(graph.adjacencyList[head][node][1]);",
        tab + tab + tab + "edgeStack.push(graph.adjacencyList[head][node][2]);",
        tab + tab + "}",
        tab + "}", 
        tab + "while(nodeStack.length != 0) {", //12
        tab + tab + "let s = nodeStack.pop();",
        tab + tab + "let e = edgeStack.pop();",
        tab + tab + "if(nodeVisited[s] = false) {",
        tab + tab + tab + "nodeVisited[s] = true;",
        tab + tab + "}",
        tab + tab + "else {", //17
        tab + tab + tab + "continue;",
        tab + tab + "}",
        tab + tab + "for(let node = 0; node < graph.adjacencyList[s].length; node++) {",
        tab + tab + tab + "if(nodeVisited[graph.adjacencyList[s][node][1]] == false) {",
        tab + tab + tab + tab + "nodeStack.push(graph.adjacencyList[s][node][1]);",
        tab + tab + tab + tab + "edgeStack.push(graph.adjacencyList[s][node][2]);",
        tab + tab + tab + "}",
        tab + tab + "}", 
        tab + "}", 
        "}" 
    ],

    //to edit
    prims: [
        "prims(graph, vertex, vertices){ ",
        tab + "var pq = [];",
        tab + "var nodeVisited, edgeSelected;",
        tab + "for(const edge of graph.adjacencyList[0]) {", //3
        tab + tab + "let [node1, node2, _weight, edgeId] = edge;",
        tab + tab + "pq.push(edgeId);",
        tab + "}",
        tab + "for(let i = 0; pq.length > 0 && i < 50; i++) {",  //7
        tab + tab + "pq.sort();",
        tab + tab + "let currentId = pq[0];",
        tab + tab + "pq.pop();",
        tab + tab + "if(nodeVisited[node1] && nodeVisited[node2]) {",
        tab + tab + tab + "continue;",
        tab + tab + "}",
        tab + tab + "unvisitedNode = nodeVisited[node1] ? node2 : node1;", //14
        tab + tab + "nodeVisited[unvisitedNode] = true;",
        tab + tab + "edgeSelected[edgeId] = true;",
        tab + tab + "for(const edge of graph.adjacencyList[unvisitedNode]) {",
        tab + tab + tab + "let[from, to, _weight, edgeId] = edge;",
        tab + tab + tab + "pq.push(edgeId);",
        tab + tab + "}",
        tab + "}",
        tab + "var mstEdges;", //22
        tab + "for(let i = 0; i < graph.numberOfEdges; i++) {",
        tab + tab + "if(edgeSelected[i]) {",
        tab + tab + tab + "mstEdges += (graph.edges[i][0] + graph.edges[i][1]);",
        tab + tab + "}",
        tab + "}",
        "}"
    ],

    heaps: [
        //heapify
        "heapify(arr, x){",
        tab + "let node = root;",
        tab + "let k = 0;",
        tab + "while(k < 5) {", //3
        tab + tab + "if(leftNode.left.value > leftNode.value || ",
        tab + tab + tab + "leftNode.right.value > leftNode.value) {",
        tab + tab + tab + "if(leftNode.left.value > leftNode.right.value) {",
        tab + tab + tab + tab + "temp = leftNode.value;",
        tab + tab + tab + tab + "leftNode.value = leftNode.left.value;",
        tab + tab + tab + tab + "leftNode.left.value = temp;",
        tab + tab + tab + "}",
        tab + tab + tab + "else {", //11
        tab + tab + tab + tab + "temp = leftNode.value;",
        tab + tab + tab + tab + "leftNode.value = leftNode.right.value;",
        tab + tab + tab + tab + "leftNode.right.value = temp;",
        tab + tab + tab + "}",
        tab + tab + "}", //16
        tab + tab + "if(rightNode.left.value > rightNode.value || ",
        tab + tab + tab + "rightNode.right.value > rightNode.value) {",
        tab + tab + tab + "if(rightNode.left.value > rightNode.right.value) {",
        tab + tab + tab + tab + "temp = rightNode.value;",
        tab + tab + tab + tab + "rightNode.value = rightNode.left.value;",
        tab + tab + tab + tab + "rightNode.left.value = temp;",
        tab + tab + tab + "}",
        tab + tab + tab + "else if(rightNode.left.value < rightNode.right.value) {",
        tab + tab + tab + tab + "temp = rightNode.value;",
        tab + tab + tab + tab + "rightNode.value = rightNode.right.value;",
        tab + tab + tab + tab + "rightNode.right.value = temp;",
        tab + tab + tab + "}",
        tab + tab + "}", //29
        tab + tab + "if(leftNode.value > root.value || rightNode.value > root.value) {",
        tab + tab + tab + "if(leftNode.value > rightNode.value) {",
        tab + tab + tab + tab + "temp = root.value;",
        tab + tab + tab + tab + "root.value = leftNode.value;",
        tab + tab + tab + tab + "leftNode.value = temp;",
        tab + tab + tab + "}",
        tab + tab + tab + "else if(leftNode.value < rightNode.value) {",
        tab + tab + tab + tab + "temp = rightNode.value;",
        tab + tab + tab + tab + "root.value = rightNode.value;",
        tab + tab + tab + tab + "rightNode.value = temp;",
        tab + tab + tab + "}",
        tab + tab + "}",
        tab + tab + "k++;",
        tab + "}",
        "}"
    ],

    nqueens: [
        "nqueens(board, col, row, n) {",
        tab + "solveNQueens(board, col) {",
        tab + tab + "if(col >= n)",
        tab + tab + tab + "return;",
        tab + tab + "for(i = 0; i < n; i++) {", //4
        tab + tab + tab + "if(queenSafe(board, i, col, n))",
        tab + tab + tab + tab + "board[i][col] = 1;",
        tab + tab + tab + "if(i + 1 != n)", //7
        tab + tab + tab + tab + "moveSpace(i, col)",
        tab + tab + tab + "else",
        tab + tab + tab + tab + "backtrack(i, col)", //10
        tab + tab + "}", //11
        tab + "}", //12
        tab + "queenSafe(board, row, col, n) {", //13
        tab + tab + "for(i = 0; i < col; i++) {",
        tab + tab + tab + "if(board[row][i] == 1) {", //15
        tab + tab + tab + tab + "whiteTileStep(row, i);", //16
        tab + tab + tab + tab + "blackTileStep(row, i);", //17
        tab + tab + tab + "}",
        tab + tab + "}", 
        tab + tab + "for(i = row, j = col; i >= 0 && j >= 0; i--, j--) {", //20
        tab + tab + tab + "if(board[i][j] == 1) {",
        tab + tab + tab + tab + "whiteTileStep(i, j);",
        tab + tab + tab + tab + "blackTileStep(i, j);",
        tab + tab + tab + "}",
        tab + tab + "}", 
        tab + tab + "for(i = row, j = col; i < n && j >= 0; i++, j--) {", //26
        tab + tab + tab + "if(board[i][j] == 1) {",
        tab + tab + tab + tab + "whiteTileStep(i, j);",
        tab + tab + tab + tab + "blackTileStep(i, j);",
        tab + tab + tab + "}",
        tab + tab + "}", 
        tab + tab + "return;",
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