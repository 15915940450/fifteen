/*
* js注釋：
http://weblog.jamisbuck.org/2011/1/10/maze-generation-prim-s-algorithm
1.You start by marking a random cell:
2.Then, you simply iterate until the frontier set is empty:
3.Within the loop, we choose a frontier cell at random:
4.Then we choose a random “in” neighbor of that frontier cell:
5.Then, we record a passage from the neighbor cell to the frontier cell:
6.And finally, we mark the frontier cell as being “in” the maze (and add any of its outside neighbors to the frontier):
7.And you’re done! 

=========================================

Randomized Prim's algorithm
This algorithm is a randomized version of Prim's algorithm.

    A1.Start with a grid full of walls.
    A2.Pick a cell, mark it as part of the maze. Add the walls of the cell to the wall list.
    A3.While there are walls in the list:
        B1.Pick a random wall from the list. If only one of the two cells that the wall divides is visited, then:
            C1.Make the wall a passage and mark the unvisited cell as part of the maze.
            C2.Add the neighboring walls of the cell to the wall list.
        B2.Remove the wall from the list.

It will usually be relatively easy to find the way to the starting cell, but hard to find the way anywhere else.

Note that simply running classical Prim's on a graph with random edge weights would create mazes stylistically identical to Kruskal's, because they are both minimal spanning tree algorithms.
*/

class Maze{
  //basic要素
  constructor(){
    this.eleMaze=document.querySelector('#maze');
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;
    this.ctx=this.eleMaze.getContext('2d');

    this.w=200;
    this.grid=[]; //網格(包含cell)
    this.rows=(this.CH-100)/this.w>>0;
    this.cols=(this.CW-300)/this.w>>0;

    this.adjacentFrontier=[]; //sure is visited(最重要的數據)
    this.complete=false;

    this.n=0;
  }

  init(){
    var es6This=this;
    es6This.eleMaze.width=es6This.CW;
    es6This.eleMaze.height=es6This.CH-4;

    for(var i=0;i<es6This.rows;i++){
      for(var j=0;j<es6This.cols;j++){
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
          visited:false,
          walls:[true,falseLast,true,falseFirst] //上，右，下，左
        });
      }
    }

    //STEP1
    es6This.adjacentFrontier.push(es6This.getRandomOne(es6This.grid));
    es6This.adjacentFrontier[0].visited=true;
    return es6This;
  }
  //從數組中隨機選擇一個元素
  getRandomOne(arr){
    return (arr[Math.random()*arr.length>>0]);
  }
  //檢測是否生成完成
  checkIsComplete(){
    var es6This=this;
    var isComplete=es6This.grid.every(function(v){
      return (v.visited);
    });
    return isComplete;
  }
  // 生成未訪問的鄰居數組
  checkNeighbour(objCell){
    var es6This=this;
    var arr=[];

    //當前，上，右，下，左
    var topNeighbour=es6This.grid[objCell.index-es6This.cols];
    var rightNeighbour=es6This.grid[objCell.index+1];
    var bottomNeighbour=es6This.grid[objCell.index+es6This.cols];
    var leftNeighbour=es6This.grid[objCell.index-1];

    if(objCell.row && !topNeighbour.visited){
      arr.push(topNeighbour);  //上
    }
    if(objCell.col!==es6This.cols-1 && !rightNeighbour.visited){
      arr.push(rightNeighbour);  //右
    }
    if(objCell.row!==es6This.rows-1 && !bottomNeighbour.visited){
      arr.push(bottomNeighbour);  //下
    }
    if(objCell.col && !leftNeighbour.visited){
      arr.push(leftNeighbour);  //左
    }
    return arr;
  }
  //隨機選擇frontier
  chooseRandomFrontier(objCell){
    var es6This=this;
    var neighbors=es6This.checkNeighbour(objCell);
    return (es6This.getRandomOne(neighbors));
  }
  //移除墻體
  removeWall(currentCell,chosenCell){
    var es6This=this;
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
  dealGrid(){
    var es6This=this;
    // STEP2
    if(!es6This.checkIsComplete()){
      // STEP3&4
      var randomAdjacent=es6This.getRandomOne(es6This.adjacentFrontier);
      var randomFrontier=es6This.chooseRandomFrontier(randomAdjacent);
      // STEP5
      es6This.removeWall(randomAdjacent,randomFrontier);
      // STEP6
      randomFrontier.visited=true;
      //can not just push
      es6This.adjacentFrontier.push(randomFrontier);
      //need to filter
      es6This.adjacentFrontier=es6This.adjacentFrontier.filter(function(v){
        return (es6This.checkNeighbour(v).length);
      });
      
    }else{
      es6This.complete=true;
    }
    return es6This;
  }
  //動畫
  raf(){
    var es6This=this;
    var rafCallback=function(){
      es6This.n++;
      // console.log(es6This.n);
      if(!es6This.complete){
        es6This.dealGrid();
        es6This.draw();
        window.requestAnimationFrame(rafCallback);
      }else{
        console.log('complete');
      }
    };
    window.requestAnimationFrame(rafCallback);
    return es6This;
  }

  //根據grid繪製canvas
  draw(){
    var es6This=this;
    var ctx=es6This.ctx;
    ctx.translate(130.5,30.5);
    ctx.clearRect(0,0,es6This.CW,es6This.CH);
    ctx.moveTo(0,0);
    ctx.strokeStyle='black';
    
    var color='lawngreen';
    //完成時
    if(es6This.complete){
      color='snow';
    }
    
    for(var i=0;i<es6This.grid.length;i++){
      var cell=es6This.grid[i];
      
      //已訪問
      if(cell.visited){
        ctx.fillStyle=color;
        ctx.fillRect(cell.col*es6This.w,cell.row*es6This.w,es6This.w+1,es6This.w+1);
      }

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

var obj=new Maze();
obj.init().raf();
