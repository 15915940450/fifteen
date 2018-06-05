var express=require('express');
var path=require('path');

var app=express();


var indexRouter=require('./routes/index.js');
var usersRouter=require('./routes/users.js');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use('/',indexRouter);
app.use('/users/',usersRouter);

var port=80;
app.listen(port);
console.log('__________EXPRESS___listen port '+port+'.====___EXPRESS__________');
/*==urls
localhost/
localhost/users/:name/
*/