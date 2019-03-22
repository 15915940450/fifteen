class Prim{
  constructor(){
    this.n=-1;
    this.interval=10;
    this.adj=[];
    this.marked=[];
    this.currentV=-1; //當前頂點索引
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
      if(f.n<f.adj.length*f.interval){
        if(!(f.n%f.interval)){
          f.currentV=f.n/f.interval;
          f.doINeveryframe();
        }
        window.requestAnimationFrame(rafCallback);
      }
    };
    window.requestAnimationFrame(rafCallback);
    return f;
  } //raf
  doINeveryframe(){
    var f=this;

    // console.log(f.currentV);
    f.marked[f.currentV]=true;
    f.adj[f.currentV].forEach(function(v){
      var edge=v.vertex+'-'+f.currentV;
      if(+f.currentV<+v.vertex){
        edge=f.currentV+'-'+v.vertex;
      }
      f.queue.push({
        edge:edge,
        weight:v.weight
      }); //'0-4'
    });
    //優先隊列：去重，排序
    f.sortANDuniq();

    return f;
  }
  sortANDuniq(){
    var f=this;
    f.queue=f.uniq(f.queue,'edge');
    f.queue.sort(function(a,b){
      return (a.weight-b.weight);
    });
    console.log(JSON.stringify(f.queue));
    //最小生成樹
    this.MST.push(f.queue.shift());
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