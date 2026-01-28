---
title: docker 操作
description: docker 操作
category: "WEB"
pubDate: 2026-01-28
draft: false
tags: ["docker"]
---
## Toc

## Contents
### 安装
#### Set up Docker's apt repository
https://docs.docker.com/engine/install/ubuntu/

Add Docker's official GPG key:
```
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

Add the repository to Apt sources:
```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

#### To install the latest version, run: 
```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Verify that the Docker Engine installation is successful by running the hello-world image
```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### 源配置
命令行
```
docker pull 镜像名称 -–registry-mirror=国内镜像源地址
```

配置文件
```
{
  "registry-mirrors": ["https://hub-mirror.c.163.com"]
}
```

重启服务
```
sudo systemctl restart docker
```

### 基本常见操作
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
Docker exec -it CONTAINER-ID sh

#### 停止容器
Docker stop  CONTAINER-ID

#### 启动容器
Docker start CONTAINER-ID

#### 重启
Docker restart CONTAINER-ID


### Image 的导出导入
#### 导出
sudo docker images
sudo docker save transdualbind:1.0 -o transdualbind-v1.0.tar 

#### 导出
sudo docker load -i transdualbind-v1.0.tar 

#### 运行
sudo docker run -d -v ~/transappdata:/usr/src/app/transappdata -p 3001:3001 transdualbind:1.0