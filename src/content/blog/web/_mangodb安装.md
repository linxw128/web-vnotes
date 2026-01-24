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

mongodb安装地址：
```
/opt/homebrew/Cellar/mongodb-community/7.0.2/
```

启动命令：
```
brew services start mongodb/brew/mongodb-community
```

相关配置
```
| Intel Processor | Apple Silicon Processor |  |
| ---- | ---- | ---- |
| [configuration file](https://www.mongodb.com/docs/manual/reference/configuration-options/) | `/usr/local/etc/mongod.conf` | `/opt/homebrew/etc/mongod.conf` |
| [`log directory`](https://www.mongodb.com/docs/manual/reference/configuration-options/#mongodb-setting-systemLog.path) | `/usr/local/var/log/mongodb` | `/opt/homebrew/var/log/mongodb` |
| [`data directory`](https://www.mongodb.com/docs/manual/reference/configuration-options/#mongodb-setting-storage.dbPath) | `/usr/local/var/mongodb` | `/opt/homebrew/var/mongodb` |
```