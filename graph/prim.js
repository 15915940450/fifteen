class Prim{
  constructor(){
    this.n=-1;
    this.interval=1;
    this.adj=[];
    this.marked=[];
    this.currentV=0; //當前頂點索引
    this.queue=[];  //優先隊列
    this.MST=[];  //最小生成樹
  }
  // 132,5028,7563
  // 159,9206,8574
  init(){
    var i;
    this.adj=[
      //v:0
      [
        {
          vertex:4,
          weight:38
        },
        {
          vertex:2,
          weight:26
        },
        {
          vertex:7,
          weight:16
        },
        {
          vertex:6,
          weight:58
        }
      ],
      // v:1
      [
        {
          vertex:5,
          weight:32
        },
        {
          vertex:7,
          weight:19
        },
        {
          vertex:2,
          weight:36
        },
        {
          vertex:3,
          weight:29
        }
      ],
      // v:2
      [
        {
          vertex:1,
          weight:36
        },
        {
          vertex:3,
          weight:17
        },
        {
          vertex:7,
          weight:34
        },
        {
          vertex:0,
          weight:26
        },
        {
          vertex:6,
          weight:40
        }

      ],
      // v:3
      [
        {
          vertex:1,
          weight:29
        },
        {
          vertex:2,
          weight:17
        }
      ],
      // v:4
      [
        {
          vertex:5,
          weight:35
        },
        {
          vertex:7,
          weight:37
        },
        {
          vertex:0,
          weight:38
        },
        {
          vertex:6,
          weight:93
        }
      ],
      // v:5
      [
        {
          vertex:4,
          weight:35
        },
        {
          vertex:1,
          weight:32
        },
        {
          vertex:7,
          weight:28
        }
      ],
      // v:6
      [
        {
          vertex:4,
          weight:93
        },
        {
          vertex:0,
          weight:58
        },
        {
          vertex:2,
          weight:40
        }
      ],
      // v:7
      [
        {
          vertex:5,
          weight:28
        },
        {
          vertex:4,
          weight:37
        },
        {
          vertex:0,
          weight:16
        },
        {
          vertex:2,
          weight:34
        },
        {
          vertex:1,
          weight:19
        }
      ]

    ];
    for(i=0;i<this.adj.length;i++){
      this.marked[i]=false;
    }
  }

  //解決方案
  solve(){
    var f=this;
    f.raf();
    return f;
  }
  raf(){
    var f=this;
    var rafCallback=function(){
      f.n++;

      if(f.n<(f.adj.length-1)*f.interval){
        if(!(f.n%f.interval)){
          f.doINeveryframe();
        }
        window.requestAnimationFrame(rafCallback);
      }else{
        f.success();
      }
    };
    window.requestAnimationFrame(rafCallback);
    return f;
  } //raf
  success(){
    var f=this;
    var text=`success:MST:::(${f.MST.length})${JSON.stringify(f.MST)}============queue:::(${f.queue.length})${JSON.stringify(f.queue)}`;
    console.log(text);
    return f;
  }
  doINeveryframe(){
    var f=this;

    f.marked[f.currentV]=true;
    //鄰接表
    f.adj[f.currentV].forEach(function(v){
      if(!f.marked[v.vertex]){  //1.非樹頂點
        var inQueue=f.queue.find(function(objQueue){
          return (objQueue.vertex===v.vertex);
        });

        var edge=f.currentV+'-'+v.vertex;
        if(inQueue){
          //鄰接表的頂點 v 在隊列中
          //inQueue:{ vertex: 4, edge: "0-4", weight: 38 }
          //v:{ vertex: 4, weight: 37 }
          if(v.weight<inQueue.weight){
            inQueue.edge=edge;
            inQueue.weight=v.weight;
          }
        }else{
          //非樹頂點不在隊列中
          f.queue.push({
            vertex:v.vertex,
            edge:edge,
            weight:v.weight
          });
        }
      }

    });
    //優先隊列：去重，排序,驗證有效性
    f.sortANDuniq().check();

    //最小生成樹
    var currentEdge=f.queue.shift();
    this.MST.push(currentEdge);
    f.currentV=+currentEdge.edge.split('-')[1]; //7
    return f;
  }
  sortANDuniq(){
    var f=this;
    f.queue=f.uniq(f.queue,'edge');
    f.queue.sort(function(a,b){
      return (a.weight-b.weight);
    });


    return f;
  }
  //驗證隊列中的邊是否有效（這條邊的兩個頂點都已經訪問過：無效）
  check(){
    var f=this;
    f.queue=f.queue.filter(function(v){
      //{"edge":"0-7","weight":16}

      return !(v.edge.split('-').every(function(vertex){
        return (f.marked[vertex]);
      }));

      /* var v0=+v.edge.split('-')[0];
      var v1=+v.edge.split('-')[1];
      return !(f.marked[v0] && f.marked[v1]);*/
    });
    return f;
  }
  uniq(arr,k){
    var arrTemp=[],obj={},i;

    for(i=0;i<arr.length;i++){
      var v=arr[i];
      if(typeof(v)==='object'){
        v=arr[i][k];
      }
      if(!obj[v]){
        arrTemp.push(arr[i]);
        obj[v]=true;
      }
    }

    return arrTemp;
  }

} //class

var obj=new Prim();
obj.init();
obj.solve();
