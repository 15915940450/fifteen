/*
  * A* search algorithm：
  https://en.wikipedia.org/wiki/A*_search_algorithm


  https://www.redblobgames.com/pathfinding/a-star/introduction.html
  http://theory.stanford.edu/~amitp/GameProgramming/AStarComparison.html

  A* is a modification of Dijkstra’s Algorithm that is optimized for a single destination. Dijkstra’s Algorithm can find paths to all locations; A* finds paths to one location, or the closest of several locations. It prioritizes paths that seem to be leading closer to a goal.

  Compare the algorithms:
    Dijkstra’s Algorithm calculates the distance from the start point.
    Greedy Best-First Search estimates the distance to the goal point.
    A* is using the sum of those two distances.


  f(n)=g(n)+h(n)
    g = the movement cost to move from the starting point to a given square on the grid, following the path generated to get there.
    h = the estimated movement cost to move from that given square on the grid to the final destination.
        This is often referred to as the heuristic, which isnothing but a kind of smart guess. We really don’t know the actual distance until we find the path, because all sorts of things can be in the way (walls, water, etc.). There can be many ways to calculate this ‘h’ which are discussed in the later sections.


  The following pseudocode describes the algorithm:
  function reconstruct_path(cameFrom, current)
      total_path := {current}
      while current in cameFrom.Keys:
          current := cameFrom[current]
          total_path.append(current)
      return total_path

  function A_Star(start, goal)
      // The set of nodes already evaluated
      closedSet := {}

      // The set of currently discovered nodes that are not evaluated yet.
      // Initially, only the start node is known.
      openSet := {start}

      // For each node, which node it can most efficiently be reached from.
      // If a node can be reached from many nodes, cameFrom will eventually contain the
      // most efficient previous step.
      cameFrom := an empty map

      // For each node, the cost of getting from the start node to that node.
      gScore := map with default value of Infinity

      // The cost of going from start to start is zero.
      gScore[start] := 0

      // For each node, the total cost of getting from the start node to the goal
      // by passing by that node. That value is partly known, partly heuristic.
      fScore := map with default value of Infinity

      // For the first node, that value is completely heuristic.
      fScore[start] := heuristic_cost_estimate(start, goal)

      while openSet is not empty
          current := the node in openSet having the lowest fScore[] value
          if current = goal
              return reconstruct_path(cameFrom, current)

          openSet.Remove(current)
          closedSet.Add(current)

          for each neighbor of current
              if neighbor in closedSet
                  continue    // Ignore the neighbor which is already evaluated.

              // The distance from start to a neighbor
              tentative_gScore := gScore[current] + dist_between(current, neighbor)

              if neighbor not in openSet  // Discover a new node
                  openSet.Add(neighbor)
              else if tentative_gScore >= gScore[neighbor]
                  continue

              // This path is the best until now. Record it!
              cameFrom[neighbor] := current
              gScore[neighbor] := tentative_gScore
              fScore[neighbor] := gScore[neighbor] + heuristic_cost_estimate(neighbor, goal)


  (在极端情况下，当启发函数h(n)始终为0，则将由g(n)决定节点的优先级，此时算法就退化成了Dijkstra算法。
  //Dijkstra's algorithm, as another example of a uniform-cost search algorithm, can be viewed as a special case of A* where h(x) = 0 for all x.
  如果h(n)始终小于等于节点n到终点的代价，则A*算法保证一定能够找到最短路径。
  但是当h(n)的值越小，算法将遍历越多的节点，也就导致算法越慢。
  如果h(n)完全等于节点n到终点的代价，则A*算法将找到最佳路径，并且速度很快。
  可惜的是，并非所有场景下都能做到这一点。因为在没有达到终点之前，我们很难确切算出距离终点还有多远。
  如果h(n)的值比节点n到终点的代价要大，则A*算法不能保证找到最短路径，不过此时会很快。
  在另外一个极端情况下，如果h(n)相较于g(n)大很多，则此时只有h(n)产生效果，这也就变成了最佳优先搜索。
  由上面这些信息我们可以知道，通过调节启发函数我们可以控制算法的速度和精确度。因为在一些情况，我们可能未必需要最短路径，而是希望能够尽快找到一个路径即可。这也是A*算法比较灵活的地方。)

  //时空并不是无限可分的
*/

