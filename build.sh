echo "will auto remove dist, if not do this, the build process will occur out of memory bug"
rm -fr dist
pnpm run build  && echo "构建成功" || { echo "构建失败"; exit 1; }
echo "pack dist"
tar -czf dist.tar.gz dist
tar -czf webhook.tar.gz webhook
echo "commit and push"
git add .
git commit
git push origin main 
echo "finish"