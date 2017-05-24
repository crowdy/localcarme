+++
date = "2017-02-07T17:19:18+09:00"
draft = true
title = "carme repository"
categories = "repository"
+++

# test code
```python
def test_carme_get_all_host_description(self):
    databaseurl = 'mysql+mysqlconnector://carme:carme@150.95.32.18/carme'
    carmeropo = CarmeRepository(databaseurl)
    carmeropo.insert_or_update_description('testhostname', 'test description2')
    print(carmeropo.get_all_host_description())
```

# method
## cm_hostmemo
* def insert_or_update_hostmemo(self, hostname, description):
* def delete_hostmemo(self, hostname):
* def get_hostmemo(self, hostname):
* def get_all_hostmemo(self):

## cm_users
* def insert_or_update_user(self, user):
* def delete_user(self, uid):
* def get_user(self, uid):
* def get_all_users(self):

## cm_regions
* def insert_or_update_region(self, region):
* def delete_region(self, rid):
* def get_region(self, rid):
* def get_all_regions(self):

## cm_region_admin
* def insert_or_update_region_admin(self, region):
* def delete_region_admin(self, rid):
* def get_admin_by_region(self, rid):

## cm_region_user
* def insert_or_update_region_user(self, region):
* def delete_region_user(self, rid, uid):
* def get_all_users_by_region(self, rid):

## cm_preferences
* def insert_or_update_preferences(self, uid, preferences):
* def delete_preference(self, uid):
* def get_all_preference(self, uid):

## cm_authtoken
* def insert_or_update_auth_token(self, token):
* def delete_auth_token(self, id):
* def get_auth_token(self, id):
* def get_all_auth_token(self):

## cm_activity
* def insert_or_update_activity(self, activity):
* def get_activity(self, id):
* def get_all_activities(self):
