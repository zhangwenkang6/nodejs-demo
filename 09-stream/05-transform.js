
const stdin = process.stdin;
      stdout = process.stdout;

stdin.resume();
//stdin.setEncoding('utf8');

stdin.on('data',function(data){
  stdout.write(data.toString().toUpperCase());
});

stdout.write('\n');
