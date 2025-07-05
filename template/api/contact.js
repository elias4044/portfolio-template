
/**
 * contact.js
 * Vercel serverless function for handling contact form submissions.
 * This file is only needed for Vercel/Netlify serverless deployments.
 * For local/Express, use express-server.js or server.js instead.
 */

import fetch from 'node-fetch';

// Discord webhook URL from environment
const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

/**
 * Main handler for the serverless function
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract form fields
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Prepare Discord embed payload
    const discordPayload = {
      embeds: [
        {
          title: '📬 New Contact Form Submission',
          fields: [
            { name: 'Name', value: name },
            { name: 'Email', value: email },
            { name: 'Message', value: message }
          ],
          color: 0x00ff99,
          timestamp: new Date().toISOString()
        }
      ]
    };

    // Send to Discord webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload)
    });

    if (!response.ok) {
      throw new Error('Failed to send to Discord');
    }

    // Success response
    res.status(200).json({ success: true });
  } catch (err) {
    // Log and return error
    console.error('Error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
