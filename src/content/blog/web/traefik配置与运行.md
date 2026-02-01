---
title: traefik配置与运行
description: traefik配置与运行
category: "WEB"
pubDate: 2024-03-30
draft: false
tags: ["traefik"]
cover_image: ""
canonical_url: false
---
#### 
https://doc.traefik.io/traefik/getting-started/quick-start/

入门相关网址：https://docs.traefik.cn/basics

#### Launch Traefik With the Docker Provider
Create a docker-compose.yml file where you will define a reverse-proxy service that uses the official Traefik image:
```
version: '3'

services:
  reverse-proxy:
    # The official v2 Traefik docker image
    image: traefik:v2.11
    # Enables the web UI and tells Traefik to listen to docker
    command: --api.insecure=true --providers.docker
    ports:
      # The HTTP port
      - "80:80"
      # The Web UI (enabled by --api.insecure=true)
      - "8080:8080"
    volumes:
      # So that Traefik can listen to the Docker events
      - /var/run/docker.sock:/var/run/docker.sock
```

#### Start your reverse-proxy with the following command:
```
docker-compose up -d reverse-proxy
```

> V2版本的compose命令为：
```
docker compose up -d reverse-proxy
```
#### 启动
```
mkdir traefikconf
cd traefikconf
touch access.log
touch traefik.log
```
```
docker run -d -p 8080:8080 -p 80:80 \
    -v $PWD/traefik.yml:/etc/traefik/traefik.yml \
    -v $PWD/dynamic_conf.yml:/etc/traefik/dynamic_conf.yml \
    -v $PWD/access.log:/var/traefik/access.log \
    -v $PWD/traefik.log:/var/traefik/traefik.log \
        traefik:v2.11
```

#### 静态配置文件
```
global:
  checkNewVersion: true
  sendAnonymousUsage: true

entryPoints:
  web:
    address: :80

  websecure:
    address: :443

log:
  filePath: /var/traefik/traefik.log

accessLog:
  filePath: /var/traefik/access.log

api:
  insecure: true

providers:
  file:
    filename: /etc/traefik/dynamic_conf.yml
    watch: true
```
> 过滤注释行小技巧：
```
cat traefik.yml |grep -v '#'
```

#### 动态配置文件
```
http:
  routers:
    router1:
      service: service1
      middlewares:
        - "foo-add-prefix"
        - "m-foo-ratelimit"
      rule: "Host(`a.mynet.com`)"
    router2:
      service: service2
      rule: "Host(`b.mynet.com`)"

  middlewares:
    foo-add-prefix:
      addPrefix:
        prefix: "/zabbix"
    m-foo-ratelimit:
      rateLimit:
        average: 10
        burst: 10

  services:
    service1:
      loadBalancer:
        servers:
          - url: "http://10.20.20.114"
    service2:
      loadBalancer:
        servers:
          - url: "http://10.20.20.114/zabbix/"
```

#### 本地的DNS配置
配置hosts
```
10.20.20.107 a.mynet.com
10.20.20.107 b.mynet.com
```

#### 奇怪的报错
```
500 Internal Privoxy Error
Privoxy encountered an error while processing your request:

Could not load template file no-server-data or one of its included components.

Please contact your proxy administrator.

If you are the proxy administrator, please put the required file(s)in the (confdir)/templates directory. The location of the (confdir) directory is specified in the main Privoxy config file. (It's typically the Privoxy install directory).
```
处理方法：
关闭本地代理