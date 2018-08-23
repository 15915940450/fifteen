//var arr=_.createArray(100);
var arr=[1,5,9,159,40,450];

//交換數組中下標為i1,i2的兩個元素
function exch(i1,i2,arr){
  var tmp;
  tmp=arr[i1];
  arr[i1]=arr[i2];
  arr[i2]=tmp;
  return arr;
}

//zero-based
function createHeap(arr){
  //最後一個擁有子節點的節點i與數組len關係：i=Math.floor(len/2)-1.
  var len=arr.length;
  var iLastParent=Math.floor(len/2)-1;
  var iChildLeft,iChildRight;
  //從最後一個父節點開始遞減到0（堆頂）
  for(var i=iLastParent;i>=0;i--){
    iChildLeft=2*i+1;
    iChildRight=2*i+2;
    switch(true){
      //左邊最大:1左邊有值，2左邊大於父節點，3右邊沒有值或者右邊值小於左邊值
      case ( iChildLeft<len && arr[i]<arr[iChildLeft] && (arr[iChildRight]<arr[iChildLeft] || iChildRight>len-1) ):
        exch(i,iChildLeft,arr);
        break;
      case ( iChildRight<len-1 && arr[i]<arr[iChildRight] && arr[iChildRight]>arr[iChildLeft] ):
        exch(i,iChildRight,arr);
        break;
      default:
        console.log(arr[i]+'最大,不需要交換');
    }
  }
}

createHeap(arr);

console.log(arr);
