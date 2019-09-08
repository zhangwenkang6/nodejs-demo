#!/usr/bin/node

console.log('start...');

const timeID = setInterval(loop, 500);
timeID.unref();

var i=6;
function loop() {
  console.log('I will loop forever');
  i--;
  if(i == 0){
    clearInterval(timeID);
  }
}

setTimeout(() => {
  console.log('Game Over!');
}, 5000);
