/*
* js注釋：
https://en.wikipedia.org/wiki/L-system

    Example 7: Fractal plant
    See also: Barnsley fern

        variables : X F
        constants : + − [ ]
        start : X
        rules : (X → F+[[X]-X]-F[-FX]+X), (F → FF)
        angle : 25°

    Here, 
     F means "draw forward",
     − means "turn left 25°", 
     and + means "turn right 25°". 
     X does not correspond to any drawing action and is used to control the evolution of the curve. 
     The square bracket "[" corresponds to saving the current values for position and angle, 
     which are restored when the corresponding "]" is executed. 
*/

class Lsystem{
  constructor(){
    this.eleFractal=document.querySelector('#fractal');
    this.CW=document.documentElement.clientWidth || document.body.clientWidth;
    this.CH=document.documentElement.clientHeight || document.body.clientHeight;
    this.ctx=this.eleFractal.getContext('2d');

    this.result='';

    this.start='X';
    this.rules={
      X:'F+[[X]-X]-F[-FX]+X',
      F:'FF'
    };
    this.gth=13;
    this.n=5;
  }

  init(){
    var es6This=this;
    //設置canvas的寬高
    es6This.eleFractal.width=es6This.CW;
    es6This.eleFractal.height=es6This.CH-4; //高減4，避免出現滾動條
    return es6This;
  }

  //生成L字符串
  generate(){
    var es6This=this;
    for(var i=0;i<es6This.n;i++){
      es6This.result=es6This.start.replace(/[XF]/ig,function(match){
        // console.log(match);
        return (es6This.rules[match]);
      });
      es6This.start=es6This.result;
    }
    
    return es6This;
  }

  turtle(){
    var es6This=this;
    
    var ctx=es6This.ctx;
    //把原點移到中綫下方位置
    ctx.translate(es6This.CW*4/5,es6This.CH-40);
    ctx.rotate(-Math.PI*25/180);
    ctx.strokeStyle='snow';
    ctx.beginPath();

    es6This.L(es6This.rootLen);

    ctx.stroke();
    return es6This;
  }
  //result解析
  L(){
    var es6This=this;
    var arrL=es6This.result.split('').filter(function(v){
      //X does not correspond to any drawing action and is used to control the evolution of the curve.
      return (v!=='X');
    });
    
    var ctx=es6This.ctx;
    //for F+[[X]-X]-F[-FX]+X
    for(var i=0;i<arrL.length;i++){
      switch(arrL[i]){
      case 'F':
        ctx.moveTo(0,0);
        ctx.lineTo(0,-es6This.gth);
        ctx.translate(0,-es6This.gth);
        break;
      case '-':
        ctx.rotate(-Math.PI*25/180);
        break;
      case '+':
        ctx.rotate(Math.PI*25/180);
        break;
      case '[':
        ctx.save();
        break;
      case ']':
        ctx.restore();
        break;
      default:
        console.log('it is impossible');        
      }
    }
    ctx.moveTo(0,0);
    ctx.lineTo(0,-200);
  
    return es6This;
  }

} //class

var obj=new Lsystem();
obj.init().generate().turtle();