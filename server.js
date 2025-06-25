require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route for the main app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Claude API endpoint
app.post('/api/claude', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Claude API key not configured' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', errorText);
      return res.status(response.status).json({ 
        error: 'Failed to get AI response',
        details: errorText
      });
    }

    const data = await response.json();
    const aiResponse = data.content[0].text;
    
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Reframe a Thought app running on port ${PORT}`);
  console.log(`Open your browser and go to: http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});