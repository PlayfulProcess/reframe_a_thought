require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// CORS headers (optional if serving frontend from same server)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Route to proxy Claude API calls
app.post('/api/claude', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!process.env.CLAUDE_API_KEY) {
      return res.status(200).json({ 
        fallback: true,
        message: 'Claude API key not configured - using fallback responses'
      });
    }
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });
    if (!claudeResponse.ok) {
      console.error('Claude API error:', claudeResponse.status, claudeResponse.statusText);
      return res.status(200).json({ 
        fallback: true,
        message: 'Claude API call failed - using fallback responses'
      });
    }
    const claudeData = await claudeResponse.json();
    const responseText = claudeData.content[0].text;
    res.json({ 
      response: responseText,
      success: true 
    });
  } catch (error) {
    console.error('Claude API error:', error);
    res.status(200).json({ 
      fallback: true,
      message: 'API call failed - using fallback responses'
    });
  }
});

// Route for the main app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    hasClaudeKey: !!process.env.CLAUDE_API_KEY
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Reframe a Thought app running on port ${PORT}`);
  console.log(`Claude API configured: ${!!process.env.CLAUDE_API_KEY}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});