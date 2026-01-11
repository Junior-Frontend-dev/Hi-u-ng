import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'submissions.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '08102011';

interface Submission {
  id: string;
  type: 'bug' | 'idea';
  title: string;
  description: string;
  contact?: string;
  createdAt: string;
}

function ensureDataFile() {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
  }
}

function readSubmissions(): Submission[] {
  ensureDataFile();
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveSubmissions(submissions: Submission[]) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/feedback', (req, res) => {
  const { type, title, description, contact } = req.body;

  if (!type || !title || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (type !== 'bug' && type !== 'idea') {
    return res.status(400).json({ error: 'Invalid type' });
  }

  if (title.length > 150) {
    return res.status(400).json({ error: 'Title too long' });
  }

  if (description.length > 2000) {
    return res.status(400).json({ error: 'Description too long' });
  }

  if (contact && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const submission: Submission = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    type,
    title: title.trim(),
    description: description.trim(),
    contact: contact?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  const submissions = readSubmissions();
  submissions.unshift(submission);
  saveSubmissions(submissions);

  console.log(`[Feedback] ${type}: ${title} (${contact || 'no contact'})`);

  res.json({ success: true, id: submission.id });
});

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    const token = 'admin-token-' + Date.now();
    res.json({ success: true, token });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

app.get('/api/admin/submissions', (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== 'Bearer admin-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const submissions = readSubmissions();
  res.json(submissions);
});

app.delete('/api/admin/submissions/:id', (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== 'Bearer admin-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.params;
  const submissions = readSubmissions();
  const filtered = submissions.filter(s => s.id !== id);
  saveSubmissions(filtered);

  console.log(`[Delete] Submission ${id}`);

  res.json({ success: true });
});

app.get('/api/admin/stats', (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== 'Bearer admin-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const submissions = readSubmissions();
  const stats = {
    total: submissions.length,
    bugs: submissions.filter(s => s.type === 'bug').length,
    ideas: submissions.filter(s => s.type === 'idea').length,
    withContact: submissions.filter(s => s.contact).length,
    recent: submissions.slice(0, 10),
  };

  res.json(stats);
});

ensureDataFile();

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║         Feedback Server Running                ║
╠════════════════════════════════════════════════╣
║  URL: http://localhost:${PORT}                    ║
║  Admin Password: ${ADMIN_PASSWORD}                    ║
║  Data File: ${DATA_FILE} ║
╚════════════════════════════════════════════════╝
  `);
});
