echo "will auto remove dist, if not do this, the build process will occur out of memory bug"
rm -fr dist
pnpm run build
echo "pack dist"
tar -czf dist.tar.gz dist
tar -czf webhook.tar.gz webhook
git add .
git commit -m "WIP: 临时保存进度"
git push -u origin main
