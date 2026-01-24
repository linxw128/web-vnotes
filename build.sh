# pnpm run build
tar -czvf dist.tar.gz dist
tar -czvf webhook.tar.gz webhook
git add .
git commit -m "WIP: 临时保存进度"
git push -u origin main