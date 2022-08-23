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
			subcategory: 'Simple Sorting Algorithms',
			algorithms: [
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
					name: 'Heap Sort',
					path: 'heapsort',
					type: 'js',
					description: <HeapSort />,
				},
			]
		},
		{
			subcategory: 'Divide and Conquer Algorithms',
			algorithms: [
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
			]
		}
	],
	searching: [
		// { name: 'Overview', description: <Searching /> },
		{
			subcategory: 'Simple Searching Algorithms',
			algorithms: [
				{
					name: 'Linear Search',
					path: 'linearsearch',
					type: 'js',
					description: <LinearSearch />,
				},
			]
		},
		{
			subcategory: 'Divide and Conquer Algorithms',
			algorithms: [
				{
					name: 'Binary Search',
					path: 'binarysearch',
					type: 'js',
					description: <BinarySearch />,
				},
			]
		}
	],
	datastructures: [
		// { name: 'Overview', description: <DataStructures /> },
		// { name: 'Arrays', path: 'arrays' },
		{
			subcategory: 'Linear Data Structure',
			algorithms: [
				{
					name: 'Singly Linked List',
					path: 'singlylinkedlist',
					type: 'js',
					description: <SinglyLinkedList />,
				},
				{
					name: 'Hash Table',
					path: 'hashtable',
					type: 'js',
					description: <HashTable />,
				},
				{
					name: 'Queues',
					path: 'queues'
				},
				{
					name: 'Stacks',
					path: 'stacks'
				},
				{
					name: 'Tries',
					path: 'tries'
				},
			]
		}
	],
	graphs: [
		// { name: 'Overview', description: <Graphs /> },
		{
			subcategory: 'Graphs',
			algorithms: [
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
				{
					name: "Kruskal's",
					path: 'kruskals'
				},
			]
		}
	],
	trees: [
		// { name: 'Overview', description: <Trees /> },
		{
			subcategory: 'Trees',
			algorithms: [
				{ 
					name: 'AVL', 
					path: 'avl', 
					type: 'unity', 
					description: <AVL /> 
				},
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
				{
					name: 'Heaps',
					path: 'heaps'
				},
				{
					name: 'Huffman Coding Tree',
					path: 'lcs'
				},
			]
		}
	],
	// // probabilisticdatastructures: [
	// // 	{ name: 'Bloom Filters', path: 'bloomfilters' },
	// // 	{ name: 'Skip List', path: 'skiplist' },
	// // ],
	// backtracking: [
	// 	// { name: 'Overview', description: <Backtracking /> },
	// 	{
	// 		name: 'nQueens',
	// 		path: 'nqueens',
	// 		type: 'js',
	// 		description: <Queens />,
	// 	},
	// ],
	// // linkedlist: [
	// // 	{ name: 'Singly', path: 'singly' },
	// // 	{ name: 'Doubly', path: 'doubly' },
	// // 	{ name: 'Circular', path: 'circular' },
	// // ],
	// // divideconquer: [
	// // 	{ name: 'Merge Sort', path: 'mergesort' },
	// // 	{ name: 'Quick Sort', path: 'quicksort' },
	// // ],
	dynamicprogramming: [
		{
			subcategory: 'Dynamic Programming',
				algorithms: [
					{ 
						name: 'Sequence Alignment', 
						path: 'sequencealignment' 
					},
					{
						name: 'Knapsack',
						path: 'knapsack'
					},
					{
						name: 'Longest Common Subsequence',
						path: 'lcs'
					},
				]
		}
	],
	recursion: [
		{
			subcategory: 'Recursion',
				algorithms: [
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
					{
						name: 'Floodfill',
						path: 'floodfill'
					},
				]
		}
	],
};

export default algorithms;
