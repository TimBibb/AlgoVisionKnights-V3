import './utils.css';
import MathJax from 'react-mathjax';

// Images and gifs
import graphs from './images/graphs.png';
import queens from './images/queens.png';
import bubblegif from './images/bubblegif.gif';
import selectiongif from './images/selectiongif.gif';
import insertiongif from './images/insertiongif.gif';
import quicksortgif from './images/quicksortgif.gif';
import mergergif from './images/mergegif.gif';
import binarysearchgif from './images/binarysearchgif.gif';
import singlylinkedlistgif from './images/singlylinkedlistgif.gif';
import hashtable from './images/hashtable.png';
import linearsearchgif from './images/linearsearchgif.gif';
import bellmanford from './images/bellmanford.png';
import dijkstrasgif from './images/dijkstragif.gif';
import breadthfirstsearchgif from './images/breadthfirstsearch.gif';
import depthfirstsearchgif from './images/depthfirstsearch.gif';
import primsgif from './images/primsgif.gif';
import avlgif from './images/avlgif.gif';
import binarysearchtreegif from './images/binarysearchtreegif.gif';
import preordergif from './images/preordergif.gif';
import inordergif from './images/inordergif.gif';
import postordergif from './images/postordergif.gif';
import towersofhanoi from './images/towersofhanoi.png';
import fibonaccipng from './images/fibonacci.png';

const constant = <MathJax.Node formula={`O(1)`} />;
const log = <MathJax.Node formula={`O(log \\ n)`} />;
const linear = <MathJax.Node formula={`O(n)`} />;
const nlogn = <MathJax.Node formula={`O(n \\ log \\ n)`} />;
const n2 = <MathJax.Node formula={`O(n^2)`} />;

// Sorting
export function Sorting() {
	return <div className='Sorting'>Sorting JSX</div>;
}

