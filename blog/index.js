var express=require('express');

var app=express();
// console.log(express);

app.get('/',function(rqs,rps){
	rps.send('hello express.');
});
app.get('/users/:name/',function(rqs,rps){
	rps.send('hello, '+rqs.params.name);
});

app.listen(3300);