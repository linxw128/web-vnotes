const express = require('express');
const { exec } = require('child_process');
const crypto = require('crypto');
const app = express();

let encoder = new TextEncoder();

// 用于验证的密钥（请设置为环境变量，不要硬编码）
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your_secret_key_here';

app.use(express.json()); // 解析JSON格式的请求体

app.post('/webhook', (req, res) => {
  console.log((new Date()).toLocaleString())
  // 步骤1：验证请求（至关重要！）
  const signature = req.headers['x-hub-signature-256']; // 例如GitHub的签名头
  if (!verifySignature(WEBHOOK_SECRET, signature, req.body)) {
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

async function verifySignature(secret, signature, payload) {
    let sigHex = signature;

    let algorithm = { name: "HMAC", hash: { name: 'SHA-256' } };

    let keyBytes = encoder.encode(secret);
    let extractable = false;
    let key = await crypto.subtle.importKey(
        "raw",
        keyBytes,
        algorithm,
        extractable,
        [ "sign", "verify" ],
    );

    let sigBytes = hexToBytes(sigHex);
    let dataBytes = encoder.encode(payload);
    let equal = await crypto.subtle.verify(
        algorithm.name,
        key,
        sigBytes,
        dataBytes,
    );

    return equal;
}

function hexToBytes(hex) {
    let len = hex.length / 2;
    let bytes = new Uint8Array(len);

    let index = 0;
    for (let i = 0; i < hex.length; i += 2) {
        let c = hex.slice(i, i + 2);
        let b = parseInt(c, 16);
        bytes[index] = b;
        index += 1;
    }

    return bytes;
}

// 签名验证函数示例（以GitHub为例） deepseek generate
// function verifySignature(payload, signature, secret) {
//   const hmac = crypto.createHmac('sha256', secret);
//   const digest = 'sha256=' + hmac.update(JSON.stringify(payload)).digest('hex');
//   return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature || ''));
// }

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Webhook服务运行在 http://localhost:${PORT}`);
});