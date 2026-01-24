---
title: Ackee搭建
description: Ackee搭建
category: "WEB"
pubDate: 2024-02-23
draft: false
tags: ["ackee"]
cover_image: ""
canonical_url: false
---

#### 官网

[Get started - Ackee Docs (electerious.com)](https://docs.ackee.electerious.com/#/docs/Get%20started#without-docker)

#### 搭建流程

在根目录下创建文件.env

```shell
ACKEE_MONGODB=mongodb://localhost:27017/ackee
ACKEE_USERNAME=username
ACKEE_PASSWORD=password
```

安装依赖：

```sh
yarn install
```

开启mongodb服务后，运行即可：

```sh
yarn start
```

访问页面：
 http://localhost:3000

登录后配置new domain
最终生成js如下

```js
<script async src="http://localhost:3000/tracker.js" data-ackee-server="http://localhost:3000" data-ackee-domain-id="d076d06f-08ae-43b5-8ef5-ad9d0918ad3e"></script>
```

#### API

需要学习GraphQL
[API - Ackee Docs (electerious.com)](https://docs.ackee.electerious.com/#/docs/API)
