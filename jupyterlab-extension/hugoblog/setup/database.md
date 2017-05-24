+++
date = "2017-02-07T17:19:18+09:00"
draft = true
title = "database setup and ddl"
categories = "setup"
+++

# setup

```bash
sudo yum -y install mariadb mariadb-devel mariadb-server
sudo systemctl start mariadb
sudo systemctl status mariadb
sudo mysql_secure_installation  # rk******
mysqladmin -u root -p version
sudo firewall-cmd --permanent --add-port=3306/tcp
sudo firewall-cmd --reload
mysql -u root -p
create database carme;
create user 'carme'@'%' identified by 'carme';
grant all on carme.* to 'carme';
```

# DDL

## cm_users
```sql
use carme;
CREATE TABLE cm_users
(
    uid VARCHAR(64) DEFAULT '' PRIMARY KEY NOT NULL,
    displayname VARCHAR(64),
    password VARCHAR(255) DEFAULT '' NOT NULL,
    enabled TINYINT(1) DEFAULT '0' NOT NULL,
    role VARCHAR(64) DEFAULT 'reporter' NOT NULL,
    data LONGTEXT NOT NULL
);

insert into cm_users(uid, displayname, password, enabled, role, data) values ('admin', 'admin', 'admin', 1, 'admin', '{"division": "platform team"}');
insert into cm_users(uid, displayname, password, enabled, role, data) values ('master', 'master', 'master', 1, 'master', '{"division": "cloud service dev div"}');
insert into cm_users(uid, displayname, password, enabled, role, data) values ('developer', 'developer', 'developer', 1, 'developer', '{"division": "cloud service dev div"}');
insert into cm_users(uid, displayname, password, enabled, role, data) values ('operator', 'operator', 'operator', 1, 'operator', '{"division": "IDC div"}');
insert into cm_users(uid, displayname, password, enabled, role, data) values ('reporter', 'reporter', 'reporter', 1, 'reporter', '{"division": "business div"}');

insert into cm_users(uid, displayname, password, enabled, role, data) values ('1849', 'youngwoon park', 'na', 1, 'admin', '{"division": "business div"}');
insert into cm_users(uid, displayname, password, enabled, role, data) values ('1564', 'tonghyun kim', 'na', 1, 'admin', '{"division": "business div"}');
insert into cm_users(uid, displayname, password, enabled, role, data) values ('1767', 'yukihiro kawada', 'na', 1, 'admin', '{"division": "business div"}');
insert into cm_users(uid, displayname, password, enabled, role, data) values ('2231', 'shohei kodama', 'na', 1, 'admin', '{"division": "business div"}');
insert into cm_users(uid, displayname, password, enabled, role, data) values ('2311', 'tomofumi nogami', 'na', 1, 'admin', '{"division": "business div"}');
insert into cm_users(uid, displayname, password, enabled, role, data) values ('2465', 'keisuke suda', 'na', 1, 'admin', '{"division": "business div"}');
```

### Role
* Roles	Detail
* admin	プラットフォームチーム
* master	プラットフォーム以外のクラウドサービス開発部
* developer	クラウド開発部内で権限を絞る
* operator	下関、IDCなど
* reporter	事業部、CS、他部署

role definition from https://intreg.sharepoint.com/teams/infradiv/proj0001/_layouts/15/WopiFrame2.aspx?sourcedoc=%7Bacb26d6e-26b3-4501-8cb0-6451f9b3a500%7D&action=default

## cm_regions
```sql
CREATE TABLE cm_regions
(
    rid VARCHAR(64) DEFAULT '' PRIMARY KEY NOT NULL,
    data LONGTEXT NOT NULL
);
```

## cm_region_admin
```
CREATE TABLE cm_region_admin
(
    rid VARCHAR(64) DEFAULT '' NOT NULL,
    uid VARCHAR(64) DEFAULT '' NOT NULL,
    CONSTRAINT `PRIMARY` PRIMARY KEY (rid, uid)
);
```

## cm_region_user
```sql
CREATE TABLE cm_region_user
(
    rid VARCHAR(64) DEFAULT '' NOT NULL,
    uid VARCHAR(64) DEFAULT '' NOT NULL,
    CONSTRAINT `PRIMARY` PRIMARY KEY (rid, uid)
);
CREATE INDEX ru_uid_index ON cm_region_user (uid);
```

## cm_preferences
```sql
CREATE TABLE cm_preferences
(
    uid VARCHAR(64) DEFAULT '' NOT NULL,
    appid VARCHAR(32) DEFAULT '' NOT NULL,
    configkey VARCHAR(64) DEFAULT '' NOT NULL,
    configvalue LONGTEXT,
    CONSTRAINT `PRIMARY` PRIMARY KEY (uid, appid, configkey)
);
```

## cm_authtoken
```sql
CREATE TABLE cm_authtoken
(
    id INT(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    uid VARCHAR(64) DEFAULT '' NOT NULL,
    login_name VARCHAR(64) DEFAULT '' NOT NULL,
    password LONGTEXT,
    name LONGTEXT NOT NULL,
    token VARCHAR(200) DEFAULT '' NOT NULL,
    type SMALLINT(5) unsigned DEFAULT '0' NOT NULL,
    remember SMALLINT(5) unsigned DEFAULT '0' NOT NULL,
    last_activity INT(10) unsigned DEFAULT '0' NOT NULL,
    last_check INT(10) unsigned DEFAULT '0' NOT NULL,
    scope LONGTEXT
);
CREATE INDEX authtoken_last_activity_index ON cm_authtoken (last_activity);
CREATE UNIQUE INDEX authtoken_token_index ON cm_authtoken (token);
```

## cm_activity
```sql
CREATE TABLE cm_activity
(
    activity_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    timestamp INT(11) DEFAULT '0' NOT NULL,
    priority INT(11) DEFAULT '0' NOT NULL,
    type VARCHAR(255),
    uid VARCHAR(64),
    affecteduid VARCHAR(64) NOT NULL,
    app VARCHAR(32) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    subjectparams LONGTEXT NOT NULL,
    message VARCHAR(255),
    messageparams LONGTEXT,
    file VARCHAR(4000),
    link VARCHAR(4000)
);
CREATE INDEX activity_filter_app ON cm_activity (affecteduid, app, timestamp);
CREATE INDEX activity_filter_by ON cm_activity (affecteduid, uid, timestamp);
CREATE INDEX activity_time ON cm_activity (timestamp);
CREATE INDEX activity_uid_time ON cm_activity (affecteduid, timestamp);
```

## cm_computehostmemo
```sql
CREATE TABLE cm_computehostmemo
(
    hostname VARCHAR(64) DEFAULT '' PRIMARY KEY NOT NULL,
    hostmemo LONGTEXT NOT NULL
);
```
