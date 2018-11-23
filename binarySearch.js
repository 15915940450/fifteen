var arr=[1,5,9,159,450];
  console.log(bSearch(arr,159));

  function bSearch(arr,ele,low,high){
    var index=-1;
    low=low || 0;
    high=(high===undefined)?arr.length-1:high;

    //遞歸出口
    if(low>high){
      return -1;
    }

    var mid=(low+high)>>1;
    // var mid=Math.floor((low+high)/2);
    var midV=arr[mid];

    if(midV<ele){
      //右邊
      low=mid+1;
      index=bSearch(arr,ele,low,high);
    }else if(midV>ele){
      high=mid-1;
      index=bSearch(arr,ele,low,high);
    }else{
      index=mid;
    }

    return index;
  }