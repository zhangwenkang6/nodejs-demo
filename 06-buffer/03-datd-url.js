#!/usr/bin/node

const fs = require('fs'),
      http = require('http'),
      path = require('path'),
      file = process.argv[2];

var data = fs.readFileSync(file).toString('base64');

var ext = path.extname(file);
var uriData = 'data:image/' + ext.slice(1,ext.length) +  ';base64,' + data;

var html  = '<!DOCTYPE html><html><body><img alt = "' + path.basename(file,ext)+'"src="'+ uriData+'"></body></html>';

http.createServer((req,res) =>{
  console.log(req.headers);
  console.log(req.url + '\n');
  res.end(html);
}).listen(8080);
