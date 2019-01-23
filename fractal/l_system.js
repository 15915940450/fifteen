/*
* js注釋：
    Example 7: Fractal plant
    See also: Barnsley fern

        variables : X F
        constants : + − [ ]
        start : X
        rules : (X → F+[[X]-X]-F[-FX]+X), (F → FF)
        angle : 25°

    Here, F means "draw forward", − means "turn left 25°", and + means "turn right 25°". X does not correspond to any drawing action and is used to control the evolution of the curve. The square bracket "[" corresponds to saving the current values for position and angle, which are restored when the corresponding "]" is executed. 
*/

class Lsystem{
  constructor(){
    this.result='';
    
    this.start='X';
    this.rules={
      X:'F+[[X]-X]-F[-FX]+X',
      F:'FF'
    };
    this.n=2;
  }

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

} //class

var obj=new Lsystem();
obj.generate();
console.log(obj.result);