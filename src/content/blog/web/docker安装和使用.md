---
title: docker安装和使用
description: docker安装和使用
category: "WEB"
pubDate: 2024-03-10
draft: false
tags: ["docker"]
cover_image: ""
canonical_url: false
---
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


#### Install the Compose plugin
https://github.com/docker/compose

For Ubuntu and Debian, run:
```
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

For RPM-based distros, run:
```
sudo yum update
sudo yum install docker-compose-plugin
```

Verify that Docker Compose is installed correctly by checking the version.

```
docker compose version
```

Expected output:
```
Docker Compose version vN.N.N
```


#### The Compose file
The default path for a Compose file is compose.yaml (preferred) or compose.yml that is placed in the working directory. Compose also supports docker-compose.yaml and docker-compose.yml for backwards compatibility of earlier versions. If both files exist, Compose prefers the canonical compose.yaml. 


#### What are the differences between Compose V1 and Compose V2?
https://docs.docker.com/compose/migrate/

Unlike Compose V1, Compose V2 integrates into the Docker CLI platform and the recommended command-line syntax is docker compose.

The Docker CLI platform provides a consistent and predictable set of options and flags, such as the DOCKER_HOST environment variable or the --context command-line flag.

This change lets you use all of the shared flags on the root docker command. For example, docker --log-level=debug --tls compose up enables debug logging from the Docker Engine as well as ensuring that TLS is used for the connection.