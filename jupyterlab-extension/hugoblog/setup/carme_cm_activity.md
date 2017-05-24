+++
date = "2017-02-28T17:19:18+09:00"
draft = true
title = "about cm_activity"
categories = "repository"
+++

```sql
CREATE TABLE cm_activity
(
    activity_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    timestamp INT(11) DEFAULT '0' NOT NULL,
    priority INT(11) DEFAULT '0' NOT NULL,
    type VARCHAR(255),
    uid VARCHAR(64),
    affectedid VARCHAR(64) NOT NULL,
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

```python
    def service_enable(self, host, binary):
        token = self.context.get_admin_token()
        admintenantid = self.context.get_admin_tenantid()
        helper = OpenStackContextHelper(self.context)
        nova_url = helper.get_nova_service_url(ServiceType.STAFF)
        compute_provider = ComputeProvider(nova_url, token)
        res = compute_provider.service_enable(admintenantid, host, binary)

        activity = {'priority': 0, 'type': '', 'uid': '', 'affectedid': '', 'app': '', 'subject': host,
                    'subjectparams': 'enable', 'message': '', 'file': '', 'link': ''}
        self.context.get_carme_repository().insert_or_update_activity({activity})
        return res
```

type:
* authentication : for login, logout
* api-call :
* file-manipulation :
* database-manipulation :

uid:
    current uid

affectedid:
    adminがuidを操作した場合にはuid
    OperatorがOpenStackのリソースを管理した場合には商材のregion名
    anything which remarks the target.
    e.g. 'tyo2', 'gmo01', 'tkim'
    null if not exists

subject:
    host name, vm name, network id, subnet id etc...
    usually, it could be a function name.

subjectparams:
    'enable', 'disable', numeric or json string for a command parameter
    e.g. create_server request json string

message:
    result message if exists
    e.g. "202"

messageparams:
    result message parameters if exists
    e.g. create_server response json string
