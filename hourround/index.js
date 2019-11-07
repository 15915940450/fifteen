// 132,5028,7563
// 159,9206,8574
class Basic{
  constructor(){
    this.n=-1;  //raf多少次
    this.interval=10; //每幀的間隔
    this.currentStep=-1; //當前。。。

    // https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage
    this.canvas=document.querySelector('#hourround');
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH4=document.documentElement.clientHeight || document.body.clientHeight;
  }

  init(){
    console.log('init');
    this.canvas.width=this.CW;
    this.canvas.height=this.CH4-4;
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
      if(f.n<1e1*f.interval){
        if(!(f.n%f.interval)){
          //若n加了10, currentStep加了1
          f.currentStep=f.n/f.interval;
          f.doINeveryframe();
        }
        window.requestAnimationFrame(rafCallback);
      }
    };
    window.requestAnimationFrame(rafCallback);
    return f;
  } //raf
  //每一幀你要做點什麽？
  doINeveryframe(){
    var f=this;
    var deg360=2*Math.PI; //一圈
    var deg30=deg360/12;  //每小时的度数
    console.log(f.currentStep);
    var ctx=f.canvas.getContext('2d');
    ctx.clearRect(0,0,f.CW,f.CH4-4);

    var center=400;
    var radius=200;
    var fontPX=15;
    var i;

    ctx.font=fontPX*2+'px serif';

    ctx.save();
    ctx.translate(center,center);
    for(i=0;i<12;i++){
      ctx.strokeStyle='black';
      ctx.beginPath();
      ctx.moveTo(0,0);

      //画弧
      ctx.arc(0,0,radius,(i-1)*deg30,i*deg30); //12 hour

      ctx.closePath();
      ctx.stroke();
    }

    ctx.fillStyle='silver';
    ctx.beginPath();
    ctx.moveTo(0,0);
    //画白圆
    ctx.arc(0,0,radius-fontPX+10,0,deg360);

    ctx.closePath();
    ctx.fill();

    for(i=0;i<12;i++){
      //画文字
      ctx.fillStyle='black';
      var hour=i || 12;
      var x=radius*Math.sin(deg30*i);
      var y=radius*Math.cos(deg30*i);
      ctx.fillText(hour,(x-fontPX)*0.88,(-y+fontPX)*0.88);
    }

    //秒针
    var degS=deg30;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.strokeStyle='red';
    ctx.arc(0,0,radius-60,degS,degS);
    ctx.closePath();
    ctx.stroke();

    //分针
    var degM=deg30*2;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.strokeStyle='blue';
    ctx.arc(0,0,radius-100,degM,degM);
    ctx.closePath();
    ctx.stroke();

    //时针
    var degH=0;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.strokeStyle='black';
    ctx.arc(0,0,radius-120,degH,degH);
    ctx.closePath();
    ctx.stroke();

    //画白圆
    ctx.fillStyle='red';
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.arc(0,0,5,0,deg360);

    ctx.closePath();
    ctx.fill();


    ctx.restore();

    // ctx.fill();
    // ctx.translate(-center,-center);

    return f;
  }

} //class

var obj=new Basic();
obj.init();
obj.solve();