//https://www.bilibili.com/video/av4548773/?p=1
/*
* js注釋：
The depth-first search algorithm of maze generation is frequently implemented using backtracking: 
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

    this.w=20;
    this.grid=[]; //網格(包含cell)
    this.rows=(this.CH-100)/this.w>>0;
    this.cols=(this.CW-300)/this.w>>0;
    this.process=true;

    //STEP A1
    this.currentIndex=0;  //當前cell索引
    this.stack=[];

    this.complete=false;
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
        var falseFirst=true;
        var falseLast=true;
        if(i+j===0){
          falseFirst=false;
        }
        if(i===es6This.rows-1 && j===es6This.cols-1){
          falseLast=false;
        }
        es6This.grid.push({
          index:i*es6This.cols+j,
          row:i,
          col:j,
          visited:false,  //是否訪問過
          neighbour:[], //鄰居
          walls:[true,falseLast,true,falseFirst] //上，右，下，左
        });
      }
    }
    return es6This;
  }

  //動畫
  raf(){
    var es6This=this;
    var rafCallback=function(){
      es6This.n++;
      if(!es6This.complete){
        es6This.dealGrid();
        es6This.draw();
        window.requestAnimationFrame(rafCallback);
      }else{
        window.setTimeout(function(){
          window.location.reload(false);
        },1e5);
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
  //移除墻體
  removeWall(currentCell,chosenCell){
    var es6This=this;
    // console.log(chosenCell.row-currentCell.row);
    // console.log(chosenCell.col-currentCell.col);
    switch(chosenCell.row-currentCell.row){
    case 1:
      chosenCell.walls[0]=false;
      currentCell.walls[2]=false;
      break;
    case -1:
      chosenCell.walls[2]=false;
      currentCell.walls[0]=false;
      break;
    default:

    }

    switch(chosenCell.col-currentCell.col){
    case 1:
      chosenCell.walls[3]=false;
      currentCell.walls[1]=false;
      break;
    case -1:
      chosenCell.walls[1]=false;
      currentCell.walls[3]=false;
      break;
    default:
    
    }

    return es6This;
  }
  //處理grid數據
  dealGrid(){
    var es6This=this;
    //算法開始
    var currentCell=es6This.grid[es6This.currentIndex]; //currentCell
    //STEP A1
    currentCell.visited=true;
    //STEP A2
    //STEP B1
    currentCell.neighbour=es6This.checkNeighbour();
    if(currentCell.neighbour.length){
      //STEP C1
      var randomly=(Math.random()*currentCell.neighbour.length)>>0;
      var chosenCell=currentCell.neighbour[randomly]; //chosenCell
      //STEP C2
      es6This.stack.push(currentCell);
      //STEP C3
      es6This.removeWall(currentCell,chosenCell);
      //STEP C4
      es6This.currentIndex=chosenCell.index;
    }else if(es6This.stack.length){
      es6This.currentIndex=es6This.stack.pop().index;
    }else{
      es6This.complete=true;
      console.log(es6This.n);
    }
    return es6This;
  }
  //根據grid繪製canvas
  draw(){
    var es6This=this;
    var ctx=es6This.ctx;
    ctx.translate(130.5,30.5);
    ctx.clearRect(0,0,es6This.CW,es6This.CH);
    ctx.moveTo(0,0);
    ctx.strokeStyle='snow';
    //完成時
    var color='crimson';
    if(es6This.complete){
      color='midnightblue';
    }
    for(var i=0;i<es6This.grid.length;i++){
      var cell=es6This.grid[i];
      //已訪問
      if(cell.visited && es6This.process){
        ctx.fillStyle=color;
        ctx.fillRect(cell.col*es6This.w,cell.row*es6This.w,es6This.w+1,es6This.w+1);
      }
      //當前
      if(cell.index===es6This.currentIndex && es6This.process){
        ctx.fillStyle='snow';
        ctx.beginPath();
        ctx.arc(cell.col*es6This.w+es6This.w/2,cell.row*es6This.w+es6This.w/2,es6This.w/5,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
      }
      ctx.fillStyle=color;
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
    ctx.translate(-130.5,-30.5);
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