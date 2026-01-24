---
title: docker命令
description: docker命令
category: "WEB"
pubDate: 2024-03-29
draft: false
tags: ["docker"]
cover_image: ""
canonical_url: false
---

#### 启动镜像
需要考虑到东西比较多：
- 网络
- 持久化挂载
    - 配置文件
    - 日志文件

举例：
```
docker run -d -p 8080:8080 -p 80:80 \
    -v $PWD/traefik.yml:/etc/traefik/traefik.yml \
    -v $PWD/dynamic_conf.yml:/etc/traefik/dynamic_conf.yml \
    -v $PWD/access.log:/var/traefik/access.log \
    -v $PWD/traefik.log:/var/traefik/traefik.log \
        traefik:v2.11
```


#### 进入容器
docker exec -it CONTAINER-ID sh

#### 停止容器
docker stop  CONTAINER-ID

#### 启动容器
docker start CONTAINER-ID

#### 重启
docker restart CONTAINER-ID
