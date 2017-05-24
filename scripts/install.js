var sys = require('util')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout) }
exec("git clone --depth=1 https://github.com/jupyterlab/jupyterlab", puts);