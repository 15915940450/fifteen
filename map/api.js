/* eslint-disable */
var api={
  ecadminjs:'/statistics/total__1',


  getCar:'/car/list'
};

//以上是api接口列表=====================================================



_.forEach(api,function(v,k){
  api[k]='http://192.168.2.201:8089'+v;
});



//end
