#!/usr/bin/node

const Dog = require('./02-dog.js');

var taidi = new Dog('taidi', 4);
var zangao = new Dog('zangao', 8);
taidi.on('barxk', onBark);
zangao.on('bark', onBark);

function onBark() {
  console.log('%s barked! energy: %s', this.name(), this.energy());
}

