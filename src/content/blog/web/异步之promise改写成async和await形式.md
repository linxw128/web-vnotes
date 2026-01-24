---
title: 异步之promise改写成async和await形式
description: 异步之promise改写成async和await形式
category: "web"
pubDate: 2024-02-17
draft: false
tags: ['promise','async']
cover_image: ""
canonical_url: false
---

常见fetch用法如下：

```js
  fetch(url).then(response => {
    return response.json()
  }).then(res => {
    console.log(res)
  })
```

把以上promis形式改成async和await形式

```js
const fetchAPI = async () => {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
  }

  fetchAPI()
```

添加异常处理

```js
  const fetchAPI = async () => {
    const response = await fetch(url)
    if(response.status===200){
        const data = await response.json()
        console.log(data)
    }else{
    console.log('请求异常')
    }
  }

  fetchAPI()
```

加上try/catch

```js
  const fetchAPI = async () => {
    try {
      const response = await fetch(url)
      if (response.status === 200) {
        const data = await response.json()
        console.log(data)
      } else {
        console.log('请求异常')
      }
    } catch (err) {
      console.log(err)
    }
  }
  fetchAPI()
```
