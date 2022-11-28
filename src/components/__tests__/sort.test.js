import Sum from '../sum.js';
import BubbleSort from '../../visualizers/bubblesort/bubblesort';


//let sort = new BubbleSort();

test('tests',() => {
    expect(Sum(1,2)).toBe(3);
});


// test('sorted array should produce ascending order', () => {
//    //let sort = render(<BubbleSort/>);  
//    expect(sort.sum(1,2)).toBe(3);
// });

// test('empty array should produce empty', () => {

// });

// test('single value array should produce single value array', () => {

// });

// Use the sorting function with our own unsorted array and expect to be our matched results
// expect([3,2,1]).toBe([1,2,3]);
// expect([]).toBe([]);
// expect([1]).toBe([1]);
// expect([1,4,2,7,4,2]).toBe([1,2,2,4,4,7]);
