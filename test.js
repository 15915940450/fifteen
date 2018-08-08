var arr=[1,5,9,159,40,450];

function exch(a,b,arr){
  var tmp;
  tmp=arr[a];
  arr[a]=arr[b];
  arr[b]=tmp;
  return arr;
}

console.log(exch(1,3,arr));
