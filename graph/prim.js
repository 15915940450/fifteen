class Prim{
  constructor(){
    this.adj=[];
    this.currentV=-1;
  }
  // 132,5028,7563
  // 159,9206,8574
  init(){
    this.adj=[
      //v:0
      [
        {
          vertex:4,
          marked:false,
          edgeTo:-1,
          weight:38
        },
        {
          vertex:2,
          marked:false,
          edgeTo:-1,
          weight:26
        },
        {
          vertex:7,
          marked:false,
          edgeTo:-1,
          weight:16
        },
        {
          vertex:6,
          marked:false,
          edgeTo:-1,
          weight:58
        }
      ],
      // v:1
      [
        {
          vertex:5,
          marked:false,
          edgeTo:-1,
          weight:32
        },
        {
          vertex:7,
          marked:false,
          edgeTo:-1,
          weight:19
        },
        {
          vertex:2,
          marked:false,
          edgeTo:-1,
          weight:36
        },
        {
          vertex:3,
          marked:false,
          edgeTo:-1,
          weight:29
        }
      ],
      // v:2
      [
        {
          vertex:1,
          marked:false,
          edgeTo:-1,
          weight:36
        },
        {
          vertex:3,
          marked:false,
          edgeTo:-1,
          weight:17
        },
        {
          vertex:7,
          marked:false,
          edgeTo:-1,
          weight:34
        },
        {
          vertex:0,
          marked:false,
          edgeTo:-1,
          weight:26
        },
        {
          vertex:6,
          marked:false,
          edgeTo:-1,
          weight:40
        }

      ],
      // v:3
      [
        {
          vertex:1,
          marked:false,
          edgeTo:-1,
          weight:29
        },
        {
          vertex:2,
          marked:false,
          edgeTo:-1,
          weight:17
        }
      ],
      // v:4
      [
        {
          vertex:5,
          marked:false,
          edgeTo:-1,
          weight:35
        },
        {
          vertex:7,
          marked:false,
          edgeTo:-1,
          weight:37
        },
        {
          vertex:0,
          marked:false,
          edgeTo:-1,
          weight:38
        },
        {
          vertex:6,
          marked:false,
          edgeTo:-1,
          weight:93
        }
      ],
      // v:5
      [
        {
          vertex:4,
          marked:false,
          edgeTo:-1,
          weight:35
        },
        {
          vertex:1,
          marked:false,
          edgeTo:-1,
          weight:32
        },
        {
          vertex:7,
          marked:false,
          edgeTo:-1,
          weight:28
        }
      ],
      // v:6
      [
        {
          vertex:4,
          marked:false,
          edgeTo:-1,
          weight:93
        },
        {
          vertex:0,
          marked:false,
          edgeTo:-1,
          weight:58
        },
        {
          vertex:2,
          marked:false,
          edgeTo:-1,
          weight:40
        }
      ],
      // v:7
      [
        {
          vertex:5,
          marked:false,
          edgeTo:-1,
          weight:28
        },
        {
          vertex:4,
          marked:false,
          edgeTo:-1,
          weight:37
        },
        {
          vertex:0,
          marked:false,
          edgeTo:-1,
          weight:16
        },
        {
          vertex:2,
          marked:false,
          edgeTo:-1,
          weight:34
        },
        {
          vertex:1,
          marked:false,
          edgeTo:-1,
          weight:19
        }
      ]

    ];
  }

  solve(){
    var f=this;
    // console.log(f.adj);
    f.raf(10);
    return f;
  }
  raf(interval){
    interval=interval || 1;
    var f=this;
    var rafCallback=function(){
      f.currentV++;
      if(f.currentV<f.adj.length*interval){
        if(f.currentV%interval===0){
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
    console.log(f.currentV);
    return f;
  }

} //class

var obj=new Prim();
obj.init();
obj.solve();