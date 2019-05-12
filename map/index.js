var pathSimplifierIns,name,longitude,latitude,place,radius,map,marker,circle,info,geocoder,citysearch,poiPicker;

class M{
  constructor(){
    this.result=false;  //不在安全範圍
    this.center=null;
  }

  init(){
    var f=this;
    radius=1000;
    $('input[name=radius]').val(radius);
    $('input[name=place]').val('');
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
  handleRadiusInput(){
    var f=this;
    $('input[name=radius]').on('input',function(){
      radius=window.Number($(this).val());
      if(radius){
        circle.setRadius(radius);
        map.setFitView();
      }
    });
    return f;
  }
  handleMapClick(){
    var f=this;
    //click事件
    map.on('click',function(ev){
      marker.setPosition(ev.lnglat);
      geocoder.getAddress(ev.lnglat,function(status,result){
        if(status==='complete'){
          place=result.regeocode.formattedAddress;
          longitude=ev.lnglat.lng;
          latitude=ev.lnglat.lat;

          f.center=ev.lnglat;
          $('input[name=place]').val(place);
          circle.setCenter(ev.lnglat);
          info.setContent('<div class="circle-info">'+place+'</div>');
          if(!info.getIsOpen()){
            info.open(map,marker.getPosition());
          }else{
            info.setPosition(ev.lnglat);
          }
          map.setFitView();
        }else{
          $('input[name=place]').val('无法获取地址');
        }
      });
    });
    return f;
  }
  setInputValue(){
    var f=this;
    $('input[name=place]').val(place);
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
      f.track(PathSimplifier);
    });
    f.pluginGeocoder();
    return f;
  }
  track(PathSimplifier){
    var f=this;
    pathSimplifierIns=new PathSimplifier({
      zIndex:100,
      map:map,
      getPath:function(pathData){ //pathIndex
        return pathData.path;
      },
      getHoverTitle: function(pathData, pathIndex, pointIndex) {
        // console.log(pathData);
        if(pointIndex===0){
          return '起点：'+pathData.startPlaceName;
        }
        if(pointIndex===pathData.path.length-1){
          return '终点：'+pathData.endPlaceName;
        }
        if (pointIndex >= 0) {
          return '点:' + (pointIndex+1) + '/' + pathData.path.length;
        }
        return pathData.name + '，点数量' + pathData.path.length;
      },
      renderOptions: {
        startPointStyle:{
          radius:5,
          fillStyle:'rgba(255,255,255,1)',
          strokeStyle:'rgba(8,161,144,1)',
          lineWidth:3
        },
        endPointStyle:{
          radius:3,
          fillStyle:'#999',
          strokeStyle:'#666',
          lineWidth:2
        },
        pathLineStyle: {
          strokeStyle: 'rgba(8,161,144,1)',
          lineWidth: 5,
          dirArrowStyle: true
        }
      }
    });
    //======================================这里构建两条简单的轨迹，仅作示例
    pathSimplifierIns.setData(null);
    return f;
  }
  //畫軌跡
  setData(data){
    var f=this;
    if(data.data.length===0){
      pathSimplifierIns.setData(null);
      return false;
    }else{
      //轨迹
      var arrPath=[];
      arrPath=data.data.map(function(v){
        return (v.location.split(',').reverse());
      });
      var name=$('.distance_select option:selected').text().trim().split('-');

      var dataSet=[{
        name:'車輛轨迹',
        startPlaceName:name[0],
        endPlaceName:name[1],
        path:arrPath
      }];

      pathSimplifierIns.setData(dataSet);
    }
    return f;
  }
  pluginGeocoder(){
    var f=this;
    AMap.plugin('AMap.Geocoder',function(){
      geocoder=new AMap.Geocoder({
        //city:'0755' //城市，默认：“全国”
      });
      var center=map.getCenter();
      marker=new AMap.Marker({
        map:map,
        position:[center.lng,center.lat],
        bubble:true
      });
      f.circle();
      f.info();
    });
    return f;
  }
  circle(){
    var f=this;
    var center=map.getCenter();
    f.center=map.getCenter();
    circle=new AMap.Circle({
      center:[center.lng,center.lat],
      radius:radius?radius:1000,
      bubble:true,
      fillOpacity:0.1,
      fillColor:'#09F',
      strokeColor:'#09F',
      strokeWeight:1
    });
    circle.setMap(map);
    map.setFitView();
    return f;
  }
  info(){
    var f=this;
    info=new AMap.InfoWindow({
      content:'<div class="circle-info">'+(place?place:'鼠标在地图上点选位置')+'</div>',
      offset:new AMap.Pixel(0,-28),
      size:new AMap.Size(300,0)
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
            // console.log(data);
            var longlats=[];
            data.data.forEach(function(v){
              longlats.push([v.ignite_longitude,v.ignite_latitude].reverse());
              longlats.push([v.misfire_longitude,v.misfire_latitude].reverse());
            });
            geocoder.getAddress(longlats,function(status,result){
              if(status==='complete'){
                // console.log(result);
                f.geo=result;
                var strDistance=data.data.map(function(v,i){
                  return (`<option value="${v.distance_id}">
                      ${result.regeocodes[i*2].formattedAddress} - ${result.regeocodes[i*2+1].formattedAddress}
                    </option>`);

                }).join('');
                // console.log(strDistance);
                $('.distance_select').html(strDistance);

              }
            });


          }
        });
      }else{
        $('.distance_select').html('<option value="">請選擇</option>');
      }

    });
    return f;
  }
  //提交表單，查詢：在範圍内(合法行爲)或外
  handleSubmit(){
    var f=this;
    $('.points_form').on('submit',function(ev){
      ev.preventDefault();

      var distanceId=$('.distance_select').val();
      distanceId='300104542764';

      $.ajax({
        url:api.carpoints+distanceId,
        method:'POST',
        dataType:'json',
        success:function(data){
          //console.log(data);
          f.setData(data);
          f.calcData(data);
        }
      });
    });
    return f;
  }
  calcData(data){
    var f=this;
    //var p1 = new AMap.LngLat(116.434027, 39.941037);
    //var p2 =new AMap.LngLat(116.461665, 39.941564);
    //// 返回 p1 到 p2 间的地面距离，单位：米
    //var dis=p1.distance(p2);
    //console.log(radius);
    f.result=data.data.every(function(v){
      var p1=new AMap.LngLat(v.location.split(',')[1],v.location.split(',')[0]);
      var distance=p1.distance(f.center);
      return (distance<radius);
    });

    $('form p').removeClass('hidden');
    if(f.result){
      $('form p strong').html('合法');
    }else{
      $('form p strong').html('不合法');
    }
    return f;
  }

}

var obj=new M();
obj.init();
obj.amap().handleMapClick().handleRadiusInput().getData().getPoints().handleSubmit();
