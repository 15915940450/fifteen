Array.prototype.isChongFu=function(){
  var bChongFu=false;
  var objTemp={};
  for(var i=0;i<this.length;i++){
    if(objTemp[this[i]]){
      bChongFu=true;   //重复
    }
    objTemp[this[i]]=1;
  }
  return bChongFu;
};
function findArr2(){
  var n1,n2,n3,n4,n5,n6,n7,n8,n9;
  var i=0;
  var arr2=[];
  for(n1=1;n1<=9;n1++){
    for(n2=1;n2<=9;n2++){
      for(n3=1;n3<=9;n3++){
        for(n4=1;n4<=9;n4++){
          for(n5=1;n5<=9;n5++){
            for(n6=1;n6<=9;n6++){
              for(n7=1;n7<=9;n7++){
                for(n8=1;n8<=9;n8++){
                  for(n9=1;n9<=9;n9++){
                    // 横
                    var equation1=(n1+n2+n3===15);
                    var equation2=(n4+n5+n6===15);
                    var equation3=(n7+n8+n9===15);
                    // 斜
                    var equation4=(n1+n5+n9===15);
                    var equation5=(n3+n5+n7===15);
                    // 竖
                    var equation6=(n1+n4+n7===15);
                    var equation7=(n2+n5+n8===15);
                    var equation8=(n3+n6+n9===15);
                    // 互异，不重复
                    var arr=[n1,n2,n3,n4,n5,n6,n7,n8,n9];
                    var condition9=!(arr.isChongFu());
                    if(equation1 && equation2 && equation3 && equation4 && equation5 && equation6 && equation7 && equation8 && condition9){
                      arr2.push(arr);
                    }
                    i++;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return arr2;
}
// console.time("shiwu");  //shiwu: 257112.83ms
// var arrAllPossibility=findArr2();
// console.timeEnd("shiwu");

var arrAllPossibility=[[2,7,6,9,5,1,4,3,8],[2,9,4,7,5,3,6,1,8],[4,3,8,9,5,1,2,7,6],[4,9,2,3,5,7,8,1,6],[6,1,8,7,5,3,2,9,4],[6,7,2,1,5,9,8,3,4],[8,1,6,3,5,7,4,9,2],[8,3,4,1,5,9,6,7,2]];
//view
$(function(){
  var arrWrap=$.map(arrAllPossibility,function(v1){
    var strTmp;
    var arrTmp=$.map(v1,function(v2,k2){
      var tmp2='<span class="i'+(k2+1)+'">'+v2+'</span>';
      return tmp2;
    });
    strTmp='<div class="wrap">'+arrTmp.join('')+'</div>';
    return strTmp;
  });
  $('#container').html(arrWrap.join(''));
});

//===================================END
