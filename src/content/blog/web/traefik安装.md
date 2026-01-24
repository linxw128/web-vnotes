---
title: traefik安装
description: traefik安装
category: "WEB"
pubDate: 2024-03-11
draft: false
tags: ["github"]
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