class Shudu{
  constructor(){
    //arrGung:宮
    this.arrGung=[
      [],[],[],
      [],[],[],
      [],[],[]
    ];
    //arrRow:行
    this.arrRow=[[],[],[],[],[],[],[],[],[]];
    this.arrCol=[[],[],[],[],[],[],[],[],[]];
    this.arr1_9=[1,2,3,4,5,6,7,8,9];
    this.for=0;
    this.okay=true;
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
      var fillCellSuccess=es6This.fillCell(gung,0);
      if(!fillCellSuccess){
        es6This.okay=false;
        break;
      }
    }
    if(!es6This.okay){
      // es6This.fillGung();
    }

    return es6This; //return true;
  }
  fillCell(gung,cell){
    if(cell===9){
      return true;
    }
    for(var num=1;num<=9;num++){
      // console.log("for");
      this.for++;
      this.arrGung[gung][cell]=num;
      if(!this.checkCanFill(gung,cell,num)){
        this.arrGung[gung][cell]=0;
        continue;
      }
      var nextCellCanFill=this.fillCell(gung,cell+1);
      if(!nextCellCanFill){
        this.arrGung[gung][cell]=0;
        continue;
      }
      // console.log("for return"); //54個1填寫成功(9*[1,2,3,5,6,7].length)
      return true;
    }
    return false;
  }
  //檢查當前位置（gung,cell）是否可以填寫數字num(num)
  checkCanFill(gung,cell,num){
    // console.log(JSON.stringify(this.arrGung));
    // if(this.arrGung[gung][cell]===0){
    //   return false;
    // }
    var can=true;
    //行數據不能重複
    can=this.arrGung.every(function(v){
      //所有行都不重複就爲真
      v=_.compact(v);
      var vUniq=_.uniq(v);
      return v.length===vUniq.length;
    });
    this.arrRowfromarrGung();
    var can2=this.arrRow.every(function(v){
      //所有行都不重複就爲真
      v=_.compact(v);
      var vUniq=_.uniq(v);
      return v.length===vUniq.length;
    });
    // console.log(can2);
    this.arrColfromarrRow();
    var can3=this.arrCol.every(function(v){
      //所有列都不重複就爲真
      v=_.compact(v);
      var vUniq=_.uniq(v);
      return v.length===vUniq.length;
    });

    return (can && can2 && can3);
  }
  //宮159
  first159(){
    var es6This=this;
    for(var i=0;i<9;i++){
      for(var j=0;j<9;j++){
        es6This.arrGung[i][j]=0;
      }
    }
    es6This.arrGung[0]=_.shuffle(es6This.arr1_9);
    es6This.arrGung[4]=_.shuffle(es6This.arr1_9);
    es6This.arrGung[8]=_.shuffle(es6This.arr1_9);
    return es6This;
  }
  //變更arrRow使與arrGung相對應
  arrRowfromarrGung(){
    var es6This=this;
    es6This.arrRow[0]=[
      es6This.arrGung[0][0],
      es6This.arrGung[0][1],
      es6This.arrGung[0][2],
      es6This.arrGung[1][0],
      es6This.arrGung[1][1],
      es6This.arrGung[1][2],
      es6This.arrGung[2][0],
      es6This.arrGung[2][1],
      es6This.arrGung[2][2]
    ];
    es6This.arrRow[1]=[
      es6This.arrGung[0][3],
      es6This.arrGung[0][4],
      es6This.arrGung[0][5],
      es6This.arrGung[1][3],
      es6This.arrGung[1][4],
      es6This.arrGung[1][5],
      es6This.arrGung[2][3],
      es6This.arrGung[2][4],
      es6This.arrGung[2][5]
    ];
    es6This.arrRow[2]=[
      es6This.arrGung[0][6],
      es6This.arrGung[0][7],
      es6This.arrGung[0][8],
      es6This.arrGung[1][6],
      es6This.arrGung[1][7],
      es6This.arrGung[1][8],
      es6This.arrGung[2][6],
      es6This.arrGung[2][7],
      es6This.arrGung[2][8]
    ];
    es6This.arrRow[3]=[
      es6This.arrGung[3][0],
      es6This.arrGung[3][1],
      es6This.arrGung[3][2],
      es6This.arrGung[4][0],
      es6This.arrGung[4][1],
      es6This.arrGung[4][2],
      es6This.arrGung[5][0],
      es6This.arrGung[5][1],
      es6This.arrGung[5][2]
    ];
    es6This.arrRow[4]=[
      es6This.arrGung[3][3],
      es6This.arrGung[3][4],
      es6This.arrGung[3][5],
      es6This.arrGung[4][3],
      es6This.arrGung[4][4],
      es6This.arrGung[4][5],
      es6This.arrGung[5][3],
      es6This.arrGung[5][4],
      es6This.arrGung[5][5]
    ];
    es6This.arrRow[5]=[
      es6This.arrGung[3][6],
      es6This.arrGung[3][7],
      es6This.arrGung[3][8],
      es6This.arrGung[4][6],
      es6This.arrGung[4][7],
      es6This.arrGung[4][8],
      es6This.arrGung[5][6],
      es6This.arrGung[5][7],
      es6This.arrGung[5][8]
    ];
    es6This.arrRow[6]=[
      es6This.arrGung[6][0],
      es6This.arrGung[6][1],
      es6This.arrGung[6][2],
      es6This.arrGung[7][0],
      es6This.arrGung[7][1],
      es6This.arrGung[7][2],
      es6This.arrGung[8][0],
      es6This.arrGung[8][1],
      es6This.arrGung[8][2]
    ];
    es6This.arrRow[7]=[
      es6This.arrGung[6][3],
      es6This.arrGung[6][4],
      es6This.arrGung[6][5],
      es6This.arrGung[7][3],
      es6This.arrGung[7][4],
      es6This.arrGung[7][5],
      es6This.arrGung[8][3],
      es6This.arrGung[8][4],
      es6This.arrGung[8][5]
    ];
    es6This.arrRow[8]=[
      es6This.arrGung[6][6],
      es6This.arrGung[6][7],
      es6This.arrGung[6][8],
      es6This.arrGung[7][6],
      es6This.arrGung[7][7],
      es6This.arrGung[7][8],
      es6This.arrGung[8][6],
      es6This.arrGung[8][7],
      es6This.arrGung[8][8]
    ];
    // es6This.arrRow=[ 
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
  //變更arrRow使與arrRow相對應
  arrColfromarrRow(){
    var es6This=this;
    es6This.arrRow.forEach(function(vRow,rowIndex){
      vRow.forEach(function(vCell,cellIndex){
        es6This.arrCol[rowIndex][cellIndex]=es6This.arrRow[cellIndex][rowIndex];
      });
    });
    return es6This;
  }

  html(){
    var es6This=this;
    //更新arrRow
    es6This.arrRowfromarrGung();

    var strHTML=es6This.TemplateHTML().join('');
    document.getElementById('container').innerHTML=strHTML;
    console.log(this.for);
    console.log(this.okay);
    return es6This;
  }
  //字符串模板
  TemplateHTML(){
    var arr=this.arrRow.map(function(v1,i1){
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
// console.log(obj.arrGung);

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

// var xx=[1,2,0,0];
// xx=_.compact(xx);
// console.log(xx);