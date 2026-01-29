---
title: Astro相关操作
description: Astro相关操作
category: "WEB"
pubDate: 2026-01-29
draft: false
tags: ["astro"]
---
## toc

## Contents
### 添加子content
1 编辑config.ts
```
const platform_blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubdate: z.coerce.date(),
  }),
});
  
export const collections = { blog, private_blog, platform_blog };
```

2 添加 pages 下的文件夹
一般直接复制，然后再改。主要有
``` node
 const posts = await getCollection("platform_blog")
```
``` node
type Props = CollectionEntry<"platform_blog">;
```
``` node
href={`/platform_blog/${post.slug}`}
```

3 添加 content 下的文件夹
并编辑 markdown 文件


### 常见问题
#### Expected "tag" to match "[^\/#\?]+?", but got ""

这是 tag 使用了中文字符，目前还没有解决办法



#### Is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled

需要在 import 的时候，在类型名称前面加上 type，这是 typescript 的新语法


#### 编译后未生成 css 文件

目前暂时用手工的方式找到 tailwind 的 css 文件，放到 public 文件中并引入

#### 日期格式不符
报错：
```
Frontmatter does not match collection schema.
title: Required
description: Required
pubDate: Invalid date
```

解决方法：
1 查看title、pubdate的大小写问题；
2 2026-1-28 => 2026-01-28