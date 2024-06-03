var arr = [1, 5, 9, 159, 450];
console.log(bSearch(arr, 159));

function bSearch(arr, ele, low, high) {
  var index = -1;
  low = low || 0;
  high = high === undefined ? arr.length - 1 : high;

  //遞歸出口
  if (low > high) {
    return -1;
  }

  var mid = (low + high) >> 1;
  // var mid=Math.floor((low+high)/2);
  var midV = arr[mid];

  if (midV < ele) {
    //右邊
    low = mid + 1;
    index = bSearch(arr, ele, low, high);
  } else if (midV > ele) {
    high = mid - 1;
    index = bSearch(arr, ele, low, high);
  } else {
    index = mid;
  }

  return index;
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search0 = function (nums, target) {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    let mid = (l + r) >> 1;
    if (nums[mid] < target) {
      l = mid + 1;
    }
    if (nums[mid] > target) {
      r = mid - 1;
    }
    if (nums[mid] === target) {
      return mid;
    }
  }
  return -1;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let result = -1;

  let len = nums.length;
  let left = 0;
  let right = len;

  // 左闭右开
  while (left < right) {
    let indexMid = ~~((left + right) / 2);
    if (nums[indexMid] < target) {
      left = indexMid + 1;
    }
    if (nums[indexMid] > target) {
      right = indexMid;
    }
    if (nums[indexMid] === target) {
      return indexMid;
    }
  }

  return result;
};
