const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are AIYANA, an expert in off-grid living and the Forte Trading ecosystem. Always respond helpfully and warmly.'
        },
        { role: 'user', content: userMessage }
      ]
    });

    res.json({ reply: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error generating response from AIYANA' });
  }
});

app.listen(port, () => {
  console.log(`AIYANA is running on port ${port}`);
});
