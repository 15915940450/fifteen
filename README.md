# fifteen

localhost/fifteen/


### host=hostname and port

The HTMLHyperlinkElementUtils.port property is a USVString containing the port number of the URL. If the URL does not contain an explicit port number, it will be set to ''.

html,body,*{
  font-family: -apple-system,BlinkMacSystemFont,Avenir,"Avenir Next","Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
  font-size: 13px;
  font-weight: 100;
}

### algorithm
```
var arr=[1,5,9,0,4,0,5,1,3,8,24,9,4,5,6,4,3];
var arrSort=quicksort(arr);
_.logErr(arrSort,'arrSort');

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
```
