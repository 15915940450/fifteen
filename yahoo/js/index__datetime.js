window.onload=function(){
  var eleDatetime=document.querySelector('.weather-and-datetime__span_datetime');
  var eleWeek=document.querySelector('.weather-and-datetime__small_week');
  eleDatetime.innerHTML=getFormat().datetime;
  eleWeek.innerHTML=getFormat().week;

  window.setInterval(function(){
    eleDatetime.innerHTML=getFormat().datetime;
  },1000);


  //console.log(new Date('1997-07-16T19:20:30.045+08:00').getTime());
};

function add0(num){
  var result=0;
  if(num<10){
    result='0'+num;
  }else{
    result=''+num;
  }
  return result;
}

function getFormat(){
  var result={};

  var arrWeek=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var today=new Date();

  var YYYY=today.getFullYear();
  var MM=add0(today.getMonth()+1);
  var DD=add0(today.getDate());
  var hh=add0(today.getHours());
  var mm=add0(today.getMinutes());
  var ss=add0(today.getSeconds());
  var s=(today.getMilliseconds()/1000+'').substring(1);
  var TZD='+08:00';

  var week=arrWeek[today.getDay()];

  result.datetime=''+YYYY+'-'+MM+'-'+DD+'T'+hh+':'+mm+':'+ss+s+TZD;
  result.week=week;
  //YYYY-MM-DDThh:mm:ss.sTZD (eg 1997-07-16T19:20:30.45+01:00)

  return result;
}
