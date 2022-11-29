import BubbleSort from '../../visualizers/bubblesort/bubblesort';

let sort = new BubbleSort();

test('small unsorted array should be produced in ascending order', () => {
    let [array,pseudocodeArr,steps,messages] = sort.sort([3,2,1],0,3,0,[]);
    expect(array).toStrictEqual([1,2,3]);
});
test('large unsorted array should be produced in ascending array', () => {
    let [array,pseudocodeArr,steps,messages] = sort.sort([5,4,2,1,4],0,5,0,[]);
    expect(array).toStrictEqual([1,2,4,4,5]);
});
test('empty array should produce empty array', () => {
    let [array,pseudocodeArr,steps,messages] = sort.sort([],0,0,0,[]);
    expect(array).toStrictEqual([]);
});
test('single value array should produce single value array', () => {
    let [array,pseudocodeArr,steps,messages] = sort.sort([1],0,1,0,[]);
    expect(array).toStrictEqual([1]);
});


