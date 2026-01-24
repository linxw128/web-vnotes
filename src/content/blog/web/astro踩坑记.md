---
title: astro踩坑记
description: astro踩坑记
category: "WEB"
pubDate: 2024-02-20
draft: false
tags: ["astro"]
cover_image: ""
canonical_url: false
---

#### Expected "tag" to match "[^\/#\?]+?", but got ""

这是tag使用了中文字符，目前还没有解决办法



#### is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled

需要在import的时候，在类型名称前面加上type，这是typescript的新语法


#### 编译后未生成css文件

目前暂时用手工的方式找到tailwind的css文件，放到public文件中并引入




