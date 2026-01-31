---
title: V2rayN的vmess解析
description: V2rayN的vmess解析
category: WEB
pubDate: 2026-01-26
draft: false
tags:
  - vmess
---
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