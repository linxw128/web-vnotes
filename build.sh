# pnpm run build
tar -czf dist.tar.gz dist
tar -czf webhook.tar.gz webhook
git add .
git commit -m "WIP: 临时保存进度"
git push -u origin main