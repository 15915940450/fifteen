//https://www.bilibili.com/video/av4548773/?p=1
/*
* js注釋：
https://en.wikipedia.org/wiki/Maze_generation_algorithm
1.Make the initial cell the current cell and mark it as visited
2.While there are unvisited cells
  1.If the current cell has any neighbours which have not been visited
    1.Choose randomly one of the unvisited neighbours
    2.Push the current cell to the stack
    3.Remove the wall between the current cell and the chosen cell
    4.Make the chosen cell the current cell and mark it as visited
  2.Else if stack is not empty
    1.Pop a cell from the stack
    2.Make it the current cell
*/

class Labyrinth{
  constructor(){
    this.eleMaze=document.querySelector('#maze');
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;
    this.ctx=this.eleMaze.getContext('2d');

    this.w=50;
    this.grid=[];
    this.rows=4;
    this.cols=4;
  }

  init(){
    var es6This=this;
    es6This.eleMaze.width=es6This.CW;
    es6This.eleMaze.height=es6This.CH-4;

    for(var i=0;i<es6This.rows;i++){
      for(var j=0;j<es6This.cols;j++){
        es6This.grid.push({
          index:i*es6This.cols+j,
          row:i,
          col:j,
          walls:[true,true,true,true] //上，右，下，左
        });
      }
    }
    return es6This;
  }

  draw(){
    var es6This=this;
    var ctx=es6This.ctx;
    ctx.translate(30.5,30.5);
    ctx.moveTo(0,0);
    ctx.strokeStyle='snow';
    for(var i=0;i<es6This.grid.length;i++){
      var cell=es6This.grid[i];
      console.log(cell);
      ctx.beginPath();
      ctx.moveTo(cell.col*es6This.w,cell.row*es6This.w);
      ctx.lineTo((cell.col+1)*es6This.w,cell.row*es6This.w);
      ctx.lineTo((cell.col+1)*es6This.w,(cell.row+1)*es6This.w);
      ctx.lineTo(cell.col*es6This.w,(cell.row+1)*es6This.w);
      ctx.lineTo(cell.col*es6This.w,cell.row*es6This.w);
      ctx.stroke();
    }
    // ctx.closePath();
    return es6This;
  }

} //class

var obj=new Labyrinth();
obj.init().draw();


// var theNumber=50;
// Number.prototype.map=function(inRange,targetRange){
//   var stepA=inRange[1]-inRange[0];  //6
//   var stepB=targetRange[1]-targetRange[0];  //3
//   var result=(this-inRange[0])*stepB/stepA+targetRange[0];
//   return (result);
// };

// console.log(theNumber.map([0,100],[0,365]));
