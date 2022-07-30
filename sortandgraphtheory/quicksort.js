var arr=[1,5,9,0,4,0,5,1,3,8,24,9,4,5,6,4,3];
var arrSort=quicksort(arr);
console.log(arrSort.toString());
//0,0,1,1,3,3,4,4,4,5,5,5,6,8,9,9,24

function quicksort(arr){
  var arrSort=[];
  // ===================================
  //1.pivot
  var random=Math.floor(arr.length*Math.random());
  var pivot=arr[random];
  // console.log(pivot);

  //2.Partitioning
  var arrSmaller=[];
  var arrLarger=[];
  var arrEqual=[];

  for(var i=0;i<arr.length;i++){
    if(arr[i]<pivot){
      arrSmaller.push(arr[i]);
    }else if(arr[i]>pivot){
      arrLarger.push(arr[i]);
    }else{
      arrEqual.push(arr[i]);
    }
  }

  // arrSort=arrSmaller.concat(arrEqual,arrLarger);

  //3.Recursively
  if(arrSmaller.length>1){
    arrSmaller=quicksort(arrSmaller);
  }
  if(arrLarger.length>1){
    arrLarger=quicksort(arrLarger);
  }
  arrSort=arrSmaller.concat(arrEqual,arrLarger);
  // ===================================
  return arrSort;
}
