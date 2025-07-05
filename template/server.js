import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 3000;
const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
const enableContactForm = process.env.ENABLE_CONTACT_FORM === 'true';


// --- Path Setup ---
// __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// publicDir points to the generated portfolio output folder
const publicDir = path.resolve(__dirname, '..', '..');

// --- Static File Serving ---
// Serve all static files (HTML, CSS, JS, images, etc.)
app.use(express.static(publicDir));

// Serve index.html at root ("/")
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});


// --- Contact Form API (Discord Webhook) ---
if (enableContactForm) {
  // Warn if webhook URL is missing
  if (!webhookUrl) {
    console.warn('Warning: DISCORD_WEBHOOK_URL not set, but ENABLE_CONTACT_FORM is true.');
  }

  /**
   * POST /api/contact
   * Receives contact form submissions and sends them to a Discord webhook.
   * Expects: { name, email, message } in JSON body.
   */
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      // Send to Discord webhook as an embed
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [
            {
              title: '📬 New Message from Portfolio Contact Form',
              fields: [
                { name: 'Name', value: name },
                { name: 'Email', value: email },
                { name: 'Message', value: message }
              ],
              color: 0x00ff99,
              timestamp: new Date().toISOString()
            }
          ]
        })
      });

      // Success response
      return res.json({ success: true });
    } catch (error) {
      // Log and return error
      console.error('Error sending to Discord:', error);
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  });
} else {
  // If backend is disabled, log for clarity
  console.log('Contact form feature disabled by config.');
}


// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});