import {
	// Sorting,
	BubbleSort,
	SelectionSort,
	InsertionSort,
	MergeSort,
	QuickSort,
	HeapSort,
	// Searching,
	LinearSearch,
	BinarySearch,
	// DataStructures,
	SinglyLinkedList,
	HashTable,
	// Graphs,
	Dijkstras,
	BellmanFord,
	BreadthFirstSearch,
	DepthFirstSearch,
	Prims,
	Kruskals,
	// Trees,
	AVL,
	BinarySearchTree,
	Preorder,
	Inorder,
	Postorder,
	Heaps,
	HuffmanCodingTree,
	// Backtracking,
	Queens,
	// Recursion
	TowersofHanoi,
	FibonacciSequence,
	Floodfill
} from './utils/utils';

const algorithms = {
	sorting: [
		// { name: 'Overview', description: <Sorting /> },
		{
			name: 'Bubble Sort',
			path: 'bubblesort',
			type: 'js',
			description: <BubbleSort />,
			category: 'Sorting'
		},
		{
			name: 'Selection Sort',
			path: 'selectionsort',
			type: 'js',
			description: <SelectionSort />,
			category: 'Sorting'
		},
		{
			name: 'Insertion Sort',
			path: 'insertionsort',
			type: 'js',
			description: <InsertionSort />,
			category: 'Sorting'
		},
		{
			name: 'Quick Sort',
			path: 'quicksort',
			type: 'js',
			description: <QuickSort />,
			category: 'Sorting'
		},
		// {
		// 	name: 'Merge Sort',
		// 	path: 'mergesort',
		// 	type: 'js',
		// 	description: <MergeSort />,
		// category: 'Sorting'
		// },
		{
			name: 'Heap Sort',
			path: 'heapsort',
			type: 'js',
			description: <HeapSort />,
			category: 'Sorting'
		},
	],
	searching: [
		// { name: 'Overview', description: <Searching /> },
		{
			name: 'Linear Search',
			path: 'linearsearch',
			type: 'js',
			description: <LinearSearch />,
			category: 'Searching'
		},
		{
			name: 'Binary Search',
			path: 'binarysearch',
			type: 'js',
			description: <BinarySearch />,
			category: 'Searching'
		},
	],
	datastructures: [
		// { name: 'Overview', description: <DataStructures /> },
		// { name: 'Arrays', path: 'arrays' },
		{
			name: 'Singly Linked List',
			path: 'singlylinkedlist',
			type: 'js',
			description: <SinglyLinkedList />,
			category: 'Data Structures'
		},
		{
			name: 'Hash Table',
			path: 'hashtable',
			type: 'js',
			description: <HashTable />,
			category: 'Data Structures'
		},
		{
			name: 'Hash Table Quadratic Probing',
			path: 'hashtablequadratic',
			type: 'js',
			description: <HashTable />,
			category: 'Data Structures'
		},
		// {
		// 	name: 'Tries',
		// 	path: 'tries'
		// },
		// {
		// 	name: 'Queues',
		// 	path: 'queues'
		// },
		// {
		// 	name: 'Stacks',
		// 	path: 'stacks'
		// },
	],
	graphs: [
		// { name: 'Overview', description: <Graphs /> },
		{
			name: "Dijkstra's",
			path: 'dijkstras',
			type: 'js',
			description: <Dijkstras />,
			category: 'Graphs'
		},
		{
			name: 'Bellman Ford',
			path: 'bellmanford',
			type: 'js',
			description: <BellmanFord />,
			category: 'Graphs'
		},
		{
			name: 'Breadth First Search',
			path: 'breadthfirstsearch',
			type: 'js',
			description: <BreadthFirstSearch />,
			category: 'Graphs'
		},
		{
			name: 'Depth First Search',
			path: 'depthfirstsearch',
			type: 'js',
			description: <DepthFirstSearch />,
			category: 'Graphs'
		},
		{
			name: "Prim's",
			path: 'prims',
			type: 'js',
			description: <Prims />,
			category: 'Graphs'
		},
		{
			name: "Kruskal's",
			path: 'kruskals',
			type: 'js',
			description: <Kruskals />,
			category: 'Graphs'
		},
	],
	trees: [
		// { name: 'Overview', description: <Trees /> },
		// { 
		// 	name: 'AVL', 
		// 	path: 'avl', 
		// 	type: 'js', 
		// 	description: <AVL /> 
		// category: 'Trees'
		// },
		// {
		// 	name: 'Binary Search Tree',
		// 	path: 'binarysearchtre',
		// 	type: 'unity',
		// 	description: <BinarySearchTree />,
		// category: 'Trees'
		// },
		{
			name: 'Binary Search Tree',
			path: 'binarysearchtree',
			type: 'js',
			description: <BinarySearchTree />,
			category: 'Trees'
		},
		{
			name: 'Preorder',
			path: 'preorder',
			type: 'js',
			description: <Preorder />,
			category: 'Trees'
		},
		{
			name: 'Inorder',
			path: 'inorder',
			type: 'js',
			description: <Inorder />,
			category: 'Trees'
		},
		{
			name: 'Postorder',
			path: 'postorder',
			type: 'js',
			description: <Postorder />,
			category: 'Trees'
		},
		{
			name: 'Heaps',
			path: 'heaps',
			type: 'js',
			description: <Heaps />,
			category: 'Trees'
		},
		{
			name: 'Huffman Coding Tree',
			path: 'huffmancodingtree',
			type: 'js',
			description: <HuffmanCodingTree />,
			category: 'Trees'
		},
	],
	// probabilisticdatastructures: [
	// 	{ name: 'Bloom Filters', path: 'bloomfilters' },
	// 	{ name: 'Skip List', path: 'skiplist' },
	// ],
	backtracking: [
		// { name: 'Overview', description: <Backtracking /> },
		{
			name: 'nQueens',
			path: 'nqueens',
			type: 'js',
			description: <Queens />,
			category: 'Backtracking'
		},
	],
	// linkedlist: [
	// 	{ name: 'Singly', path: 'singly' },
	// 	{ name: 'Doubly', path: 'doubly' },
	// 	{ name: 'Circular', path: 'circular' },
	// ],
	// divideconquer: [
	// 	{ name: 'Merge Sort', path: 'mergesort' },
	// 	{ name: 'Quick Sort', path: 'quicksort' },
	// ],
	// dynamicprogramming: [
	// 	{ 
	// 		name: 'Sequence Alignment', 
	// 		path: 'sequencealignment',
	// 		category: 'Dynamic Programming'
	// 	},
	// 	{
	// 		name: 'Knapsack',
	// 		path: 'knapsack',
	// 		category: 'Dynamic Programming'
	// 	},
	// 	{
	// 		name: 'Longest Common Subsequence',
	// 		path: 'lcs',
	// 		category: 'Dynamic Programming'
	// 	},
	// ],
	recursion: [
		{
			name: 'Fibonacci Sequence',
			path: 'fibonaccisequence',
			type: 'js',
			description: <FibonacciSequence />,
			category: 'Recursion'
		},
		{
			name: 'Towers of Hanoi', 
			path: 'towersofhanoi', 
			type: 'js',
			description: <TowersofHanoi />,
			category: 'Recursion'
		},
		{
			name: 'Floodfill',
			path: 'floodfill',
			type: 'js',
			description: <Floodfill />,
			category: 'Recursion'
		},
	],
};

export default algorithms;
