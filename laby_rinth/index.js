//https://www.bilibili.com/video/av4548773/?p=1
/*
* js注釋：
https://en.wikipedia.org/wiki/Maze_generation_algorithm
A1.Make the initial cell the current cell and mark it as visited
A2.While there are unvisited cells
  B1.If the current cell has any neighbours which have not been visited
    C1.Choose randomly one of the unvisited neighbours
    C2.Push the current cell to the stack
    C3.Remove the wall between the current cell and the chosen cell
    C4.Make the chosen cell the current cell and mark it as visited
  B2.Else if stack is not empty
    D1.Pop a cell from the stack
    D2.Make it the current cell
*/

class Labyrinth{
  //basic要素
  constructor(){
    this.eleMaze=document.querySelector('#maze');
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;
    this.ctx=this.eleMaze.getContext('2d');

    this.w=50;
    this.grid=[]; //網格(包含cell)
    this.rows=10;
    this.cols=10;

    //STEP A1
    this.currentIndex=0;  //當前cell索引
    this.stack=[];

    this.n=0;
  }

  //初始化
  init(){
    var es6This=this;
    es6This.eleMaze.width=es6This.CW;
    es6This.eleMaze.height=es6This.CH-4;

    for(var i=0;i<es6This.rows;i++){
      for(var j=0;j<es6This.cols;j++){
        // console.log(i*es6This.cols+j);
        es6This.grid.push({
          index:i*es6This.cols+j,
          row:i,
          col:j,
          visited:false,  //是否訪問過
          neighbour:[], //鄰居
          walls:[true,true,true,true] //上，右，下，左
        });
      }
    }
    return es6This;
  }

  //動畫
  raf(){
    var es6This=this;
    var rafCallback=function(){
      //also time
      es6This.n++;
      if(es6This.n<1e4){
        es6This.dealGrid();
        es6This.draw();
        window.requestAnimationFrame(rafCallback);
      }
    };
    window.requestAnimationFrame(rafCallback);
    return es6This;
  }
  // 生成未訪問的鄰居數組
  checkNeighbour(){
    var es6This=this;
    var arr=[];

    //當前，上，右，下，左
    var currentCell=es6This.grid[es6This.currentIndex];
    var topNeighbour=es6This.grid[es6This.currentIndex-es6This.cols];
    var rightNeighbour=es6This.grid[es6This.currentIndex+1];
    var bottomNeighbour=es6This.grid[es6This.currentIndex+es6This.cols];
    var leftNeighbour=es6This.grid[es6This.currentIndex-1];

    if(currentCell.row && !topNeighbour.visited){
      arr.push(topNeighbour);  //上
    }
    if(currentCell.col!==es6This.cols-1 && !rightNeighbour.visited){
      arr.push(rightNeighbour);  //右
    }
    if(currentCell.row!==es6This.rows-1 && !bottomNeighbour.visited){
      arr.push(bottomNeighbour);  //下
    }
    if(currentCell.col && !leftNeighbour.visited){
      arr.push(leftNeighbour);  //左
    }
    return arr;
  }
  //處理grid數據
  dealGrid(){
    var es6This=this;
    //算法開始
    //STEP A1
    es6This.grid[es6This.currentIndex].visited=true;
    //STEP A2
    //STEP B1
    es6This.grid[es6This.currentIndex].neighbour=es6This.checkNeighbour();
    if(es6This.grid[es6This.currentIndex].neighbour.length){
      //STEP C1
      var randomly=(Math.random()*es6This.grid[es6This.currentIndex].neighbour.length)>>0;
      var randomlyOne=es6This.grid[es6This.currentIndex].neighbour[randomly];
      //STEP C2
      es6This.stack.push(es6This.grid[es6This.currentIndex]);
      //STEP C3

      //STEP C4
      es6This.currentIndex=randomlyOne.index;
    }
    return es6This;
  }
  //根據grid繪製canvas
  draw(){
    var es6This=this;
    var ctx=es6This.ctx;
    ctx.translate(30.5,30.5);
    ctx.clearRect(0,0,es6This.w*es6This.rows,es6This.w*es6This.cols);
    ctx.moveTo(0,0);
    ctx.strokeStyle='snow';
    for(var i=0;i<es6This.grid.length;i++){
      var cell=es6This.grid[i];
      //已訪問
      if(cell.visited){
        ctx.fillStyle='dimgray';
        ctx.fillRect(cell.col*es6This.w,cell.row*es6This.w,es6This.w,es6This.w);
      }
      if(cell.index===es6This.currentIndex){
        ctx.fillStyle='blueviolet';
        ctx.fillRect(cell.col*es6This.w,cell.row*es6This.w,es6This.w,es6This.w);
      }
      ctx.fillStyle='dimgray';
      // console.log(cell);
      ctx.beginPath();
      if(cell.walls[0]){
        //上邊
        ctx.moveTo(cell.col*es6This.w,cell.row*es6This.w);
        ctx.lineTo((cell.col+1)*es6This.w,cell.row*es6This.w);
      }
      if(cell.walls[1]){
        //右邊
        ctx.moveTo((cell.col+1)*es6This.w,cell.row*es6This.w);
        ctx.lineTo((cell.col+1)*es6This.w,(cell.row+1)*es6This.w);
      }
      if(cell.walls[2]){
        //下邊
        ctx.moveTo((cell.col+1)*es6This.w,(cell.row+1)*es6This.w);
        ctx.lineTo(cell.col*es6This.w,(cell.row+1)*es6This.w);
      }
      if(cell.walls[3]){
        //左邊
        ctx.moveTo(cell.col*es6This.w,(cell.row+1)*es6This.w);
        ctx.lineTo(cell.col*es6This.w,cell.row*es6This.w);
      }
      ctx.stroke();

    }
    // ctx.closePath();
    ctx.translate(-30.5,-30.5);
    return es6This;
  }

} //class

var obj=new Labyrinth();
obj.init().raf();


// var theNumber=50;
// Number.prototype.map=function(inRange,targetRange){
//   var stepA=inRange[1]-inRange[0];  //6
//   var stepB=targetRange[1]-targetRange[0];  //3
//   var result=(this-inRange[0])*stepB/stepA+targetRange[0];
//   return (result);
// };

// console.log(theNumber.map([0,100],[0,365]));
// var arr=[1,2,9];
// console.log(arr[-1]);