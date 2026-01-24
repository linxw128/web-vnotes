---
title: 阿里云code-server配置
description: 阿里云code-server配置
category: "WEB"
pubDate: 2024-03-10
draft: false
tags: ["github"]
cover_image: ""
canonical_url: false
---
#### github
https://github.com/coder/code-server

https://coder.com/docs/code-server/latest/guide

#### 阿里云基本配置
- 配置好域名映射
- 安全组开放443端口，因为code-server对外需要https协议

#### 安装code-server
```
curl -fsSL https://code-server.dev/install.sh | sh
```
如果下载慢，需配置访问github代理

#### 配置nginx
安装
```
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

vim /etc/nginx/sites-available/code-server
```
server {
    listen 80;
    listen [::]:80;
    server_name mydomain.com;

    location / {
      proxy_pass http://localhost:8080/;
      proxy_set_header Host $http_host;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection upgrade;
      proxy_set_header Accept-Encoding gzip;
    }
}
```

启用配置
```
sudo ln -s ../sites-available/code-server /etc/nginx/sites-enabled/code-server
sudo certbot --non-interactive --redirect --agree-tos --nginx -d mydomain.com -m me@example.com
```

> nginx只是其中一种方案，也配置ssh等实现
安装成功的提示：
```
root@izuf64ywt9yf5egy40o3vtz:~#s sudo certbot ot-non-interactive edirect agree-tos -nginx edit.vnotes.cn -m linxw128@163.com
saving debug log to /var/log/letsencrypt/letsencrypt.log
requesting a certificate for edit.vnotes.cn
successfully received certificate.
certificate is saved at:/etc/letsencrypt/li /live/edit.vnotes.cn/fullchain.pem
key is saved at: /etc/letsencrypt/live/edit.vnotes.cn/privkey.pem
this certificate expires on 2024-06-08.
these files will be updated when the certificate renews.
certbot has set up a scheduled task to automatically renew this certificate in the background.
deploying certificate
successfully deployed certificate for edit.vnotes. on to /etc/nginx/sites-enabled/code-serverver
congratulations!you have successfully enabled https on https://edit.vnotes.cn
if you like certbot, please consider supporting our work by:
donating to isrg / let's encrypt: https://letsencrypt.org/donate
donating g to eff: https://eff.org/donate-le
```

#### 启动
code-server


#### 写在最后
https://help.aliyun.com/zh/ssl-certificate/user-guide/overview-of-free-certificates-overview-of-free-certificates
> 免费SSL证书
自2021年01月01日起，每个阿里云个人或企业用户（以实名认证为准）每年可以一次性申请20张免费Digicert DV单域名试用证书（以下简称免费证书），以便满足个人网站或企业用户在网站建设之初对HTTPS数据加密传输的基本要求，从而提高数据传输的安全性。申请免费证书前，您可以通过本文了解免费证书的领取规则、使用限制和流程，以及与付费证书的区别。