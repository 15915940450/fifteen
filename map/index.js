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
      url:api.getCar,
      method:'POST',
      dataType:'json',
      success:function(data){
        console.log(data);
      }
    });
    return f;
  }

}

var obj=new M();
obj.init();
obj.getData();