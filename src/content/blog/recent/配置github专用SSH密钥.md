---
title: 配置github专用SSH密钥
description: 配置github专用SSH密钥
category: WEB
pubDate: 2026-01-25
draft: false
tags:
  - github
---
```

# 1. 生成新的GitHub专用SSH密钥（如果还没有）
ssh-keygen -t ed25519 -C "你的GitHub邮箱" -f ~/.ssh/github_key

# 2. 添加到SSH代理
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/github_key

# 3. 复制公钥
cat ~/.ssh/github_key.pub

# 4. 将公钥添加到GitHub账户的SSH设置中

# 5. 创建SSH配置文件
cat > ~/.ssh/config << 'EOF'
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_key
    IdentitiesOnly yes
EOF

# 6. 测试连接
ssh -T git@github.com
```