export function BubbleSort() {
	return (
		<div className='BubbleSort'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Operation</th>
							<th>Best Case</th>
							<th>Average Case</th>
							<th>Worst Case</th>
						</tr>
						<tr>
							<td>Comparisons</td>
							<td>{linear}</td>
							<td>{n2}</td>
							<td>{n2}</td>
						</tr>
						<tr>
							<td>Swaps</td>
							<td>{constant}</td>
							<td>{n2}</td>
							<td>{n2}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>

			<img src={bubblegif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

export function SelectionSort() {
	return (
		<div className='SelectionSort'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Operation</th>
							<th>Best Case</th>
							<th>Average Case</th>
							<th>Worst Case</th>
						</tr>
						<tr>
							<td>Comparisons</td>
							<td>{n2}</td>
							<td>{n2}</td>
							<td>{n2}</td>
						</tr>
						<tr>
							<td>Swaps</td>
							<td>{constant}</td>
							<td>{linear}</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{constant}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={selectiongif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

export function InsertionSort() {
	return (
		<div className='InsertionSort'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Operation</th>
							<th>Best Case</th>
							<th>Average Case</th>
							<th>Worst Case</th>
						</tr>
						<tr>
							<td>Comparisons</td>
							<td>{linear}</td>
							<td>{n2}</td>
							<td>{n2}</td>
						</tr>
						<tr>
							<td>Swaps</td>
							<td>{constant}</td>
							<td>{n2}</td>
							<td>{n2}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={insertiongif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

export function QuickSort() {
	return (
		<div className='QuickSort'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Runtime</th>
						</tr>
						<tr>
							<td>Best Case</td>
							<td>{nlogn}</td>
						</tr>
						<tr>
							<td>Average Case</td>
							<td>{nlogn}</td>
						</tr>
						<tr>
							<td>Worst Case</td>
							<td>{n2}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={quicksortgif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

export function MergeSort() {
	return (
		<div className='MergeSort'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Runtime</th>
						</tr>
						<tr>
							<td>Best Case</td>
							<td>{nlogn}</td>
						</tr>
						<tr>
							<td>Average Case</td>
							<td>{nlogn}</td>
						</tr>
						<tr>
							<td>Worst Case</td>
							<td>{nlogn}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={mergergif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

export function HeapSort() {
	return (
		<div className='HeapSort'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Runtime</th>
						</tr>
						<tr>
							<td>Best Case</td>
							<td>{nlogn}</td>
						</tr>
						<tr>
							<td>Average Case</td>
							<td>{nlogn}</td>
						</tr>
						<tr>
							<td>Worst Case</td>
							<td>{nlogn}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
		</div>
	);
}

// Searching
export function Searching() {
	return <div className='Searching'></div>;
}

export function LinearSearch() {
	return (
		<div className='LinearSearch'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Runtime</th>
						</tr>
						<tr>
							<td>Best Case</td>
							<td>{constant}</td>
						</tr>
						<tr>
							<td>Average Case</td>
							<td>{linear}</td>
						</tr>
						<tr>
							<td>Worst Case</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{constant}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={linearsearchgif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

export function BinarySearch() {
	return (
		<div className='BinarySearch'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Runtime</th>
						</tr>
						<tr>
							<td>Best Case</td>
							<td>{constant}</td>
						</tr>
						<tr>
							<td>Average Case</td>
							<td>{log}</td>
						</tr>
						<tr>
							<td>Worst Case</td>
							<td>{log}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{constant}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={binarysearchgif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

// Data Structures
export function DataStructures() {
	return <div className='DataStructures'>Data Structures JSX</div>;
}

export function SinglyLinkedList() {
	return (
		<div className='SinglyLinkedList'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Operation</th>
							<th>Best Case</th>
							<th>Worst Case</th>
						</tr>
						<tr>
							<td>Search</td>
							<td>{constant}</td>
							<td>{linear}</td>
						</tr>
						<tr>
							<td>Insertion</td>
							<td>{constant}</td>
							<td>{linear}</td>
						</tr>
						<tr>
							<td>Deletion</td>
							<td>{constant}</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={singlylinkedlistgif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

export function HashTable() {
	return (
		<div className='HashTable'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Operation</th>
							<th>Best Case</th>
							<th>Worst Case</th>
						</tr>
						<tr>
							<td>Search</td>
							<td>{constant}</td>
							<td>{linear}</td>
						</tr>
						<tr>
							<td>Insertion</td>
							<td>{constant}</td>
							<td>{linear}</td>
						</tr>
						<tr>
							<td>Deletion</td>
							<td>{constant}</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={hashtable} alt='hashtable' rel='noreferrer' />
		</div>
	);
}

// Graphs
export function Graphs() {
	return (
		<div className='Graphs'>
			<img src={graphs} alt='graphs' rel='noreferrer' />
		</div>
	);
}

const dijkstratime = (
	<MathJax.Node formula={`O(|E| \\ + \\ |V| \\ log \\ |V|)`} />
);

const dijkstraspace = <MathJax.Node formula={`O(|V| \\ + \\ |E|)`} />;

export function Dijkstras() {
	return (
		<div className='Dijkstras'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Runtime</th>
						</tr>
						<tr>
							<td>Worst Case</td>
							<td>{dijkstratime}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{dijkstraspace}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={dijkstrasgif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

const bellmantimebest = <MathJax.Node formula={`O(|E|)`} />;
const bellmantimeworst = <MathJax.Node formula={`O(|V||E|)`} />;
const bellmanspace = <MathJax.Node formula={`O(|V|)`} />;

export function BellmanFord() {
	return (
		<div className='BellmanFord'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Runtime</th>
						</tr>
						<tr>
							<td>Best Case</td>
							<td>{bellmantimebest}</td>
						</tr>
						<tr>
							<td>Worst Case</td>
							<td>{bellmantimeworst}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{bellmanspace}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={bellmanford} alt='graphs' rel='noreferrer' />
		</div>
	);
}

const bfstimelist = (
	<MathJax.Node formula={`O(|V| \\ + \\ |E|) \\ = \\ O(b^d)`} />
);
const bfstimematrix = <MathJax.Node formula={`O(|V|^2) \\ = \\ O(b^d)`} />;
const bfsspace = <MathJax.Node formula={`O(|V|) \\ = \\ O(b^d)`} />;

export function BreadthFirstSearch() {
	return (
		<div
			className='
    BreadthFirstSearch'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Implementation</th>
							<th>Worst Case</th>
						</tr>
						<tr>
							<td>Adjacency List</td>
							<td>{bfstimelist}</td>
						</tr>
						<tr>
							<td>Adjacency Matrix</td>
							<td>{bfstimematrix}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{bfsspace}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={breadthfirstsearchgif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

const dfstime = <MathJax.Node formula={`O(|V| \\ + \\ |E|)`} />;
const dfsspace = <MathJax.Node formula={`O(|V|)`} />;

export function DepthFirstSearch() {
	return (
		<div className='DepthFirstSearch'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Runtime</th>
						</tr>
						<tr>
							<td>Worst Case</td>
							<td>{dfstime}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{dfsspace}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={depthfirstsearchgif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

const matrix = <MathJax.Node formula={`O(|V|^2)`} />;
const binary = <MathJax.Node formula={`O(|V| \\ + \\ |E| \\ log \\ |V|)`} />;
const fibonacci = <MathJax.Node formula={`O(|E| \\ + \\ |V| \\ log \\ |V|)`} />;

export function Prims() {
	return (
		<div className='Prims'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Implementation</th>
							<th>Worst Case</th>
						</tr>
						<tr>
							<td>Adjacency Matrix</td>
							<td>{matrix}</td>
						</tr>
						<tr>
							<td>Binary Heap and Adjacency List</td>
							<td>{binary}</td>
						</tr>
						<tr>
							<td>Fibonacci Heap and Adjacency List</td>
							<td>{fibonacci}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={primsgif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

// Trees
export function Trees() {
	return <div className='Trees'>Trees JSX</div>;
}

export function AVL() {
	return (
		<div className='AVL'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Operation</th>
							<th>Average Case</th>
							<th>Worst Case</th>
						</tr>
						<tr>
							<td>Search</td>
							<td>{log}</td>
							<td>{log}</td>
						</tr>
						<tr>
							<td>Insertion</td>
							<td>{log}</td>
							<td>{log}</td>
						</tr>
						<tr>
							<td>Deletion</td>
							<td>{log}</td>
							<td>{log}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={avlgif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

export function BinarySearchTree() {
	return (
		<div className='BinarySearchTree'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Operation</th>
							<th>Average Case</th>
							<th>Worst Case</th>
						</tr>
						<tr>
							<td>Search</td>
							<td>{log}</td>
							<td>{linear}</td>
						</tr>
						<tr>
							<td>Insertion</td>
							<td>{log}</td>
							<td>{linear}</td>
						</tr>
						<tr>
							<td>Deletion</td>
							<td>{log}</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={binarysearchtreegif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

export function Preorder() {
	return (
		<div className='Preorder'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Runtime</th>
						</tr>
						<tr>
							<td>Worst Case</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={preordergif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

export function Inorder() {
	return (
		<div className='Inorder'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Runtime</th>
						</tr>
						<tr>
							<td>Worst Case</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={inordergif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

export function Postorder() {
	return (
		<div className='Postorder'>
			<MathJax.Provider>
				<div>
					<p className='SubHeader'>Time Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Runtime</th>
						</tr>
						<tr>
							<td>Worst Case</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
				<div>
					<p className='SubHeader'>Space Complexity:</p>
					<table>
						<tr>
							<th>Cases</th>
							<th>Space</th>
						</tr>

						<tr>
							<td>Worst Case</td>
							<td>{linear}</td>
						</tr>
					</table>
				</div>
			</MathJax.Provider>
			<img src={postordergif} alt='graphs' rel='noreferrer' />
		</div>
	);
}

// Backtracking
export function Backtracking() {
	return <div className='Backtracking'>Backtracking JSX</div>;
}

export function Queens() {
	return (
		<div className='Queens'>
			<div>
				<p>
					<strong>Problem Statement:</strong> Given an integer,{' '}
					<strong>n</strong>, representing the number of queens given
					to you. Place all <strong>n</strong> queens on an{' '}
					<strong>n x n</strong> chessboard such that no two queens
					can attack each other.
				</p>
			</div>
			<img src={queens} alt='queens' rel='noreferrer' />
		</div>
	);
}

export function Recursion() {
	return <div className='Recursion'>Recursion JSX</div>;
}

export function FibonacciSequence() {
	return (
		<div className='FibonacciSequence'>
			<div>
				<p>
					<strong>Problem Statement:</strong> Find the <strong>nth</strong> number of the
					Fibonacci sequence.
				</p> <br></br>
				<p>
					Each number of the Fibonacci sequence, is defined as being the sum of the previous two numbers in the sequence.
					This problem is often given as an introduction to programming recursively.
				</p>
			</div>
			<img src={fibonaccipng} alt='fibonaccisequence' rel='noreferrer' />
		</div>
	);
}

export function TowersofHanoi() {
	return (
		<div className='TowersOfHanoi'>
			<div>
				<p>
					<strong>Problem Statement:</strong> Move all of the disks from the first
					tower to the last tower, with the following conditions:
					<ul>
						<li>Can only move one disk at a time.</li>
						<li>Each move can only move the top disk from one stack to the top of another.</li>
						<li>Disks cannot be place on top of smaller disks.</li>
					</ul>
				</p>
			</div>
			<img src={towersofhanoi} alt='towersofhanoi' rel='noreferrer' />
		</div>
	);
}