// Prosty serwer Node.js (express) przykładowo do testów push
// npm i express body-parser web-push
const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');

const app = express();
app.use(bodyParser.json());

// Wygeneruj klucze raz z poziomu node:
// const keys = require('web-push').generateVAPIDKeys(); console.log(keys);
// i wstaw PUBLIC/PRIVATE poniżej
const VAPID_PUBLIC = '<PUBLIC_VAPID_KEY>';
const VAPID_PRIVATE = '<PRIVATE_VAPID_KEY>';
webpush.setVapidDetails('mailto:you@example.com', VAPID_PUBLIC, VAPID_PRIVATE);

// prosta pamięć subskrypcji (w produkcji zapisz do bazy)
const subscriptions = [];

app.post('/subscribe', (req, res) => {
  const sub = req.body;
  // optional: waliduj strukturę
  subscriptions.push(sub);
  res.status(201).json({ message: 'subscribed' });
});

app.post('/send', async (req, res) => {
  const payload = JSON.stringify({
    title: req.body.title || 'Test powiadomienia',
    body: req.body.body || 'Treść testu',
    url: req.body.url || '/'
  });
  try {
    const results = await Promise.allSettled(subscriptions.map(s => webpush.sendNotification(s, payload)));
    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Push server on', PORT));