class Astar{
  constructor(){
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;
    this.eleCanvas=document.querySelector('#canvas');
    this.ctx=this.eleCanvas.getContext('2d');
    this.colorDefault='silver';
    this.colorSPT='#0077ee';
    this.colorOpenSet='lawngreen';
    this.colorClosedSet='black';
    this.d=20;  //網格單位長度

    this.n=-1;  //raf多少次
    this.interval=1; //每幀的間隔
    this.currentStep=-1; //當前。。。
    // this.rows=3;
    // this.cols=3;
    this.rows=(this.CH-50)/this.d>>0;
    this.cols=(this.CW-50)/this.d>>0;
    this.rate=.3;
    this.SPTw=3;

    this.adj=[];  //鄰接表

    this.result=[];
    this.SPT=[];  //最短路徑樹
    this.s=0; //開始位置
    this.closedSet=[];
    this.openSet=[];
    this.gScore=[];
    this.fScore=[];
    this.V=this.rows*this.cols; //頂點數
    this.E=0; //邊數

    this.complete=false;
  }
  init(){
    var i;
    this.eleCanvas.width=this.CW;
    this.eleCanvas.height=this.CH-4;

    this.initAdj();
    this.openSet.push(this.s);

    //無向圖
    this.doubleNeighbor();

    for(i=0;i<this.V;i++){
      this.gScore[i]=Infinity;
      this.fScore[i]=Infinity;
    }
    this.gScore[this.s]=0;
    this.fScore[this.s]=this.funHeuristic(this.s);

    //計算邊數
    for(i=0;i<this.V;i++){
      this.E+=this.adj[i].neighbor.length;
    }
    this.E=this.E/2;
  }
  doubleNeighbor(){
    var f=this;
    f.adj.forEach(function(v,index){
      f.findAllNeighbor(v.row,v.col).forEach(function(neighborIndex){
        var neightborHasV=f.adj[neighborIndex].neighbor.includes(index);
        var vNOThasNeighbor=!v.neighbor.includes(neighborIndex);
        if(neightborHasV && vNOThasNeighbor){
          v.neighbor.push(neighborIndex);
        }
      });
    });
    return f;
  }
  //啓發函數
  funHeuristic(index){
    return (3*this.calcDist(index,this.V-1)>>0);
  }
  //計算兩點之間的距離
  calcDist(v,w){
    var f=this;
    var x0=f.index2center(v).x;
    var y0=f.index2center(v).y;
    var x1=f.index2center(w).x;
    var y1=f.index2center(w).y;
    var d=Math.sqrt(Math.pow(x1-x0,2)+Math.pow(y1-y0,2));
    return (d);
  }

  //初始化鄰接表
  initAdj(){
    var f=this;
    for(var i=0;i<f.rows;i++){
      for(var j=0;j<f.cols;j++){
        var index=f.ij2index(i,j);
        var objV={
          index:index,
          row:i,
          col:j,
          neighbor:f.addNeighbor(i,j)
        };
        f.adj[index]=objV;
      }
    }
    return f;
  }
  //已知i，j求index（不存在則為-1）
  ij2index(i,j){
    var f=this;
    if(i<0 || j<0 || i>f.rows-1 || j>f.cols-1){
      return (-1);
    }
    return (i*f.cols+j);
  }
  //已知index求i，j,不存在則爲null
  index2ij(index){
    var f=this;
    if(index<0 || index>f.V-1){
      return null;
    }
    return ({
      i:index/f.cols>>0,
      j:index%f.cols
    });
  }
  //已知index求該頂點的中心點坐標
  index2center(index){
    var f=this;
    return ({
      x:f.d*f.adj[index].col+f.d/2,
      y:f.d*f.adj[index].row+f.d/2
    });
  }
  //查找該頂點的所有鄰居
  findAllNeighbor(i,j){
    //八個方向
    var arrDerection=[];

    //上
    arrDerection[0]=this.ij2index(i-1,j); //-1,0,1,2...
    //上-右
    arrDerection[1]=this.ij2index(i-1,j+1);
    //右
    arrDerection[2]=this.ij2index(i,j+1);
    //下-右
    arrDerection[3]=this.ij2index(i+1,j+1);
    //下
    arrDerection[4]=this.ij2index(i+1,j);
    //下-左
    arrDerection[5]=this.ij2index(i+1,j-1);
    //左
    arrDerection[6]=this.ij2index(i,j-1);
    //上-左
    arrDerection[7]=this.ij2index(i-1,j-1);

    //過濾掉-1
    return (arrDerection.filter(function(v){
      return (v+1);
    }));
  }
  //隨機添加鄰居（有向）
  addNeighbor(i,j){
    var f=this;
    var arrDerection=f.findAllNeighbor(i,j).filter(function(){
      return (Math.random()<f.rate);
    });

    return arrDerection;
  }


