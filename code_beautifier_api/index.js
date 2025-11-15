const express = require('express');
const app = express();

app.use(express.json());

// 健康检查
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Simple Code Analyzer',
    message: '服务正常运行中' 
  });
});

// 极简代码分析（不依赖prettier，快速响应）
app.post('/beautify', (req, res) => {
  try {
    const { code, language = 'text' } = req.body;

    if (typeof code !== 'string' || code.trim().length === 0) {
      return res.status(400).json({ 
        error: '请提供有效的代码'
      });
    }
    
    // 极简分析：只统计基础信息
    const stats = {
      length: code.length,
      lines: code.split('\n').length,
      language: language
    };

    // 立即响应，确保在扣子超时前返回
    res.json({
      success: true,
      data: stats,
      message: `分析完成：${stats.lines}行代码，${stats.length}个字符`,
      beautified_result: `\`\`\`${language}\n${code.trim()}\n\`\`\``
    });

  } catch (error) {
    // 快速失败，不拖时间
    res.status(500).json({ 
      error: '处理失败: ' + error.message
    });
  }
});

module.exports = app;