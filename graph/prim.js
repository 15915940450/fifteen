class Prim{
  constructor(){
    this.n=-1;
    this.interval=1;
    this.adj=[];
    this.marked=[];
    this.currentV=0; //當前頂點索引
    this.queue=[];  //優先隊列
    this.MST=[];
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

  solve(){
    var f=this;
    // console.log(f.adj);
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
    console.log(JSON.stringify(f.MST));
    //[{"edge":"0-7","weight":16},{"edge":"7-1","weight":19},{"edge":"0-2","weight":26},{"edge":"2-3","weight":17},{"edge":"7-5","weight":28},{"edge":"5-4","weight":35},{"edge":"2-6","weight":40}]
    return f;
  }
  doINeveryframe(){
    var f=this;

    // console.log(f.currentV);
    f.marked[f.currentV]=true;
    //鄰接表
    f.adj[f.currentV].forEach(function(v){
      //已訪問的不添加
      if(!f.marked[v.vertex]){
        var edge=f.currentV+'-'+v.vertex;

        f.queue.push({
          edge:edge,
          weight:v.weight
        }); //'0-7'
      }
      
    });
    //優先隊列：去重，排序
    f.sortANDuniq().varify();

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
  //驗證隊列中的變是否有效
  varify(){
    var f=this;
    f.queue=f.queue.filter(function(v){
      //{"edge":"0-7","weight":16}
      /* var v0=+v.edge.split('-')[0];
      var v1=+v.edge.split('-')[1];
      return !(f.marked[v0] && f.marked[v1]);*/
      /*if(f.marked[v0] && f.marked[v1]){
        console.log(v.edge);
      }*/
      return !(v.edge.split('-').every(function(vertex){
        return (f.marked[vertex]);
      }));
    });
    // console.log(JSON.stringify(f.queue));
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
