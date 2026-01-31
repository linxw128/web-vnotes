---
title: npm依赖问题
description: npm依赖问题
category: WEB
pubDate: 2024-12-01
tags:
  - payloadcms
featured: true
---
#### 改源
```
npm --registry=http://registry.npmmirror.com/
```


- 没有配置源，使用 npm config set
    
- 权限不够，windows下要把文件移动到非User目录下， 且最好使用管理员权限打开terminal
    
- 未配置python环境，因为有些包会使用到python脚本
    
- 缓存问题，使用
    

npm cache clean --force

清除缓存

或者删掉module文件夹

rm -fr node_modules

- 些包的下载写在js脚本里面，因此不是通过npm依赖管理的方式安装，就会出现拉镜像被墙的问题，需要单独的npm install xxx安装包，尤其像electron这样的大的依赖包[https://www.jianshu.com/p/28a0305ac187](https://www.jianshu.com/p/28a0305ac187)
    

但npm install electron还是会报错，必须使用

cnpm install electron

原因见包依赖问题

- 包依赖问题，这个问题比较难以排查
    

如在安装electron提示

node-gyp-build: Permission denied

看起来是提示权限不足，但实际上是缺少包，而为什么会缺少包，是因为npm有些插件还是会去外面拉，而不是通过npm config配置的源，这时候无论怎么手动安装都没有用，所以使用终极大招：

cnpm install

> npm和cnpm的区别 [https://juejin.cn/post/7073674617230983175](https://juejin.cn/post/7073674617230983175)
- 
- 
- 删除lock文件，重新pnpm install
- 有些包是通过github下载的，所以普通的npm install还会出现下载错误，导致not found或者undefine的问题，需要使用cnpm