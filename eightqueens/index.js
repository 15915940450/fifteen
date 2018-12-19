// console.log('Eight queens');

// function queen(a,cur){
//   if(cur==a.length){console.log(a);return;}
//   for(var i=0;i<a.length;i++){
//     a[cur]=i;flag=true;
//     for(var j=0;j<cur;j++){
//       var ab=i-a[j];
//       if(a[j]==i||(ab>0?ab:-ab)==cur-j){flag=false;break;}
//     }
//     if(flag){queen(a,cur+1);}
//   }
// }
// queen([1,1,1,1,1,1,1,1],0);


class EightQueens{
  constructor(){
    this.result=[];
    this.okay=false;
    this.arrColIndex=[0,1,2,3,4,5,6,7];
  }
  shuffle(arr){
    var es6This=this;
    arr=arr || es6This.arrColIndex;
    for(var i=0;i<arr.length;i++){
      var eleLastI=arr[arr.length-i-1];
      var randomNum=Math.floor(Math.random()*(arr.length-i));
      arr[arr.length-i-1]=arr[randomNum];
      arr[randomNum]=eleLastI;
    }
    // console.log(arr);
    return arr;
  }

  //解決方案
  solve(){
    var es6This=this;
    es6This.okay=es6This.tryrow(0);
    console.log(es6This.okay);
    return es6This;
  }
  //一行一行來試
  tryrow(row){
    var es6This=this;
    if(row>=8){
      return true;
    }
    var arrColIndexRandom=es6This.arrColIndex;
    // var arrColIndexRandom=es6This.shuffle();
    //每一行裏的操作：一列一列的試
    for(var col=0;col<8;col++){
      var colReal=arrColIndexRandom[col];
      //八皇后的解
      this.result[row]=colReal;
      var isPassCurrent=es6This.check(row,colReal);
      if(!isPassCurrent){
        //下一列
        continue;
      }


      //下一行
      var isPassNext=es6This.tryrow(row+1);
      if(!isPassNext){
        es6This.result.length=row;
        console.log('回溯:',es6This.result);
        //回溯,下一列
        continue;
      }
      return true;
    }

    

    return false;
  }
  //檢查this.result[row]下是否可行，沒有被攻擊
  check(row,col){
    var es6This=this;
    
    // console.log(es6This.result.slice(0,-1));
    // console.log(JSON.stringify(es6This.result));

    //1.列
    // if(es6This.result.slice(0,-1).includes(col)){
    //   return false;
    // }
    //2.45deg(有一些)
    var check45=es6This.result.slice(0,-1).some(function(v,i){
      //已存在的點(v,i)與 當前點(col,row)
      var cot=(col-v)/(row-i);
      var arrCot=[0,-1,1];
      return (arrCot.includes(cot));
    });
    if(check45){
      return false;
    }
    //3.135deg(有一些)
    // var check135=es6This.result.slice(0,-1).some(function(v,i){
    //   return (i-row===col-v);
    // });
    // if(check135){
    //   return false;
    // }

    return true;
  }
  result2cell(){
    var es6This=this;
    var arrCellIndex=es6This.result.map(function(v,i){
      return (i*8+v);
    });
    return arrCellIndex;
  }
  //DOM
  html(){
    var es6This=this;
    var arrCellIndex=es6This.result2cell();
    var arr=[];
    arr.length=64;
    var strHTML=arr.fill(0).map(function(v,i){
      var red=arrCellIndex.includes(i)?'red':''
      //i&1^i>>>3&1  偶數行奇數列或奇數行偶數列
      return (`<div class="${i&1^i>>>3&1?'black':''} ${red}"></div>`);
    }).join('');
    document.getElementById('wrap').innerHTML=strHTML;
    return es6This;
  }
}

var obj=new EightQueens();
obj.solve().html();
console.log(obj.result);
