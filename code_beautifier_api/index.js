const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 健康检查
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Code API',
    message: '服务正常运行!',
    timestamp: new Date().toISOString()
  });
});

// 极简代码分析（去掉prettier，确保稳定）
app.post('/analyze', (req, res) => {
  try {
    const { code, language = 'text' } = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: '需要提供代码' });
    }

    // 只做最简单的统计
    const result = {
      success: true,
      length: code.length,
      lines: code.split('\n').length,
      language: language,
      beautified_result: `\`\`\`${language}\n${code.trim()}\n\`\`\``
    };

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: '服务器错误' });
  }
});

// 启动服务器
app.listen(port, '0.0.0.0', () => {
  console.log(`服务器启动在端口 ${port}`);
});
