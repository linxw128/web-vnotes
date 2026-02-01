---
title: V2rayN的vmess解析
description: V2rayN的vmess解析
category: WEB
pubDate: 2026-01-26
draft: false
tags:
  - vmess
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


#### V2rayN的vmess解析
```
from urllib.request import urlopen
import requests
subscribe_url = 'https://xxxxxx/link/a5yH61LodK3BkzIb?sub=3'

requests.packages.urllib3.disable_warnings()
return_content = requests.get(subscribe_url, verify=False).text
#return_content = urlopen(subscribe_url).read()
print(return_content)

from base64 import b64decode
share_links = b64decode(return_content).decode('utf-8').splitlines()
print(share_links)

from urllib.parse import urlsplit
import json
schemes_allow = ['vmess']
configs = []
netloc = ''
for share_link in share_links:
    url = urlsplit(share_link)
    if url.scheme not in schemes_allow: continue
    netloc = share_link[8:]
    print(netloc)
    configs.append(json.loads(b64decode(netloc).decode('utf-8')))
print(configs)

for conf in configs:
    print(conf)
```