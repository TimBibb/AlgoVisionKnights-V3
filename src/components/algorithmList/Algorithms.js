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
	// Trees,
	AVL,
	BinarySearchTree,
	Preorder,
	Inorder,
	Postorder,
	// Backtracking,
	Queens,
	// Recursion
	TowersofHanoi,
	FibonacciSequence
} from './utils/utils';

const algorithms = {
	sorting: [
		// { name: 'Overview', description: <Sorting /> },
		{
			name: 'Bubble Sort',
			path: 'bubblesort',
			type: 'js',
			description: <BubbleSort />,
		},
		{
			name: 'Selection Sort',
			path: 'selectionsort',
			type: 'js',
			description: <SelectionSort />,
		},
		{
			name: 'Insertion Sort',
			path: 'insertionsort',
			type: 'js',
			description: <InsertionSort />,
		},
		{
			name: 'Quick Sort',
			path: 'quicksort',
			type: 'js',
			description: <QuickSort />,
		},
		{
			name: 'Merge Sort',
			path: 'mergesort',
			type: 'unity',
			description: <MergeSort />,
		},
		{
			name: 'Heap Sort',
			path: 'heapsort',
			type: 'js',
			description: <HeapSort />,
		},
	],
	searching: [
		// { name: 'Overview', description: <Searching /> },
		{
			name: 'Linear Search',
			path: 'linearsearch',
			type: 'unity',
			description: <LinearSearch />,
		},
		{
			name: 'Binary Search',
			path: 'binarysearch',
			type: 'unity',
			description: <BinarySearch />,
		},
	],
	datastructures: [
		// { name: 'Overview', description: <DataStructures /> },
		// { name: 'Arrays', path: 'arrays' },
		{
			name: 'Singly Linked List',
			path: 'singlylinkedlist',
			type: 'unity',
			description: <SinglyLinkedList />,
		},
		{
			name: 'Hash Table',
			path: 'hashtable',
			type: 'js',
			description: <HashTable />,
		},
	],
	graphs: [
		// { name: 'Overview', description: <Graphs /> },
		{
			name: "Dijkstra's",
			path: 'dijkstras',
			type: 'js',
			description: <Dijkstras />,
		},
		{
			name: 'Bellman Ford',
			path: 'bellmanford',
			type: 'js',
			description: <BellmanFord />,
		},
		{
			name: 'Breadth First Search',
			path: 'breadthfirstsearch',
			type: 'js',
			description: <BreadthFirstSearch />,
		},
		{
			name: 'Depth First Search',
			path: 'depthfirstsearch',
			type: 'js',
			description: <DepthFirstSearch />,
		},
		{
			name: "Prim's",
			path: 'prims',
			type: 'js',
			description: <Prims />,
		},
	],
	trees: [
		// { name: 'Overview', description: <Trees /> },
		{ name: 'AVL', path: 'avl', type: 'unity', description: <AVL /> },
		{
			name: 'Binary Search Tree',
			path: 'binarysearchtree',
			type: 'unity',
			description: <BinarySearchTree />,
		},
		{
			name: 'Preorder',
			path: 'preorder',
			type: 'unity',
			description: <Preorder />,
		},
		{
			name: 'Inorder',
			path: 'inorder',
			type: 'unity',
			description: <Inorder />,
		},
		{
			name: 'Postorder',
			path: 'postorder',
			type: 'unity',
			description: <Postorder />,
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
	// dynamicprogramming: [{ name: 'Floyd-Warshal', path: 'floydwarshall' }],
	recursion: [
		{
			name: 'Fibonacci Sequence',
			path: 'fibonaccisequence',
			type: 'js',
			description: <FibonacciSequence />
		},
		{
			name: 'Towers of Hanoi', 
			path: 'towersofhanoi', 
			type: 'js',
			description: <TowersofHanoi />
		},
	],
};

export default algorithms;
