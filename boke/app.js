const http = require('http');
const fs = require('fs');
const url = require('url');
qs=require('querystring');

var userList = {username: "admin", pwd: "admin"};
http.createServer(function(req,res){
  let path = url.parse(req.url).pathname;
  if(path == '/detail'){
    switch(req.method){
        case 'GET':
          show(req,res);
          break;
        default:
          err(res);
          break;
      }
  }else if(path=="/login"){
    fs.readFile("login.html",function(error,data){    
      res.writeHead(200,{"Content-Type":"text/html"});
      res.end(data);
    });
  }else if(path=="/addChapter"){
    fs.readFile("addChapter.html",function(error,data){   
      res.writeHead(200,{"Content-Type":"text/html"});
      res.end(data);
    });
  }else if(path=="/list"){
    fs.readFile("chapterList.html",function(error,data){
      res.writeHead(200,{"Content-Type":"text/html"});
      res.end(data);
    })
  }else if(path=="/listmanager"){
      // let xxx =url.parse(req.url);
      let query=qs.parse(url.parse(req.url).query);
      // console.log(xxx);
      // console.log(query);
      if(query.username == userList.username && query.pwd== userList.pwd){
        fs.readFile("list.html",function(error,data){
          res.writeHead(200,{"Content-Type":"text/html"});
          res.end(data);
        });
      }else{
        // console.log(req.url);
        // req.url = '/login';
        fs.readFile("login.html",function(error,data){    
          res.writeHead(200,{"Content-Type":"text/html"});
          res.end(data);
        });
      }
  }else if(path == '/add'){
    var list = fs.readFileSync('./list.JSON');
    res.write(list);
    res.end();
  }else if(path == '/adds'){
    var xxx = fs.readFileSync('./list.JSON');
    var list = JSON.parse(xxx);
    var add={};
    req.setEncoding('utf-8');
    req.on('data',function(pos){
      add.chapterId=list.length+1;
      add.chapterName=qs.parse(pos).title;
      add.chapterDes='';
      add.chapterContent=qs.parse(pos).content;
      add.publishTimer= "2019-08-19";
      add.author="admin";
      add.views=1111;
      add.imgPath='./login_bg.jpg';
      list.push(add);
      // console.log(list);
      // var a = list.toJSON();
      fs.writeFileSync('./list.JSON',JSON.stringify(list));
    });
  }else if(path!="/"){
    path='.'+path;
    fs.readFile(path,function(error,data){
      res.writeHead(200,{"Content-Type":"text/css"});
      res.end(data);
    });
  }
}).listen(8083);

function show(req,res) {  
  var params = url.parse(req.url, true).query;
  var chapterId = params.chapterId;
  //console.log(chapterId);
  var list = fs.readFileSync('./list.JSON');
  var obj = JSON.parse(list);
  //console.log(obj[chapterId-1]);
  var html = fs.readFileSync('./chapter.html').toString('utf8');
  html = html.replace('~',obj[chapterId-1].chapterContent);
  html = html.replace('#',obj[chapterId-1].chapterName);
  html = html.replace('%',obj[chapterId-1].imgPath);
  html = html.replace('@',obj[chapterId-1].publishTimer);
  html = html.replace('&',obj[chapterId-1].author);
  html = html.replace('^',obj[chapterId-1].views);
  res.writeHead(200,{
    'Content-Type':'text/html',
    'Content-Length':Buffer.byteLength(html),
    'Access-Control-Allow-Origin':'*'
  });
  res.end(html);
}

function err(res){
  var msg = 'Not found';
  res.writeHead(404,{
      'Content-Type':'text/plain',
      'Content-Length':msg.length,
  });
  res.end(msg);
}