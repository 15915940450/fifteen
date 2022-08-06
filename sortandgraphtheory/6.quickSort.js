/* 
https://github.com/hustcc/JS-Sorting-Algorithm/blob/master/6.quickSort.md
*/

function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left != 'number' ? 0 : left,
        right = typeof right != 'number' ? len - 1 : right;

    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
}

function partition(arr, left, right) {     // 分区操作
    var pivot = left,                      // 设定基准值（pivot）
        index = pivot + 1;
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index);
            index++;
        }
    }
    swap(arr, pivot, index - 1);
    return index - 1;
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function partition2(arr, low, high) {
    let pivot = arr[low];
    while (low < high) {
        while (low < high && arr[high] > pivot) {
            --high;
        }
        arr[low] = arr[high];
        while (low < high && arr[low] <= pivot) {
            ++low;
        }
        arr[high] = arr[low];
    }
    arr[low] = pivot;
    return low;
}

function quickSort2(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        let pivot = partition2(arr, low, high);
        quickSort2(arr, low, pivot - 1);
        quickSort2(arr, pivot + 1, high);
    }
    return arr;
}


export default quickSort;
// export default quickSort2;