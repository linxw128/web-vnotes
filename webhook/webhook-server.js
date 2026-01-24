const express = require('express');
const { exec } = require('child_process');
const crypto = require('crypto');
const app = express();

// 用于验证的密钥（请设置为环境变量，不要硬编码）
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your_secret_key_here';

app.use(express.json()); // 解析JSON格式的请求体

app.post('/webhook', (req, res) => {
  // 步骤1：验证请求（至关重要！）
  const signature = req.headers['x-hub-signature-256']; // 例如GitHub的签名头
  if (!verifySignature(req.body, signature, WEBHOOK_SECRET)) {
    console.error('Webhook签名验证失败');
    return res.status(403).send('Forbidden');
  }

  console.log('Webhook验证通过，开始构建...');
  res.status(202).send('Accepted'); // 立即响应，避免超时

  // 步骤2：执行构建脚本
  exec('bash deploy.sh', (error, stdout, stderr) => {
    if (error) {
      console.error(`构建执行失败: ${error}`);
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`构建成功完成！\nstdout: ${stdout}`);
  });
});

// 签名验证函数示例（以GitHub为例）
function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(JSON.stringify(payload)).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature || ''));
}

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Webhook服务运行在 http://localhost:${PORT}`);
});