---
title: 控制台访问github
description: 控制台访问github
category: "WEB"
pubDate: 2024-02-25
draft: false
tags: ["github"]
cover_image: ""
canonical_url: false
---

cmd
```
set HTTPS_PROXY=socks5://127.0.0.1:10808
set HTTP_PROXY=socks5://127.0.0.1:10808
```

shell
```
export HTTPS_PROXY=socks5://127.0.0.1:10808
export HTTP_PROXY=socks5://127.0.0.1:10808
```
shell 删除代理
```
unset http_proxy
unset https_proxy
```

测试
```
curl --socks5 127.0.0.1:1080 https://www.google.com -v
```

> 注意2: 端口要对

> 注意2：在使用conda时，export的环境不能生效，必须使用conda的'--set'语法

使用conda环境在使用curl等时候可能会报错
```
curl: (35) LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to raw.githubusercontent.com:443 
```
需使用conda config
```
conda config --set proxy_servers.http http://proxy.tld
conda config --set proxy_servers.https https://proxy.tld
```
删除代理配置：conda config --remove KEY Value


#### 有密码的代理
修改.condarc
```
proxy_servers:
    http: http://username:password@corp.com:8080
    https: https://username:password@corp.com:8080
```