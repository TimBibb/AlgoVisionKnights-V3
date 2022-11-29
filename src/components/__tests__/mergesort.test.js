import MergeSort from '../../visualizers/mergesort/mergesort';

let sort = new MergeSort();

test('small unsorted array should be produced in ascending order', () => {
    let [steps, messages, mergedIdArray,pseudocodeArr] = sort.sort([3,2,1],[1,2,3],0,[]);
    expect(mergedIdArray).toStrictEqual([3,2,1]);
});

test('larger unsorted array should be produced in ascending order', () => {
    let [steps, messages, mergedIdArray,pseudocodeArr] = sort.sort([5,4,3,2,1],[1,2,3,4,5],0,[]);
    
    expect(mergedIdArray).toStrictEqual([5,4,3,2,1]);
});

test('empty array should produce empty array', () => {
    let [steps, messages, mergedIdArray,pseudocodeArr] = sort.sort([],[],0,[]);
    expect(mergedIdArray).toStrictEqual([]);
});


test('single value array should produce single value array', () => {
    let [steps, messages, mergedIdArray,pseudocodeArr] = sort.sort([1],[],0,[]);
    expect(mergedIdArray).toStrictEqual([]);
});
