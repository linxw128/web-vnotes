---
title: nginx子目录配置密码验证
description: nginx子目录配置密码验证
category: WEB
pubDate: 2026-01-26
draft: false
tags:
  - nignx
---
### Setting
```shell
# 安装 htpasswd 工具（如果未安装）
# Ubuntu/Debian
sudo apt-get install apache2-utils

# CentOS/RHEL
sudo yum install httpd-tools

# 创建密码文件（第一次创建使用 -c 参数）
sudo htpasswd -c /etc/nginx/.htpasswd username1
# 输入密码两次

# 添加更多用户（不要使用 -c，否则会覆盖文件）
sudo htpasswd /etc/nginx/.htpasswd username2

# 查看文件内容
cat /etc/nginx/.htpasswd
```

nginx.conf
```deploy.sh
server {
    listen 80;
    server_name example.com;
    root /var/www/html;
    
    # 公开访问的区域
    location / {
        try_files $uri $uri/ =404;
    }
    
    # 需要密码验证的私有目录
    location /private/ {
        # 启用基本认证
        auth_basic "Restricted Area";
        auth_basic_user_file /etc/nginx/.htpasswd;
        
        # 其他配置
        try_files $uri $uri/ =404;
    }
}
```



|     |     |
| --- | --- |
|     |     |
