---
title: flex布局父项常见属性
description: flex布局父项常见属性
category: WEB
pubDate: 2026-01-26
draft: false
tags:
  - fle
---
#### flex布局父项常见属性

父元素要增加：
{
    display: flex
}

以下由6个属性是对父元素设置的

- justify-content:设置主轴上的子元素排列方式
- flex-direction:设置主轴的方向
- flex-wrap:设置子元素是否换行N
- align-content:设置侧轴上的子元素的排列方式(多行)
- align-items:设置侧轴上的子元素排列方式(单行)
- flex-flow:复合属性,相当于同时设置了flex-direction和flex-wrap


#### flex布局子项常见属性

- flex子项目占的份数
- align-self控制子项自己在侧轴的排列方式
- order属性定义子项的排列顺序(前后顺序)