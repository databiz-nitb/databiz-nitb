import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(__dirname, 'data');

function ensureDataFile(fileName, initial = []) {
  const p = path.join(dataDir, fileName);
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, JSON.stringify(initial, null, 2));
  }
  return p;
}

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const magazinesFile = ensureDataFile('magazines.json', [
  { id: nanoid(), title: 'Week 1: Launch Issue', url: '#', cover: '', date: new Date().toISOString() }
]);
const podcastsFile = ensureDataFile('podcasts.json', [
  { id: nanoid(), title: 'Episode 1: Data Meets Innovation', url: '#', date: new Date().toISOString() }
]);
const eventsFile = ensureDataFile('events.json', [
  { id: nanoid(), title: 'Kickoff Meetup', location: 'MANIT Bhopal', date: 'TBA' }
]);
const testimonialsFile = ensureDataFile('testimonials.json', [
  { id: nanoid(), name: 'Student Member', quote: 'DataBiz helped me learn by doing.' }
]);
const submissionsFile = ensureDataFile('submissions.json', []);

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
function writeJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}

// Static
app.use(express.static(publicDir));

// Content APIs
app.get('/api/magazines', (req, res) => res.json(readJson(magazinesFile)));
app.get('/api/podcasts', (req, res) => res.json(readJson(podcastsFile)));
app.get('/api/events', (req, res) => res.json(readJson(eventsFile)));
app.get('/api/testimonials', (req, res) => res.json(readJson(testimonialsFile)));

// Submissions
app.post('/api/join', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!email || !name) return res.status(400).json({ error: 'name and email required' });
  const submissions = readJson(submissionsFile);
  const item = { id: nanoid(), type: 'join', name, email, message: message || '', createdAt: new Date().toISOString() };
  submissions.push(item);
  writeJson(submissionsFile, submissions);
  res.json({ ok: true, id: item.id });
});
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!email || !message) return res.status(400).json({ error: 'email and message required' });
  const submissions = readJson(submissionsFile);
  const item = { id: nanoid(), type: 'contact', name: name || '', email, message, createdAt: new Date().toISOString() };
  submissions.push(item);
  writeJson(submissionsFile, submissions);
  res.json({ ok: true, id: item.id });
});

// Live slides via Server-Sent Events
const clients = new Set();
let currentSlides = [
  { id: 's1', title: 'Welcome to DataBiz', link: '#' },
  { id: 's2', title: 'Weekly Magazine Now Live', link: '#' },
  { id: 's3', title: 'Podcast Episode 1 Released', link: '#' }
];
app.get('/api/slides/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  const client = { res };
  clients.add(client);
  res.write(`data: ${JSON.stringify({ slides: currentSlides })}\n\n`);

  req.on('close', () => {
    clients.delete(client);
  });
});

// Endpoint to rotate slides (could be admin-only in future)
app.post('/api/slides/rotate', (req, res) => {
  const first = currentSlides.shift();
  if (first) currentSlides.push(first);
  for (const c of clients) {
    c.res.write(`data: ${JSON.stringify({ slides: currentSlides })}\n\n`);
  }
  res.json({ ok: true, slides: currentSlides });
});

// Fallback to index.html for non-API routes (SPA-style)
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`DataBiz server running on http://localhost:${PORT}`);
});