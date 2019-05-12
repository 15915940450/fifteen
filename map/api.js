/* eslint-disable */
var api={
  carpoints:'/car/loadLatLon?distanceId=',
  tripDetail:'/car/tripDetail?carId=',
  loadWeather:'/car/loadWeather?time=',

  carlist:'/car/list'
};

//以上是api接口列表=====================================================



_.forEach(api,function(v,k){
  api[k]='http://120.77.61.77:8089'+v;
});



//end
