// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// 모든 출처 허용 (CORS)
app.use(cors());

// 모든 요청을 GitHub API로 프록시
app.use('/', createProxyMiddleware({
  target: 'https://api.github.com',
  changeOrigin: true,
  pathRewrite: { '^/': '/' },
  onProxyReq: (proxyReq, req, res) => {
    // Authorization 헤더 그대로 전달 (토큰 포함)
    if (req.headers.authorization) {
      proxyReq.setHeader('Authorization', req.headers.authorization);
    }
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CORS 프록시 실행 중: https://your-proxy.onrender.com`);
});