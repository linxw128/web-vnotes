---
title: nginx基本配置
description: nginx基本配置
category: "WEB"
pubDate: 2024-02-15
draft: false
tags: ['nignx','web']
cover_image: ""
canonical_url: false
---

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