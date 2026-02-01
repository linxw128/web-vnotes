---
title: express的next和Router
description: express的Router
category: "WEB"
pubDate: 2024-02-21
draft: false
tags: ["express"]
cover_image: ""
canonical_url: false
---

#### express的next方法理解

- next()：下一个(子)中间件
- next('route')：下一个中间件

#### express的Router

```js
// wiki.js - 维基路由模块

const express = require("express");
const router = express.Router();

// 主页路由
router.get("/", (req, res) => {
  res.send("维基主页");
});

// “关于页面”路由
router.get("/about", (req, res) => {
  res.send("关于此维基");
});

module.exports = router;
```

```js
const wiki = require("./wiki.js");
// ...
app.use("/wiki", wiki);
```

这时 `wiki` 模块中定义的两个路由就可以从 `/wiki/` 和 `/wiki/about/` 访问了。
