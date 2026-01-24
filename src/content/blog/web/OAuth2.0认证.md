---
title: OAuth2.0认证
description: OAuth2.0认证
category: "WEB"
pubDate: 2024-02-10
draft: false
tags: ["oauth"]
cover_image: ""
canonical_url: false
---

#### 认证流程
- 1 The application requests authorization from the user by redirecting the user to the authorization server.
- 2 The authorization server authenticates the user and obtains the user's consent, permitting the application to access protected resources via an API.
- 3 The authorization server redirects the user back to the application with an authorization code, representing the authorization obtained from the user.
- 4 The application exchanges the authorization code for an access token.
- 5 The application uses the access token to request protected resources.

中文版：
- 1 应用程序通过将用户重定向到授权服务器来请求用户的授权。
- 2 授权服务器对用户进行身份验证并征得用户同意，允许应用程序通过API访问受保护的资源。
- 3 授权服务器使用授权代码将用户重定向回应用程序，该授权代码表示从用户获得的授权。
- 4 应用程序将授权代码交换为访问令牌。
- 5 应用程序使用访问令牌请求受保护的资源。

#### 相关网址
[passport-oauth2][https://www.passportjs.org/concepts/oauth2/]