class Shudu{
  constructor(){
    this.arr2d=[
      [],[],[],
      [],[],[],
      [],[],[]
    ];
    this.arr1_9=[1,2,3,4,5,6,7,8,9];
  }
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

  html(){
    var es6This=this;
    var arrHTML=[[],[],[],[],[],[],[],[],[]];
    arrHTML[0]=[
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
    arrHTML[1]=[
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
    arrHTML[2]=[
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
    arrHTML[3]=[
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
    arrHTML[4]=[
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
    arrHTML[5]=[
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
    arrHTML[6]=[
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
    arrHTML[7]=[
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
    arrHTML[8]=[
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


    var strHTML=es6This.TemplateHTML(arrHTML).join('');
    document.getElementById('container').innerHTML=strHTML;
    return es6This;
  }
  TemplateHTML(arrHTML){
    var arr=arrHTML.map(function(v1,i1){
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
obj.first159().html();
// console.log(obj.arr2d);