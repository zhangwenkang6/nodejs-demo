const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static(__dirname));

app.get('/',function(req,res){
    fs.readFile("login.html",function(error,data){    
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(data);
      });
});
app.get('/list',function (req, res) {
    var xxx = fs.readFileSync('./data.json');
    var list = JSON.parse(xxx);
    if(req.query.username == list.users[0].username && req.query.pwd == list.users[0].password){
        fs.readFile("list.html",function(error,data){    
            res.writeHead(200,{"Content-Type":"text/html"});
            res.end(data);
        });
    }else{
        res.send("用户名或密码错误,请退回");
    }
 });
app.get('/add',function(req,res){
    var list = fs.readFileSync('./data.json');
    res.write(list);
    res.end();
    // res.send(list)
})
 app.listen(8080);