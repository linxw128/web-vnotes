---
Title: OpenLDAP
Description: OpenLDAP
Category: "WEB"
PubDate: 2026-1-28
Draft: false
Tags: ["ldap"]
---
## Toc

## 生成配置并重启服务

```shell
#!/bin/bash
kill `cat /usr/local/openldap/var/run/slapd.pid`
rm /usr/local/openldap/etc/openldap/slapd.d/* -fr
/usr/local/openldap/sbin/slaptest -f /usr/local/openldap/etc/openldap/slapd.conf -F /usr/local/openldap/etc/openldap/slapd.d/
/usr/local/openldap/libexec/slapd
```

### Eduroam 认证添加字段
苹果手机目前无法通过OpenLDAP的现有字段进行eduroam的认证，需要增加关于sambaNTPassword的若干字段，并写入MD4的加密密钥。
![[Pasted image 20260128151144.png]]