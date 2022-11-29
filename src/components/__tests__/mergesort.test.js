import MergeSort from '../../visualizers/mergesort/mergesort';

let sort = new MergeSort();

test('small unsorted array should be produced in ascending order', () => {
    let [steps, messages, mergedIdArray,pseudocodeArr] = sort.sort([3,2,1],[1,2,3],0,[]);
    console.log(mergedIdArray);
    expect(mergedIdArray).toStrictEqual([3,2,1]);
});

test('larger unsorted array should be produced in ascending order', () => {
    let [steps, messages, mergedIdArray,pseudocodeArr] = sort.sort([5,4,3,2,1],[1,2,3,4,5],0,[]);
    console.log(mergedIdArray);
    expect(mergedIdArray).toStrictEqual([5,4,3,2,1]);
});

// test('large unsorted array should be produced in ascending array', () => {
//     var [array,pseudocodeArr,steps,messages] = sort.sort([5,4,2,1,4],[],0,[]);
//     expect(array).toStrictEqual([1,2,4,4,5]);
// });


// test('empty array should produce empty array', () => {
//     var [array,pseudocodeArr,steps,messages] = sort.sort([],[],0,[]);
//     expect(array).toStrictEqual([]);
// });


// test('single value array should produce single value array', () => {
//     var [array,pseudocodeArr,steps,messages] = sort.sort([1],[],0,[]);
//     expect(array).toStrictEqual([1]);
// });
