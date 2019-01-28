class Labyrinth{
  constructor(){

  }

} //class

var obj=new Labyrinth();



var theNumber=50;
Number.prototype.map=function(inRange,targetRange){
  var stepA=inRange[1]-inRange[0];  //6
  var stepB=targetRange[1]-targetRange[0];  //3
  var result=(this-inRange[0])*stepB/stepA+targetRange[0];
  return (result);
};

console.log(theNumber.map([0,100],[0,365]));