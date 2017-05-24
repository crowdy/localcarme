import sys
from jupyterlab.labapp import main


sys.argv[0] = 'jupyter'
sys.argv.append('jupyterlab')
sys.argv.append('--ip=0.0.0.0')
#sys.argv.append('--ip=127.0.0.1')
sys.argv.append('--debug')
# sys.argv.append('--NotebookApp.password=helloworld')
sys.exit(main())
