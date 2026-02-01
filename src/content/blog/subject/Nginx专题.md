---
title: nignx专题
description: nignx专题
category: WEB
pubDate: 2026-01-24
draft: false
tags:
  - nginx
---
## nginx基本配置

#### 运行命令
```
nginx -s signal
```
Where _signal_ may be one of the following:

- `stop` — fast shutdown
- `quit` — graceful shutdown
- `reload` — reloading the configuration file
- `reopen` — reopening the log files

#### 静态服务配置
```
http {
    server {
        ...
    }
}
```

`server` block should look like this:
```
server {
    location / {
        root /data/www;
    }

    location /images/ {
        root /data;
    }
}
```

a regular expression matching all URIs ending with `.gif`, `.jpg`, or `.png`.
```
location ~ \.(gif|jpg|png)$ {
    root /data/images;
}
```

put the `proxy_pass` directive with the protocol, name and port of the proxied server specified in the parameter to make a proxy server configuration
```
server {
    location / {
        proxy_pass http://localhost:8080/;
    }

    location ~ \.(gif|jpg|png)$ {
        root /data/images;
    }
}
```


nginx redirect based on domain name
```
server {
    listen 80;
    server_name a.example.net;
    location / {
        proxy_pass http://127.0.0.1:8080;
        index index.html index.htm;
    }
}


server {
    listen 80;
    server_name b.example.net;
    location / {
        proxy_pass http://127.0.0.1:8081;
        index index.html index.htm;
    }
}

server {
    listen 8080;
    location / {
        root /var/web1
    }
}

server {
    listen 8081;
    location / {
        root /var/web2
    }
}
```

#### 负载均衡



#### SSL配置


#### 相关网址
[nginx官网][https://nginx.org/en/docs/]

## nginx子目录配置密码验证
### Generate htpasswd
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

### Setting in nginx.conf
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

## nignx灰度发布
### Core Setting
in *http block*
``` shell 
	map $http_x_gray $backend {
	    default "production_server";  # 默认走生产
	    "true"  "gray_server";        # 带灰度头
	}

	upstream production_server {
	      server 127.0.0.1:81;
	}

	upstream gray_server {
	      server 127.0.0.1:82;
	}
```

*proxy_pass* setting
```
proxy_pass http://$backend;
```

### authserver example
```shell
	map $http_x_portal_gray $portal_backend {
	    default "production_portal_server";  # 默认走生产
	    "true"  "gray_portal_server";        # 带灰度头
	}

	upstream production_portal_server {
	      server 10.20.20.76;
	}

	upstream gray_portal_server {
	      server 10.20.20.77;
	}
```

*proxy_pass* setting
```
proxy_pass http://$portal_backend;
```

use Edge modheader plugin

set header:
```
x-portal-gray: true
```