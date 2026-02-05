---
title: OpenLDAP
description: OpenLDAP
category: WEB
pubDate: 2026-01-28
draft: false
tags:
  - ldap
---

### 生成配置并重启服务

```shell
#!/bin/bash
kill `cat /usr/local/openldap/var/run/slapd.pid`
rm /usr/local/openldap/etc/openldap/slapd.d/* -fr
/usr/local/openldap/sbin/slaptest -f /usr/local/openldap/etc/openldap/slapd.conf -F /usr/local/openldap/etc/openldap/slapd.d/
/usr/local/openldap/libexec/slapd
```

### Openldap 数据库操作
1 初始化数据库

```shell
cp /usr/local/openldap/var/openldap-data/DB_CONFIG.example /usr/local/openldap/var/openldap-data/DB_CONFIG
```
2 配置schema

复制schema文件

3 配置slap.conf

复制slapd.conf文件

生成配置文件

/usr/local/openldap/sbin/slaptest -f /usr/local/openldap/etc/openldap/slapd.conf -F /usr/local/openldap/etc/openldap/slapd.d/

同步：如果开启主从同步，则会自动同步主机LDAP数据，无需做第4第5步


4 导出数据

备份手册：[https://www.cnblogs.com/eagle6688/p/16996460.html](https://www.cnblogs.com/eagle6688/p/16996460.html)

```shell 
/usr/local/openldap/sbin/slapcat -l ~/mju_base.ldif
```

报错如下，不用管。

	The first database does not allow slapcat; using the first available one (2)

	 Re: openldap backup script error: database does not allow slapcat The "first database" is "monitor", it's an internal OpenLDAP database and you can not dump it with slapcat.  It's safe to ignore this warning message.
	 

5 导入数据

```
/usr/local/openldap/bin/slapadd -l ~/mju_base.ldif
```

其他：search缓慢与index 问题

[https://www.zytrax.com/books/ldap/apa/indeces.html](https://www.zytrax.com/books/ldap/apa/indeces.html)

	**pres** should be used if use [searches](https://www.zytrax.com/books/ldap/apa/search.html) of the form 'objectclass=person' or 'attribute=mail' will be used.
	
	**approx** MUST be used if use [searches](https://www.zytrax.com/books/ldap/apa/search.html) of the form 'sn~=person' (a 'sounds-like' search) will be used.
	
	**eq** should be used if [searches](https://www.zytrax.com/books/ldap/apa/search.html) of the form 'sn=smith' will be used i.e no wildcards are included (uses the EQUALITY rule only).
	
	**sub** should be used if use [searches](https://www.zytrax.com/books/ldap/apa/search.html) of the form 'sn=sm*' i.e wildcards are included (uses the SUBSTR rule). This rule may be enhanced by a using **subinitial** (optimised for 'sn=*s'), **subany** (optimised for 'sn=*n*') or **subfinal** (optimised for 'sn=th*'). One or more **sub** parameters may be included.
	
	**special** may be either **nolang** or **nosubtypes** which are related to [subtypes](https://www.zytrax.com/books/ldap/apd/index.html#subtype).

### 构建 index
log出现：

	slapd[20840]: <= bdb_equality_candidates: (uid) not indexed

1. 停止slapd

```shell
kill `cat /usr/local/openldap/var/run/slapd.pid`
```

2. 配置config

```
index uid eq,pres,sub
```

3. 构建index

```shell
/usr/local/openldap/sbin/slapindex
```

更多的用法见：

[https://access.redhat.com/documentation/zh-cn/red_hat_enterprise_linux/7/html/system-level_authentication_guide/openldap](https://access.redhat.com/documentation/zh-cn/red_hat_enterprise_linux/7/html/system-level_authentication_guide/openldap)

### Eduroam 认证添加字段
苹果手机目前无法通过OpenLDAP的现有字段进行eduroam的认证，需要增加关于sambaNTPassword的若干字段，并写入MD4的加密密钥。


#### OpenLDAP 导入 samba. Schema

**步骤一：**

找到对应版本的samba.schema

```
[root@zfldapserver2 ~]# find samba-4.0.0 -name samba.schema
samba-4.0.0/examples/LDAP/samba.schema
```

**步骤二：**

编辑samba.schema，把displayName删除后，复制到OpenLDAP的schema目录下

```
objectclass ( 1.3.6.1.4.1.7165.2.2.6 NAME 'sambaSamAccount' SUP top AUXILIARY
        DESC 'Samba 3.0 Auxilary SAM Account'
        MUST ( uid $ sambaSID )
        MAY  ( cn $ sambaLMPassword $ sambaNTPassword $ sambaPwdLastSet $
               sambaLogonTime $ sambaLogoffTime $ sambaKickoffTime $
               sambaPwdCanChange $ sambaPwdMustChange $ sambaAcctFlags $
               displayName $ sambaHomePath $ sambaHomeDrive $ sambaLogonScript $
               sambaProfilePath $ description $ sambaUserWorkstations $
               sambaPrimaryGroupSID $ sambaDomainName $ sambaMungedDial $
               sambaBadPasswordCount $ sambaBadPasswordTime $
               sambaPasswordHistory $ sambaLogonHours))
```

```
objectclass ( 1.3.6.1.4.1.7165.2.2.6 NAME 'sambaSamAccount' SUP top AUXILIARY
        DESC 'Samba 3.0 Auxilary SAM Account'
        MUST ( uid $ sambaSID )
        MAY  ( cn $ sambaLMPassword $ sambaNTPassword $ sambaPwdLastSet $
               sambaLogonTime $ sambaLogoffTime $ sambaKickoffTime $
               sambaPwdCanChange $ sambaPwdMustChange $ sambaAcctFlags $
               sambaHomePath $ sambaHomeDrive $ sambaLogonScript $
               sambaProfilePath $ description $ sambaUserWorkstations $
               sambaPrimaryGroupSID $ sambaDomainName $ sambaMungedDial $
               sambaBadPasswordCount $ sambaBadPasswordTime $
               sambaPasswordHistory $ sambaLogonHours))
```

**步骤三：**

配置slapd.conf，引入samba.schema

```
include         /usr/local/openldap/etc/openldap/schema/samba.schema
```


**步骤四：**

执行脚本，重新生成OpenLDAP的配置文件并重启slapd服务

```
#!/bin/bash
kill `cat /usr/local/openldap/var/run/slapd.pid`
rm /usr/local/openldap/etc/openldap/slapd.d/* -fr
/usr/local/openldap/sbin/slaptest -f /usr/local/openldap/etc/openldap/slapd.conf -F /usr/local/openldap/etc/openldap/slapd.d/
/usr/local/openldap/libexec/slapd
```

**步骤五：**
![[pic_sambapicture.png]]

同时，认证系统写入 LDAP时需要再加上该密码编码

写入验证脚本：
```python
import hashlib,binascii

password = 'yening'
hash = hashlib.new('md4', password.encode('utf-16le')).digest()
print(binascii.hexlify(hash).upper())

'''
output:
EC4938880EC03F030138B1733FE4D333
```

### 删除状态异常账号
找出状态为0的账号
```shell
/usr/local/openldap/bin/ldapsearch -x -LLL -b "dc=authserver,dc=mju,dc=edu,dc=cn" "status=0" > status0.ldif
```


过滤
``` shell
cat status0.ldif |grep "uid=" > status0_dn.ldif
```

增加changetpye字段
``` shell 
sed -i 's/$/\nchangetype: delete\n/g' status0_dn.ldif
```

删除，需要足够的权限
``` shell
/usr/local/openldap/bin/ldapmodify -D "cn=Manager,dc=authserver,dc=mju,dc=edu,dc=cn" -W -f status0_dn_del.ldif
```
