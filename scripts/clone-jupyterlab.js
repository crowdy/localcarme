var sys = require('util')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout) }
exec("git clone https://github.com/jupyterlab/jupyterlab jupyterlab-org && cd jupyterlab-org && git checkout 394aad893ad812fc7019e74efb86fe057bb150ff", puts);