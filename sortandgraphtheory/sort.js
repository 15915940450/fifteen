// 堆排序
import heapSort from './7.heapSort.js';

// 快速排序
// import quickSort from './6.quickSort.js';

// 歸併排序
// import mergeSort from './5.mergeSort.js';



/* 
测试数据:
// let arr = new Array(1000).fill(0).map((v, i) => i).sort(() => Math.random() - .5);
// console.log(arr)
*/
import { arr4testmini, arr4test } from './arr4test.js';
inputdata.innerHTML = JSON.stringify(arr4testmini);



let ELresult = document.querySelector('#outputresult');
// ELresult.innerHTML = arr4test;

let result = heapSort(arr4testmini);
// let result = quickSort(arr4testmini);
// let result = mergeSort(arr4testmini);
console.log('输出结果与输入数组是否相等？', arr4testmini === result, result, arr4testmini);
ELresult.innerHTML = result;