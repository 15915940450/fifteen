var map;
var pathSimplifierIns;

class M{
  constructor(){

  }

  init(){
    var f=this;
    return f;
  }
  
  getData(){
    var f=this;
    $.ajax({
      url:api.carlist,
      method:'POST',
      dataType:'json',
      success:function(data){
        // console.log(data);
        var strCar=data.data.map(function(v){
          return (`<option value="${v.carId}">${v.carName}</option>`);
        }).join('');
        $('.car_select').html('<option value="">請選擇</option>'+strCar);
      }
    });
    return f;
  }
  amap(){
    var f=this;
    map = new AMap.Map('a-map',{
      mapStyle:'amap://styles/whitesmoke',
      zoom: 17
    });
    AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],function(){
      map.addControl(new AMap.ToolBar());
      map.addControl(new AMap.Scale());
      map.addControl(new AMap.OverView({isOpen:true}));
    });
    AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier) {
      // f.callMethod('track',[PathSimplifier]);
    });
    return f;
  }
  getPoints(){
    var f=this;
    $('.car_select').on('change',function(){
      var val=$(this).val();
      if(val){
        $.ajax({
          url:api.tripDetail+val,
          method:'POST',
          dataType:'json',
          success:function(data){
            console.log(data);
            var strDistance=data.data.map(function(v){
              return (`<option value="${v.distance_id}">
                  ${v.ignite_latitude} - ${v.misfire_longitude}
                </option>`);
            }).join('');
            console.log(strDistance);
            $('.distance_select').html(strDistance);
          }
        });
      }else{
        $('.distance_select').html('<option value="">請選擇</option>');
      }
      
    });
    return f;
  }

}

var obj=new M();
obj.init();
obj.amap().getData().getPoints();