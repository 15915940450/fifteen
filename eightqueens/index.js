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
  constructor(){}

  solve(){
    var es6This=this;
  
    return es6This;
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
obj.solve().html();