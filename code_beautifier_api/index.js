const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 健康检查
app.get('/', (req, res) => {
  console.log('Health check received');
  res.json({ 
    status: 'OK', 
    service: 'Code Beautifier API',
    message: '服务正常运行！',
    timestamp: new Date().toISOString()
  });
});

// 代码分析接口
app.post('/analyze', (req, res) => {
  console.log('Analyze request received');
  
  try {
    const { code, language = 'text' } = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ 
        error: '请提供有效的代码',
        success: false 
      });
    }

    // 极简分析逻辑
    const analysis = {
      length: code.length,
      lines: code.split('\n').length,
      language: language
    };

    console.log('Analysis completed:', analysis);

    // 立即响应
    res.json({
      success: true,
      data: analysis,
      message: `分析完成：${analysis.lines}行代码，${analysis.length}个字符`,
      beautified_result: `\`\`\`${language}\n${code.trim()}\n\`\`\``
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false,
      error: '处理失败: ' + error.message 
    });
  }
});

// 关键：启动服务器监听
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📍 Health check: http://localhost:${port}/`);
  console.log(`📍 Analyze API: http://localhost:${port}/analyze`);
});
