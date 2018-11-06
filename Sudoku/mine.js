class Shudu{
  constructor(){
    //arr2d:宮
    this.arr2d=[
      [],[],[],
      [],[],[],
      [],[],[]
    ];
    //arrRC:行列
    this.arrRC=[[],[],[],[],[],[],[],[],[]];
    this.arr1_9=[1,2,3,4,5,6,7,8,9];
  }

  solve(){
    this.first159().fillGung().html();
  }
  fillGung(){
    var es6This=this;
    for(var gung=1;gung<=7;gung++){
      if(gung===4){
        continue;
      }
      es6This.fillCell(gung,0)
    }
    return es6This;
  }
  fillCell(gung,cell){
    if(cell===9){
      return true;
    }
    for(var num=1;num<=9;num++){
      if(!this.checkCanFill()){
        continue;
      }
      this.arr2d[gung][cell]=num;
      var nextCellCanFill=this.fillCell(gung,cell+1);
      if(!nextCellCanFill){
        this.arr2d[gung][cell]=0;
        continue;
      }
      // console.log("x"); //54個1填寫成功(9*[1,2,3,5,6,7].length)
      return true;
    }
    return false;
  }
  checkCanFill(){
    return true;
  }
  //宮159
  first159(){
    var es6This=this;
    for(var i=0;i<9;i++){
      for(var j=0;j<9;j++){
        es6This.arr2d[i][j]=0;
      }
    }
    es6This.arr2d[0]=_.shuffle(es6This.arr1_9);
    es6This.arr2d[4]=_.shuffle(es6This.arr1_9);
    es6This.arr2d[8]=_.shuffle(es6This.arr1_9);
    return es6This;
  }
  //變更arrRC使與arr2d相對應
  arrRCfromarr2d(){
    var es6This=this;
    es6This.arrRC[0]=[
      es6This.arr2d[0][0],
      es6This.arr2d[0][1],
      es6This.arr2d[0][2],
      es6This.arr2d[1][0],
      es6This.arr2d[1][1],
      es6This.arr2d[1][2],
      es6This.arr2d[2][0],
      es6This.arr2d[2][1],
      es6This.arr2d[2][2]
    ];
    es6This.arrRC[1]=[
      es6This.arr2d[0][3],
      es6This.arr2d[0][4],
      es6This.arr2d[0][5],
      es6This.arr2d[1][3],
      es6This.arr2d[1][4],
      es6This.arr2d[1][5],
      es6This.arr2d[2][3],
      es6This.arr2d[2][4],
      es6This.arr2d[2][5]
    ];
    es6This.arrRC[2]=[
      es6This.arr2d[0][6],
      es6This.arr2d[0][7],
      es6This.arr2d[0][8],
      es6This.arr2d[1][6],
      es6This.arr2d[1][7],
      es6This.arr2d[1][8],
      es6This.arr2d[2][6],
      es6This.arr2d[2][7],
      es6This.arr2d[2][8]
    ];
    es6This.arrRC[3]=[
      es6This.arr2d[3][0],
      es6This.arr2d[3][1],
      es6This.arr2d[3][2],
      es6This.arr2d[4][0],
      es6This.arr2d[4][1],
      es6This.arr2d[4][2],
      es6This.arr2d[5][0],
      es6This.arr2d[5][1],
      es6This.arr2d[5][2]
    ];
    es6This.arrRC[4]=[
      es6This.arr2d[3][3],
      es6This.arr2d[3][4],
      es6This.arr2d[3][5],
      es6This.arr2d[4][3],
      es6This.arr2d[4][4],
      es6This.arr2d[4][5],
      es6This.arr2d[5][3],
      es6This.arr2d[5][4],
      es6This.arr2d[5][5]
    ];
    es6This.arrRC[5]=[
      es6This.arr2d[3][6],
      es6This.arr2d[3][7],
      es6This.arr2d[3][8],
      es6This.arr2d[4][6],
      es6This.arr2d[4][7],
      es6This.arr2d[4][8],
      es6This.arr2d[5][6],
      es6This.arr2d[5][7],
      es6This.arr2d[5][8]
    ];
    es6This.arrRC[6]=[
      es6This.arr2d[6][0],
      es6This.arr2d[6][1],
      es6This.arr2d[6][2],
      es6This.arr2d[7][0],
      es6This.arr2d[7][1],
      es6This.arr2d[7][2],
      es6This.arr2d[8][0],
      es6This.arr2d[8][1],
      es6This.arr2d[8][2]
    ];
    es6This.arrRC[7]=[
      es6This.arr2d[6][3],
      es6This.arr2d[6][4],
      es6This.arr2d[6][5],
      es6This.arr2d[7][3],
      es6This.arr2d[7][4],
      es6This.arr2d[7][5],
      es6This.arr2d[8][3],
      es6This.arr2d[8][4],
      es6This.arr2d[8][5]
    ];
    es6This.arrRC[8]=[
      es6This.arr2d[6][6],
      es6This.arr2d[6][7],
      es6This.arr2d[6][8],
      es6This.arr2d[7][6],
      es6This.arr2d[7][7],
      es6This.arr2d[7][8],
      es6This.arr2d[8][6],
      es6This.arr2d[8][7],
      es6This.arr2d[8][8]
    ];
    // es6This.arrRC=[ 
    //   [ 8, 1, 2, 7, 5, 3, 6, 4, 9 ],
    //   [ 9, 4, 3, 6, 8, 2, 1, 7, 5 ],
    //   [ 6, 7, 5, 4, 9, 1, 2, 8, 3 ],
    //   [ 1, 5, 4, 2, 3, 7, 8, 9, 6 ],
    //   [ 3, 6, 9, 8, 4, 5, 7, 2, 1 ],
    //   [ 2, 8, 7, 1, 6, 9, 5, 3, 4 ],
    //   [ 5, 2, 1, 9, 7, 4, 3, 6, 8 ],
    //   [ 4, 3, 8, 5, 2, 6, 9, 1, 7 ],
    //   [ 7, 9, 6, 3, 1, 8, 4, 5, 2 ] 
    // ];
    return es6This;
  }

  html(){
    var es6This=this;
    //更新arrRC
    es6This.arrRCfromarr2d();

    var strHTML=es6This.TemplateHTML().join('');
    document.getElementById('container').innerHTML=strHTML;
    return es6This;
  }
  //字符串模板
  TemplateHTML(){
    var arr=this.arrRC.map(function(v1,i1){
      // console.log(v1);
      var strSpan=v1.map(function(v2){
        return `<span>${v2}</span>`;
      }).join('');
      return `<div class="r r${i1+1}">
                ${strSpan}
              </div>`;
    });
    return arr;
  }
} //class

var obj=new Shudu();
obj.solve();
// console.log(obj.arr2d);

// fori:
// for(var i=0;i<3;i++){
//   forj:
//   for(var j=0;j<5;j++){
//     console.log(i+'-'+j);
//     if(j===1){
//       break fori;
//     }
//   }
// }

// fori:
// for(var i=0;i<3;i++){
//   forj:
//   for(var j=0;j<5;j++){

//     if(j===1 || j===3){
//       continue;
//     }

//     console.log(i+'-'+j);
    
//   }
// }


// function test(){
//   var test=Math.random();
//   if(test>0.5){
//     return true;
//   }else{
//     console.log(test);
//     return false;
//   }
// }
// while(test()){
//   // console.log(9);
// }