class Weather{
  constructor(){}

  init(){}
  test(){
    var f=this;
      $.ajax({
        url:api.loadSpeed+'?startTime=2018-09-27 23:41:44&endTime=2018-09-27 23:55:44',
        method:'POST',
        dataType:'json',
        success:function(data){
          console.log(data);
        }
      });

    return f;
  }
  handleSubmit(){
    var f=this;
    $('form').on('submit',function(ev){
      ev.preventDefault();
      var val=$('input[type=date]').val().trim();
      //console.log(val);
      $.ajax({
        url:api.loadWeather+val,
        method:'POST',
        dataType:'json',
        success:function(data){
          //console.log(data);
          var strTr=data.data.map(function(v){
            return (`<tr>
                <td>${v.name}</td>
                <td>${v.degree}</td>
              </tr>`);
          }).join('');
          $('.weather_table tbody').html(strTr);
          $('.weather_table').removeClass('hidden');
        }
      });
    });
    return f;
  }
}

var obj=new Weather();
obj.init();
obj.test();
obj.handleSubmit();
