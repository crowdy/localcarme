+++
date = "2017-02-16T17:19:18+09:00"
draft = true
title = "mysql setup"
categories = "setup"
+++


```bash
$  git clone https://github.com/mysql/mysql-connector-python.git
$  cd mysql-connector-python
$  python ./setup.py build
$  sudo python ./setup.py install

...

>>> import mysql.connector as msc
>>> msc.__version__
'2.1.3'
>>>
```