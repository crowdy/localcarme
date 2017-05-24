+++
date = "2017-02-07T17:19:18+09:00"
draft = true
title = "hugoblog setup"
categories = "setup"
+++

# setup

```bash
# install golang
sudo su -
sudo yum -y golang
export GOPATH=/usr/share/gocode

# install hugoblog
go get -v github.com/spf13/hugo

# create hugoblog site
/usr/share/gocode/bin/hugo new site /var/www/hugoblog
rm -r /var/www/hugoblog/content
ln -s /var/cmtfront/hugoblog /var/www/hugoblog/content

# theme setting
rm -r /var/www/hugoblog/themes
git clone --depth 1 --recursive https://github.com/spf13/hugoThemes.git /var/www/hugoblog/themes

# run
cd /var/www/hugoblog
/usr/share/gocode/bin/hugo server -t bootie-docs -D -w --bind=0.0.0.0 -b=http://172.21.227.142 &

```

you can add GOPATH to .bashrc