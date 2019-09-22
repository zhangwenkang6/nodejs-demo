#!/usr/bin/node

const Radio = require('./03-radio');

const station = {
  freq: '106.7',
  name: 'music radio'
};

var radio = new Radio(station);

radio.on('open', (station) => {
  console.log('"%s" FM %s opened', station.name, station.freq);
  console.log('lalala...');
});

var xxx=function(){
  console.log('rdio的事件有:',radio._events);
  console.log('open事件的监听数量为:',radio.listenerCount('open'));
  console.log('open的事件的监听有:',radio.listeners('open'));

};

radio.on('open',xxx);  

radio.on('stop', (station) => {
  console.log('"%s" FM %s closed', station.name, station.freq);
});
