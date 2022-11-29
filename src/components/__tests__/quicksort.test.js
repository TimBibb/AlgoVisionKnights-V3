import QuickSort from '../../visualizers/quicksort/quicksort';

let sort = new QuickSort();

test('small unsorted array should be produced in ascending order', () => {
    let [arr, steps, messages,pseudocodeArr] = sort.sort([3,2,1],[],0,0,[]);
    expect(arr).toStrictEqual([3,2,1]);
});

test('larger unsorted array should be produced in ascending order', () => {
    let [arr, steps, messages,pseudocodeArr] = sort.sort([5,4,3,2,1],[],0,0,[]);
    expect(arr).toStrictEqual([5,4,3,2,1]);
});

test('empty array should produce empty array', () => {
    let [arr, steps, messages,pseudocodeArr] = sort.sort([],[],0,0,[]);
    expect(arr).toStrictEqual([]);
});


test('single value array should produce single value array', () => {
    let [arr, steps, messages,pseudocodeArr] = sort.sort([1],[],0,0,[]);
    expect(arr).toStrictEqual([1]);
});
