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
        "mergeSort(arr, partition) {",
        tab + "const midpoint = Math.ceil(partition.length/2);",
        tab + "const left = partition.slice(0, midpoint);", //5
        tab + "const right = partition.slice(midpoint, partition.length);", //6
        tab + "if(partition.length < 2) {",
        tab + tab + "return;",
        tab + "}",
        tab + "const leftMerge = mergeSort(arr, left);",
        tab + "const rightMerge = mergeSort(arr, right);",
        tab + "const mergedArray = merge(leftMerge, rightMerge, arr);",
        tab + "return mergedArray;",
        "}",
        "",
        "merge(left, right, vals) {", //13
        tab + "var results = [];",
        tab + "while(left.length > 0 && right.length > 0) {", //15
        tab + tab + "if(vals[left[0]] < vals[right[0]]) {",
        tab + tab + tab + "results.push(left.shift());",
        tab + tab + "}",
        tab + tab + "else {",
        tab + tab + tab + "results.push(right.shift());",
        tab + tab + "}",
        tab + "}",
        tab + "while(left.length > 0) {", //23
        tab + tab + "const id = left.shift();",
        tab + tab + "results.push(id);",
        tab + "}",
        tab + "while(right.length > 0) {", //27
        tab + tab + "const id = right.shift();",
        tab + tab + "results.push(id);",
        tab + "}",
        tab + "return results;",
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
        tab + "root = null;",
        tab + "var val = Math.floor(Math.random() * 100);",
        tab + "while(i < MAX_NODE){", //3
        tab + tab + "val = Math.floor(Math.random() * 100);", //4
        tab + tab + "if(!root) {",
        tab + tab + tab + "root = val;",
        tab + tab + tab + "i++;",
        tab + tab + "}",
        tab + tab + "else {", //9
        tab + tab + tab + "let node = root;",
        tab + tab + tab + "var firstStep = true;",
        tab + tab + tab + "while(true) {", //12
        tab + tab + tab + tab + "if(firstStep) {",
        tab + tab + tab + tab + tab + "Val will be inserted next.",
        tab + tab + tab + tab + tab + "firstStep = false;",
        tab + tab + tab + tab + "}",
        tab + tab + tab + tab + "else {", //17
        tab + tab + tab + tab + tab + "No insertion made.",
        tab + tab + tab + tab + "}",
        tab + tab + tab + tab + "if(val < node.value){", //20
        tab + tab + tab + tab + tab + "if(node.left != null) {",
        tab + tab + tab + tab + tab + tab + "node = node.left;",
        tab + tab + tab + tab + tab + "}",
        tab + tab + tab + tab + tab + "else {", //24
        tab + tab + tab + tab + tab + tab + "Val inserted to left of node.",
        tab + tab + tab + tab + tab + tab + "i++;",
        tab + tab + tab + tab + tab + tab + "j++;",
        tab + tab + tab + tab + tab + tab + "break;",
        tab + tab + tab + tab + tab + "}",
        tab + tab + tab + tab + "}", 
        tab + tab + tab + tab + "else if(val > node.value) {", //31
        tab + tab + tab + tab + tab + "if(node.right != null) {", //32
        tab + tab + tab + tab + tab + tab + "node = node.right;",
        tab + tab + tab + tab + tab + "}",
        tab + tab + tab + tab + tab + "else {", //35
        tab + tab + tab + tab + tab + tab + "Val inserted to right of node.",
        tab + tab + tab + tab + tab + tab + "i++;",
        tab + tab + tab + tab + tab + tab + "j++;",
        tab + tab + tab + tab + tab + tab + "break;",
        tab + tab + tab + tab + tab + "}",
        tab + tab + tab + tab + "}", 
        tab + tab + tab + tab + "else {", //42
        tab + tab + tab + tab + tab + "Move forward to prevent duplicate value.",
        tab + tab + tab + tab + tab + "break;",
        tab + tab + tab + tab + "}",
        tab + tab + tab + "}", 
        tab + tab + "}", 
        tab + "}", 
        "}" 
    ],
    heapsort: [
        "heapSort(arr, size, heapVals, vals) {",
        tab + "for(let i = size; i > size/2; i--) {",
        tab + tab + "Inserting value arr[i] into Heap.",
        tab + tab + "No children attached to current node.",
        tab + "}",
        tab + "for(let i = Math.floor(size / 2); i >= 1; i--) {", //5
        tab + tab + "let left = i * 2;",
        tab + tab + "let right = i * 2 + 1;",
        tab + tab + "let v = i;",
        tab + tab + "while(true) {",
        tab + tab + tab + "left = v * 2;",
        tab + tab + tab + "right = v * 2 + 1;",
        tab + tab + tab + "if(left > size) {",  //12
        tab + tab + tab + tab + "break;", //13
        tab + tab + tab + "}",
        tab + tab + tab + "let c = -1;",
        tab + tab + tab + "if(right > size) {", //16
        tab + tab + tab + tab + "c = left;",
        tab + tab + tab + "}",
        tab + tab + tab + "else if(arr[left] > arr[right]) {", //19
        tab + tab + tab + tab + "c = left;",
        tab + tab + tab + "}",
        tab + tab + tab + "else {", //22
        tab + tab + tab + tab + "c = right;",
        tab + tab + tab + "}",
        tab + tab + tab + "if(arr[c] > arr[v]) {", //25
        tab + tab + tab + tab + "v = c;",
        tab + tab + tab + "else {", //27
        tab + tab + tab + tab + "break;",
        tab + tab + tab + "}",
        tab + tab + "}",
        tab + "}",
        tab + "for(let i = size; i > 1; i--) {", //32
        tab + tab + "heapVals[i].attr.x = heapVals[1].attr.x;",
        tab + tab + "heapVals[i].attr.y = heapVals[1].attr.y;",
        tab + tab + "heapVals[1].attr.x = vals[i].attr.x;",
        tab + tab + "heapVals[1].attr.x = vals[i].attr.y;",
        tab + tab + "[heapVals[1], heapVals[i]] = [heapVals[i], heapVals[1]];", //37
        tab + tab + "let v = 1;",
        tab + tab + "while(true) {", //39
        tab + tab + tab + "if(v * 2 >= i) {",
        tab + tab + tab + tab + "break;",
        tab + tab + tab + "}",
        tab + tab + tab + "let c = -1;",
        tab + tab + tab + "let left = v * 2;",
        tab + tab + tab + "let right = v * 2 + 1;",
        tab + tab + tab + "if(right >= i) {", //46
        tab + tab + tab + tab + "c = left;",
        tab + tab + tab + "}",
        tab + tab + tab + "else if(arr[left] > arr[right]) {",
        tab + tab + tab + tab + "c = left;", //50
        tab + tab + tab + "}",
        tab + tab + tab + "else {", //52
        tab + tab + tab + tab + "c = right;",
        tab + tab + tab + "}",
        tab + tab + tab + "if(arr[c] > arr[v]) {", //55
        tab + tab + tab + tab + "v = c;",
        tab + tab + tab + "}",
        tab + tab + tab + "else",
        tab + tab + tab + tab + "break",
        tab + tab + tab + "}",
        tab + tab + "}",
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
        "insertionSort(arr, ids, size) {",
        tab + "var i, j;",
        tab + "for(i = 1; i < size; i++) {",
        tab + tab + "for(j = i-1; j >= 0; j--) {", //3
        tab + tab + tab + "if(arr[j] > arr[j+1]) {",
        tab + tab + tab + tab + "[arr[j+1], arr[j]] = [arr[j], arr[j+1]];",
        tab + tab + tab + "}",
        tab + tab + tab + "else {",
        tab + tab + tab + tab + "break;",
        tab + tab + tab + "}",
        tab + tab + "}",
        tab + "}",
        "}"
    ],
    singlylinkedlist: [
        "createLinkedList() {",
        tab + "let arr = [];",
        tab + "for(let i = 0; i < 8; i++) {",
        tab + tab + "insert(arr[i], i);",
        tab + "}",
        tab + "for(let k = 7; k >= 3; k--) {",
        tab + tab + "removeTail();", //6
        tab + "}",
        tab + "for(let i = 3; i < 8; i++) {",
        tab + tab + "insert(arr[i], i);",
        tab + "}",
        "}",
        "insert(element, id) {",
        tab + "let node = new Node(element);",
        tab + "if (head == null) {", //14
        tab + tab + "head = node;",
        tab + "}",
        tab + "else {", //17
        tab + tab + "let current = head;",
        tab + tab + "while (current.next) {", //19
        tab + tab + tab + "current = current.next;",
        tab + tab + "}",
        tab + tab + "current.next = node;", //22
        tab + "}", 
        tab + "size++;",
        "}", 
        "removeTail() {", //26
        tab + "for(let i = 0; i < id.length; i++) {",
        tab + tab + "current = current.next;",
        tab + "}",
        tab + "let tailID = id.pop();", //30
        tab + "let current = head;",
        tab + "if(current.next = null) {",
        tab + tab + "current = null;",
        tab + "}",
        tab + "else {",
        tab + tab + "while(current.next.next != null) {", //36
        tab + tab + tab + "current = current.next;",
        tab + tab + "}",
        tab + tab + "current.next = null;",
        tab + "}",
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
        "quickSort(low, high, arr, size) {",
        tab + "var split;",
        tab + "if(low < high) {",
        tab + tab + "split = partition(low, high, arr);",
        tab + tab + "quickSort(low, split-1, arr, split-low);",
        tab + tab + "quickSort(split+1, high, arr, high-split+1);",
        tab + "}",
        tab + "else {",
        tab + tab + "if(low > -1 && low < size) {",
        tab + tab + tab + "if(low > high) {",
        tab + tab + tab + tab + "return;",
        tab + tab + tab + "}",
        tab + tab + tab + "Low is already in sorted position.", //12
        tab + tab + "}",
        tab + tab + "else if(low <= high) {", //14
        tab + tab + tab + "High is already in sorted position.",
        tab + tab + "}",
        tab + "}",
        "}",
        "",
        "partition(low, high, arr) {", //20
        tab + "let pivot = low++;",
        tab + "let tempHigh = high;",
        tab + "while(low <= high) {", //23
        tab + tab + "while(low <= high && arr[low] <= arr[pivot]) {",
        tab + tab + tab + "if(low == tempHigh) {",
        tab + tab + tab + tab + "break;",
        tab + tab + tab + "}",
        tab + tab + tab + "low++;",
        tab + tab + "}",
        tab + tab + "if(low <= high && arr[low] > arr[pivot]) {", //30
        tab + tab + tab + "Low > Pivot. Switch to High.",
        tab + tab + "}",
        tab + tab + "while(high >= low && arr[high] > arr[pivot]) {", //33
        tab + tab + tab + "high--;",
        tab + tab + "}",
        tab + tab + "if(high >= low && arr[high] <= arr[pivot]) {",
        tab + tab + tab + "High < Pivot. Swapping Low and High.",
        tab + tab + "}",
        tab + tab + "if(low < high) {", //39
        tab + tab + tab + "[arr[low], arr[high]] = [arr[high], arr[low]];",
        tab + tab + tab + "low++;",
        tab + tab + tab + "high--;",
        tab + tab + "}",
        tab + "}",
        tab + "[arr[pivot], arr[high]] = [arr[high], arr[pivot]];",
        tab + "return high;",
        "}"
    ],

    hashtable: [
        "insertion(value) {",
        tab + "if (size == tableLength) {",
        tab + tab + "Hash Table Full!",
        tab + "}",
        tab + "for(i = 0; i < tableLength; i++) {",
        tab + tab + "if (info.deleted[index] && firstDeleted == -1) {", //4
        tab + tab + tab + "firstDeleted = index;",
        tab + tab + tab + "continue;",
        tab + tab + "}",
        tab + tab + "if (info.table[index] == value) {", //7
        tab + tab + tab + "Skip to Prevent Reinsertion!",
        tab + tab + "}",
        tab + tab + "if (info.table[index] == null) {", //9
        tab + tab + tab + "if(firstDeleted == -1) {",
        tab + tab + tab + tab + "Insert Value!",
        tab + tab + tab + "}",
        tab + tab + "}",
        tab + tab + "if (info.deleted[index]) {",
        tab + tab + tab + "Already Deleted! Move Forward",
        tab + tab + "}",
        tab + tab + "else {",
        tab + tab + tab + "Occupied! Move Forward",
        tab + tab + "}",
        tab + "}", //15
        "}", //16
        "deletion(value) {",
        tab + "for(i = 0; i < tableLength; i++){",
        tab + tab + "if(deleted[index])",
        tab + tab + tab + "Already Deleted!",
        tab + tab + "if(table[index] == value)",
        tab + tab + tab + "Value Found! Marked as Deleted",
        tab + tab + "if(table[index] == null)",
        tab + tab + tab + "break;",
        tab + "}", //25
        "}", //26
        "search(value) {",
        tab + "for(i = 0; i < tableLength; i++){",
        tab + tab + "if(deleted[index])",
        tab + tab + tab + "Ignore Value!",
        tab + tab + "if(table[index] == value)",
        tab + tab + tab + "Found Value!",
        tab + tab + "if(table[index] == null)",
        tab + tab + tab + "break;",
        tab + "}", //35
        "}" //36
    ],

    hashtablequadratic: [
        "insertion(x) {",
        tab + "for(i = 0; i < tableLength; i++){",
        tab + tab + "if(deleted[index] && firstDeleted == -1)",
        tab + tab + tab + "Found First Deleted Index!",
        tab + tab + "if(table[index] == x)",
        tab + tab + tab + "Skip to Prevent Reinsertion!",
        tab + tab + "if(table[index] == null)",
        tab + tab + tab + "Insert x;",
        tab + "}", //8
        "}",
        "deletion(x) {",
        tab + "for(i = 0; i < tableLength; i++){",
        tab + tab + "if(deleted[index])",
        tab + tab + tab + "Value Already Deleted!",
        tab + tab + "if(table[index] == x)",
        tab + tab + tab + "Value Found! Marked as Deleted",
        tab + tab + "if(table[index] == null)",
        tab + tab + tab + "break;",
        tab + "}", //17
        "}",
        "search(x) {",
        tab + "for(i = 0; i < tableLength; i++){",
        tab + tab + "if(deleted[index])",
        tab + tab + tab + "Ignore",
        tab + tab + "if(table[index] == x)",
        tab + tab + tab + "Value Found!",
        tab + tab + "if(table[index] == null)",
        tab + tab + tab + "break;",
        tab + "}", //26
        "}"
    ],

    hashtablelinkedlist: [
        "insertion(x) {",
        tab + "if(size == tableLength) {",
        tab + tab + "Hash Table Full!",
        tab + "}",
        tab + "for(let i = 0; i < tableLength; i++) {",
        tab + tab + "let index = (hash + i) % tableLength;",
        tab + tab + "if(deleted[index] && firstDeleted == -1) {",
        tab + tab + tab + "firstDeleted = index;",
        tab + tab + tab + "continue;",
        tab + tab + "}",
        tab + tab + "let currentNode = table[index];",
        tab + tab + "if(currentNode == null) {",
        tab + tab + tab + "The head is null - create first node.",
        tab + tab + "}",
        tab + tab + "else {",
        tab + tab + tab + ""
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
        tab + "if(n <= 1) {",
        tab + tab + "return n;",
        tab + "}",
        tab + "return fib(n - 1) + fib(n - 2);",
        "}"
    ],

    hanoi: [
        "hanoi(n, from, to, aux){",
        tab + "if(n == 0) {",
        tab + tab + "return;",
        tab + "}",
        tab + "if(n > 1) {", //4
        tab + tab + "Move n - 1 Disks to Aux",
        tab + "}",
        tab + "hanoi(n - 1, from, aux, to);",
        tab + "hanoi(n - 1, aux, to, from);",
        "}"
    ],

    kruskals: [
        "kruskals(graph) {",
        tab + "var i = 0;",
        tab + "var pq = [];",
        tab + "var nodeVisited, edgeSelected, nodes;",
        tab + "for(const edge of graph.edges) {",
        tab + tab + "let [node1, node2, _weight, edgeId] = edge;",
        tab + tab + "pq.push(edgeId);", //6
        tab + "}",
        tab + "for(let i = 0; pq.length > 0 && i < 50; i++) {",
        tab + tab + "let currentId = pq[0];",
        tab + tab + "let [node1, node2, _weight, edgeId] = graph.edges[currentId];",
        tab + tab + "[pq[0], pq[pq.length - 1]] = [pq[pq.length - 1], pq[0]];",
        tab + tab + "pq.pop();", //12
        tab + tab + "if(nodeVisited[node1] && nodeVisited[node2]) {",
        tab + tab + tab + "if(!NodesConnected.United(node1, node2)) {",
        tab + tab + tab + tab + "Both nodes already added.",
        tab + tab + tab + "}",
        tab + tab + tab + "else {",
        tab + tab + tab + tab + "Ignore the edge.",
        tab + tab + tab + tab + "continue;", //19
        tab + tab + tab + "}",
        tab + tab + "}",
        tab + tab + "if(nodeVisited[node1] = false && nodeVisited[node2] = false) {",
        tab + tab + tab + "nodeVisited[node1] = true;", //23
        tab + tab + tab + "nodeVisited[node2] = true;",
        tab + tab + tab + "edgeSelected[edgeId] = true;",
        tab + tab + tab + "NodesConnected.Connect(node1, node2);",
        tab + tab + tab + "Include edge and both nodes in the tree.",
        tab + tab + "}",
        tab + tab + "else if(nodeVisited[node1] = false && nodeVisited[node2] = true) {",
        tab + tab + tab + "nodeVisited[node1] = true;", //30
        tab + tab + tab + "edgeSelected[edgeId] = true;",
        tab + tab + tab + "NodesConnected.Connect(node1, node2);",
        tab + tab + tab + "Include edge and node 1 in the tree.",
        tab + tab + "}",
        tab + tab + "else if(nodeVisited[node1] = true && nodeVisited[node2] = false) {",
        tab + tab + tab + "nodeVisited[node2] = true;",
        tab + tab + tab + "edgeSelected[edgeId] = true;",
        tab + tab + tab + "NodesConnected.Connect(node1, node2);",
        tab + tab + tab + "Include edge and node 2 in the tree.",
        tab + tab + "}",
        tab + "}",
        "}",
    ],

    floodfill: [
        "floodfill(board, col, row, n) {",
        tab + "col = Math.floor(Math.random() * 10);",
        tab + "row = Math.floow(Math.random() * 10);",
        tab + "performFloodfill(board, col, row, n);",
        "}",
        "",
        "performFloodfill(board, i, j, n) {", //6
        tab + "if(i < 0 || i > n || j < 0 || j > n) {",
        tab + tab + "return board;",
        tab + "}",
        tab + "Filling board[i][j].", //10
        tab + "performFloodfill(board, i-1, j, n);",
        tab + "performFloodfill(board, i+1, j, n);",
        tab + "performFloodfill(board, i, j+1, n);",
        tab + "performFloodfill(board, i, j-1, n);",
        tab + "return board;",
        "}"
    ],

    AVL: [
        "avlMain() {",
        tab + "var root = null;",
        tab + "var val = Math.floor(Math.random() * 100);",
        tab + "while(i < MAX_NODE) {",
        tab + tab + "val = Math.floor(Math.random() * 100);",
        tab + tab + "if(!root) {",
        tab + tab + tab + "root = new Node(val);",
        tab + tab + tab + "i++;",
        tab + tab + "}",
        tab + tab + "else {",
        tab + tab + tab + "insertValue(root, val);",
        tab + tab + tab + "i++;",
        tab + tab + "}",
        tab + "}",
        "}",
        "",
        "insertValue(node, val) {",
        tab + "if(node == null) {",
        tab + tab + "node = new Node(val);",
        tab + tab + "return node;",
        tab + "}",
        tab + "if(val < node.value) {",
        tab + tab + "node.left = insertValue(node.left, val);",
        tab + "}",
        tab + "if(val > node.value) {",
        tab + tab + "node.right = insertValue(node.right, val);",
        tab + "}",
        tab + "if(val == node.value) {",
        tab + tab + "return node;",
        tab + "}",
        tab + "return node;",
        "}"
    ],
}