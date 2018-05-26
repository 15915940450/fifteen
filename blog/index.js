var express=require('express');

var app=express();
// console.log(express);

app.get('/',function(rqs,rps){
	rps.send('hello express.');
});

app.listen(3300);