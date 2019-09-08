#!/usr/bin/node

const log =console.log;

var buf1 = new Buffer(256);
buf1[0] = 0;

log('buf1 length:',buf1.length);
log('\nbuf1:',buf1);

//循环初始化buffer
for(var i=0;i<buf1.length;i++)
  buf1[i] = i;
log('\nbuf1:',buf1);

//类似数组，对Buffer做切片操作
var buf2= buf1.slice(250, 256);
log('\nbuf2:', buf2);

// 在buffer中填充数据，buffer数据转化为JSON数据
buf2.fill(0);
log('\nbuf2:',buf2);
log('\nbuf2\'s JSON:',buf2.toJSON());
log('\nbuf2\'s JSON:',JSON.stringify(buf2));

//用数组初始化 buffer
var array = ['a',0xba,0xdf,0x00,255,10];
var buf3 = new Buffer(array);
log('\nbuf3:',buf3.length,buf3);

// 用字符串初始化
var buf4 = new Buffer('hello world','utf8');
log('\nbuf4:',buf4.length,buf4);

//bufer 数据复制
var buf5= new Buffer('aaaa','utf8');
log('\nbuf5:',buf5.length,buf5);
buf5.copy(buf3,0,0,buf3.length);
log('\nbuf3:',buf3.length,buf3);
log('\nbuf5:',buf5.length,buf5);

// UTF8 编码
var str = '你好 xxx';
var buf6 = new Buffer(str,'utf8');
log('\nbuffer length:',buf5.length);
log('\nbuffer content:',buf5);
log('string length',str.length);
