// StayHealthy backend: user registration, login and profile.
// Users are stored in users.json next to this file.
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8181;
const JWT_SECRET = process.env.JWT_SECRET || 'stayhealthy-secret';
const DB_FILE = path.join(__dirname, 'users.json');

const app = express();
app.use(cors());
app.use(express.json());

const loadUsers = () => (fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) : []);
const saveUsers = (users) => fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
const publicUser = ({ name, email, phone, role }) => ({ name, email, phone, role });

app.get('/', (req, res) => res.send('StayHealthy API is running'));

// Register a new user
app.post('/api/auth/register', async (req, res) => {
  const { name, email, phone, password, role = 'patient' } = req.body || {};
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: 'Name, email, phone and password are required' });
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email' });
  }
  if (!/^[0-9]{10}$/.test(phone)) {
    return res.status(400).json({ error: 'Phone number must be 10 digits' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  const users = loadUsers();
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: 'A user with this email already exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), name, email, phone, role, password: hashed };
  users.push(user);
  saveUsers(users);

  const authtoken = jwt.sign({ user: { id: user.id } }, JWT_SECRET);
  res.json({ authtoken, ...publicUser(user) });
});

// Log in an existing user
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = loadUsers().find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password || '', user.password))) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  const authtoken = jwt.sign({ user: { id: user.id } }, JWT_SECRET);
  res.json({ authtoken, ...publicUser(user) });
});

// Middleware: check the Bearer token
const requireAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  try {
    req.userId = jwt.verify(token, JWT_SECRET).user.id;
    next();
  } catch {
    res.status(401).json({ error: 'Please authenticate using a valid token' });
  }
};

// Get the logged-in user's profile
app.get('/api/auth/user', requireAuth, (req, res) => {
  const user = loadUsers().find((u) => u.id === req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(publicUser(user));
});

// Update the logged-in user's name and phone
app.put('/api/auth/user', requireAuth, (req, res) => {
  const users = loadUsers();
  const user = users.find((u) => u.id === req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (req.body.name) user.name = req.body.name;
  if (req.body.phone) user.phone = req.body.phone;
  saveUsers(users);
  res.json(publicUser(user));
});

app.listen(PORT, () => console.log(`StayHealthy API listening on port ${PORT}`));
