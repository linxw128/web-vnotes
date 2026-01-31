---
title: ssh专题
description: ssh专题
category: WEB
pubDate: 2024-03-10
draft: false
tags:
  - ssh
cover_image: ""
canonical_url: false
---

### 远程主机配置ssh转发

vim /etc/ssh/sshd_config

Gateway_port yes

service sshd restart

service ssh restart

### 2 Mac 开启ssh服务（mac界面操作偏好设置->共享),并创建隧道

ssh -N -R 6666:localhost:22 root@www.vnotes.cn

### 或者autossh -M 2222 -N -R 6666:localhost:22 root@www.vnotes.cn

### 3 从远程主机测试是否能够连接

ssh lxw@localhost -p 6666

### 测试成功后，就可以从任意的联网主机进行连接到Mac了(注意阿里云要加策略开放6666端

口)

ssh lxw@www.vnotes.cn -p 6666```