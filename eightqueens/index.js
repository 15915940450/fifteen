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
    this.result=[-1,-1,-1,-1,-1,-1,-1,-1];
    this.okay=false;
  }

  solve(){
    var es6This=this;
    es6This.okay=es6This.tryrow(0);
    console.log(es6This.okay);
    return es6This;
  }
  tryrow(row){
    var es6This=this;
    if(row>=8){
      return true;
    }

    for(var col=0;col<8;col++){
      var isPassCurrent=es6This.check(row,col);
      if(!isPassCurrent){
        continue;
      }


      //下一行
      var isPassNext=es6This.tryrow(row+1);
      if(!isPassNext){
        //回溯
        continue;
      }
      return true;
    }

    

    return false;
  }
  check(){
    var es6This=this;
  
    return true;
  }
  html(){
    var es6This=this;
    var arr=[];
    arr.length=64;
    var strHTML=arr.fill(0).map(function(v,i){
      return (`<div class="${i&1^i>>>3&1?'black':''}"></div>`);
    }).join('');
    document.getElementById('wrap').innerHTML=strHTML;
    return es6This;
  }
}

var obj=new EightQueens();
obj.solve();