  // 算法
  solve(){
    var f=this;
    f.raf();
    return f;
  }
  //執行動畫
  raf(){
    var f=this;
    var rafCallback=function(){
      f.n++;
      //動畫終止條件
      if(!f.complete){
        if(!(f.n%f.interval)){
          //若n加了10, currentStep加了1
          f.currentStep=f.n/f.interval;
          f.doINeveryframe();
        }
        window.requestAnimationFrame(rafCallback);
      }else{
        f.success();
      }

      //每一幀都要繪圖
      f.draw();
    };
    window.requestAnimationFrame(rafCallback);
    return f;
  } //raf
  //成功時尋找路徑
  success(){
    var f=this;
    f.findPath();
    console.log('complete:::'+JSON.stringify(f.result));
    return f;
  }
  //尋找路徑
  findPath(end){
    var f=this;
    end=end || f.V-1;
    f.result=[];
    for(var i=f.SPT.length-1;i>=0;i--){
      var arrVertex=f.SPT[i].split('-');
      if(+arrVertex[1]===end){
        f.result.unshift(end);
        end=+arrVertex[0];
      }
    }
    f.result.unshift(f.s);
    return f;
  }
  //每一幀你要做點什麽？
  doINeveryframe(){
    var f=this;
    //處理openSet
    f.watchOpenSet();
    return f;
  }
  //openSet不爲空
  watchOpenSet(){
    if(!this.openSet.length){
      console.error('fail');
      this.complete=true;
      return false;
    }
    var f=this,tentativeGScore;

    //最低fScore分數的頂點
    f.openSet.sort(function(a,b){
      return (f.fScore[a]-f.fScore[b]); //a-b升序
    });

    var current=f.openSet.shift();

    f.closedSet.push(current);

    for(var i=0;i<f.adj[current].neighbor.length;i++){
      var neighbor=f.adj[current].neighbor[i];

      if(f.closedSet.includes(neighbor)){
        continue;
      }

      tentativeGScore=f.gScore[current]+f.calcDist(current,neighbor);

      if(!f.openSet.includes(neighbor)){
        f.openSet.push(neighbor);
      }else if(tentativeGScore>=f.gScore[neighbor]){
        continue;
      }

      f.SPT.push(current+'-'+neighbor);
      f.gScore[neighbor]=tentativeGScore;
      f.fScore[neighbor]=f.gScore[neighbor]+f.funHeuristic(neighbor);


      f.findPath(neighbor);

      //已經到達終點，結束算法
      if(neighbor===f.V-1){
        this.complete=true;
        return true;
      }

    }
    /*f.adj[current].neighbor.forEach(function(v){
      if(!f.closedSet.includes(v)){
        tentativeGScore=f.gScore[current]+f.calcDist(current,v);

        if(!f.openSet.includes(v)){
          f.openSet.push(v);
          if(tentativeGScore<f.gScore[v]){
            f.SPT[v]=current;
            f.gScore[v]=tentativeGScore;
            f.fScore[v]=f.gScore[v]+f.funHeuristic(v);
          }
        }


      }


    });*/


    return f;
  }

  draw(){
    var f=this,i;
    f.ctx.clearRect(0,0,f.CW,f.CH);
    f.ctx.translate(25.5,25.5);
    f.ctx.fillStyle=f.colorDefault;
    f.ctx.strokeStyle=f.colorDefault;
    f.ctx.lineWidth=1;
    f.ctx.font='13px "Microsoft JhengHei"';

    for(i=0;i<f.adj.length;i++){
      f.drawEdge(i);
    }
    for(i=0;i<f.adj.length;i++){
      f.drawVertex(i);
    }

    //繪製文字(頂點數以及邊數)
    f.ctx.fillStyle=f.colorClosedSet;
    var strVE=`頂點數V: ${f.V}, 邊數E: ${f.E}`;
    if(f.complete){
      strVE+='===> complete';
    }
    f.ctx.fillText(strVE,f.CW/2-2e2,-8);
    f.ctx.fill();
    f.ctx.fillStyle=f.colorDefault;

    f.ctx.translate(-25.5,-25.5);
    return f;
  }
  drawVertex(index){
    var f=this;
    f.ctx.beginPath();

    /*
    if(f.openSet.includes(index)){
      f.ctx.fillStyle=f.colorOpenSet;
      f.ctx.strokeStyle=f.colorOpenSet;
    }
    if(f.closedSet.includes(index)){
      f.ctx.fillStyle=f.colorClosedSet;
      f.ctx.strokeStyle=f.colorClosedSet;
    }
    if(f.complete && f.result.includes(index)){
      f.ctx.fillStyle=f.colorSPT;
      f.ctx.strokeStyle=f.colorSPT;
    }
    */


    //arc(x, y, radius, startAngle, endAngle, anticlockwise)
    f.ctx.arc(f.index2center(index).x,f.index2center(index).y,f.SPTw-1,0,2*Math.PI,true);
    f.ctx.fill();

    f.ctx.closePath();
    f.ctx.stroke();

    /*if(f.openSet.includes(index) || f.closedSet.includes(index)){
      f.ctx.fillStyle=f.colorDefault;
      f.ctx.strokeStyle=f.colorDefault;
    }*/
  }
  drawEdge(index){
    var f=this;

    //畫邊
    f.adj[index].neighbor.forEach(function(v){
      //避免重複繪製
      if(index<v){
        f.ctx.beginPath();
        if(f.result.includes(index) && f.result.includes(v)){
          f.ctx.lineWidth=f.SPTw;
          f.ctx.fillStyle=f.colorSPT;
          f.ctx.strokeStyle=f.colorSPT;
        }
        f.ctx.moveTo(f.index2center(index).x,f.index2center(index).y);
        f.ctx.lineTo(f.index2center(v).x,f.index2center(v).y);
        f.ctx.closePath();
        f.ctx.stroke();
        if(f.result.includes(index) && f.result.includes(v)){
          f.ctx.fillStyle=f.colorDefault;
          f.ctx.strokeStyle=f.colorDefault;
          f.ctx.lineWidth=1;
        }
      }
    });
    return f;
  }

} //class

var obj =new Astar();
obj.init();
obj.solve();
