var express=require('express');

var app=express();
// console.log(express);

var indexRouter=require('./routes/index.js');
var usersRouter=require('./routes/users.js');

app.use('/',indexRouter);
app.use('/users/',usersRouter);

app.listen(3300);
console.log('__________EXPRESS___listen port 3300.___EXPRESS__________');