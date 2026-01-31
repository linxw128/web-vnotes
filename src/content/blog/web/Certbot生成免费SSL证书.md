---
title: Certbot生成免费SSL证书
description: Certbot生成免费SSL证书
category: WEB
pubDate: 2024-03-28
draft: false
tags:
  - server
cover_image: ""
canonical_url: false
---

[https://blog.csdn.net/weixin_44398687/article/details/135320716](https://blog.csdn.net/weixin_44398687/article/details/135320716)

####  安装

sudo apt-get update  
sudo apt-get install -- only-upgrade certbot

#### 停止nginx

nginx -s stop

#### 生成example.com的域名

sudo certbot certonly -- standalone -d example.com

#### 配置自动更新证书

因为证书有效期是三个月，所以最好配置自动更新

crontab -e

```text-plain
0 2 * * * certbot renew --quiet
```