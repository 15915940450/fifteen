$(function(){
  $('#login-div form').on('submit',function(ev){
    ev.preventDefault();
    var data2POST=$(this).serializeArray();
    console.log(md5(data2POST[1].value));
    //140f6969d5213fd0ece03148e62e461e
  });
});
