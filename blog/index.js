var express=require('express');
var path=require('path');

var app=express();

//test
var path1='/var/www/html/fifteen/';
var path2='/var/www/html/fifteen/test.html';
var path3='D:\\Program Files (x86)\\Vim\\vimfiles\\bundle\\vim-fugitive\\';
var path4='D:\\Program Files (x86)\\Vim\\vimfiles\\bundle\\vim-fugitive\\README.markdown';
//test

var indexRouter=require('./routes/index.js');
var usersRouter=require('./routes/users.js');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use('/',indexRouter);
app.use('/users/',usersRouter);

app.listen(3300);
console.log('__________EXPRESS___listen port 3300.=='+path.basename(path4)+'==___EXPRESS__________');