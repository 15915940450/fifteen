// 132,5028,7563
// 159,9206,8574
class Basic{
  constructor(){
    this.n=-1;  //raf多少次
    this.interval=1; //每幀的間隔
    this.currentStep=-1; //當前。。。

    // https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage
    this.canvas=document.querySelector('#hourround');
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH4=document.documentElement.clientHeight || document.body.clientHeight;

    this.dayS=24*60*60; //86400-60
    this.arrStep=[];
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
      if(f.n<f.dayS*f.interval){
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
    // console.log(f.currentStep);
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
    var degS=f.calcS().degS;
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.strokeStyle='red';
    ctx.arc(0,0,radius+190,degS,degS);
    ctx.closePath();
    ctx.stroke();

    //分针
    var degM=f.calcM().degM;
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.strokeStyle='blue';
    ctx.arc(0,0,radius+50,degM,degM);
    ctx.closePath();
    ctx.stroke();

    //时针
    var degH=f.calcH().degH;
    ctx.lineWidth=5;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.strokeStyle='black';
    ctx.arc(0,0,radius+20,degH,degH);
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

    f.check(f.calcH().degHH,f.calcM().degMM,f.calcS().degSS);
    /*

    canvas api


    var ctx = canvas.getContext('2d');
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.fill();
    ctx.stroke();
    ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);
    ctx.stroke(circle);
    ctx.fill(circle);

    ctx.fillStyle = "orange";
    ctx.strokeStyle = "orange";
    ctx.lineWidth = "orange";
    ctx.font = "48px serif";
    ctx.fillText("Hello world", 10, 50);
    ctx.save(); 
    ctx.restore();
    ctx.translate(100,100);
    ctx.rotate(Math.PI/2);
    ctx.scale(10, 3);
    ctx.clip();

    */
    return f;
  }
  // 计算秒针的弧度
  calcS(step){
    var f=this;
    step=step || f.currentStep;
    var deg360=2*Math.PI; //一圈
    var degPer=deg360/60;  //秒针走一圈（60秒）共360度
    //每秒钟6度(deg360/60)
    var degS=(step%60)*degPer-deg360/4;
    var degSS=(step%60)*360/60;
    return {
      degS:degS,
      degSS:degSS
    };
  }
  calcM(step){
    var f=this;
    step=step || f.currentStep;
    var deg360=2*Math.PI; //一圈
    var degPer=deg360/60;
    var degM=(step%(60*60))*degPer/60-deg360/4;
    var degMM=(step%(60*60))*360/60/60;
    return {
      degM:degM,
      degMM:degMM
    };
  }
  calcH(step){
    var f=this;
    step=step || f.currentStep;
    var deg360=2*Math.PI; //一圈
    var degPer=deg360/60;
    var degH=(step%(60*60*12))*degPer/60/12-deg360/4;
    var degHH=(step%(60*60*12))*360/60/60/12;
    return {
      degH:degH,
      degHH:degHH
    };
  }
  //检测重合
  check(degHH,degMM){
    var f=this;
    // console.log(degHH,degMM,degSS);
    if(Math.abs(degHH-degMM)<0.1){
      console.log(f.currentStep);
      if(!f.arrStep.length || f.currentStep-_.last(f.arrStep).step>5){
        f.arrStep.push({
          step:f.currentStep,
          hhmmss:f.step2hhmmss()
        });
      }
    }
    return f;
  }
  step2hhmmss(step){
    var f=this;
    step=step || f.currentStep;
    // 82472
    var hh=(step/(60*60))>>0;
    var mm=((step%(60*60))/(60))>>0;
    var ss=step%60;
    // var s=((step%(60*60))%(60))>>0;
    var hhmmss=`${hh}:${mm}:${ss}`;
    return hhmmss;
  }

} //class

var obj=new Basic();
obj.init();
obj.solve();


