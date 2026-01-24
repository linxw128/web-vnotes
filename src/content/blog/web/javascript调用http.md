---
title: javascript调用http
description: javascript调用http
category: "WEB"
pubDate: 2024-02-16
draft: false
tags: ['http','javascript']
cover_image: ""
canonical_url: false
---

### ES6中内置http API的做法
### GET
```js
<script>
  // ...

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let authors = data;

      authors.map(function(author) {

      });
    })
</script>
```

含错误处理模块：
```js
<script>
  // ...

  fetch(url)
    .then((response) => {
      // ...
    })
    .then((data) => {
      // ...
    })
    .catch(function(error) {
      console.log(error);
    });

  // ...
</script>
```
#### POST

```js
// ...

const url = 'https://jsonplaceholder.typicode.com/users';

let data = {
  name: 'Sammy'
}

let fetchData = {
  method: 'POST',
  body: JSON.stringify(data),
  headers: new Headers({
    'Content-Type': 'application/json; charset=UTF-8'
  })
}

fetch(url, fetchData)
  .then(function() {
    // Handle response you get from the API
  });

```
或者
```js
const url = 'https://jsonplaceholder.typicode.com/users';

let data = {
  name: 'Sammy'
}

let request = new Request(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: new Headers({
    'Content-Type': 'application/json; charset=UTF-8'
  })
});

fetch(request)
  .then(function() {
    // Handle response you get from the API
  });
```