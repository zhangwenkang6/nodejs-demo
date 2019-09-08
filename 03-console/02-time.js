#!/usr/bin/node

function Task(){
  var a;
  for(var b=0;b<10000;b++){
    for(var c=0;c<10000;c++){
      a=b*c;
    }
  }
  return a;
}

console.time('TEST');
Task();
console.timeEnd('TEST');
