/* eslint-disable */
var api={
  carpoints:'/car/loadLatLon?distanceId=',
  tripDetail:'/car/tripDetail?carId=',

  carlist:'/car/list'
};

//以上是api接口列表=====================================================



_.forEach(api,function(v,k){
  api[k]='http://192.168.2.201:8089'+v;
});



//end
