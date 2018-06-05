var express=require('express');
var path=require('path');

var app=express();


var indexRouter=require('./routes/index.js');
var usersRouter=require('./routes/users.js');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use('/',indexRouter);
app.use('/users/',usersRouter);

app.listen(3300);
console.log('__________EXPRESS___listen port 3300.====___EXPRESS__________');
/*==urls
localhost:3300/
localhost:3300/users/:name/
*/