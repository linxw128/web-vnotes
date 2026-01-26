---
title: npm依赖问题
description: npm依赖问题
category: WEB
pubDate: 2024-12-01
tags:
  - payloadcms
featured: true
---

- 删除lock文件，重新pnpm install
- 有些包是通过github下载的，所以普通的npm install还会出现下载错误，导致not found或者undefine的问题，需要使用cnpm