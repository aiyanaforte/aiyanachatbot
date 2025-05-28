const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Serve static frontend from "public" folder
app.use(express.static('public'));

// 🔑 Configure OpenAI with your API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 📥 POST /chat endpoint
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are AIYANA, an expert on off-grid living and the Forte Trading ecosystem.' },
        { role: 'user', content: message }
      ],
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// 🚀 Start the server
app.listen(port, () => {
  console.log(`AIYANA is live at http://localhost:${port}`);
});
