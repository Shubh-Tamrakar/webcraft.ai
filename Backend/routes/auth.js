import express from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import User from '../models/User.js';

const router = express.Router();

// ─── REGISTER ────────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Sab fields bharo' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password kam se kam 6 characters ka hona chahiye' });
  }

  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ message: 'Yeh email pehle se registered hai' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    // Register ke baad auto login
    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: 'Login failed after register' });
      res.status(201).json({
        message: 'Account ban gaya!',
        user: { id: user._id, name: user.name, email: user.email }
      });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', details: err.message });
  }
});

// ─── LOGIN ───────────────────────────────────────────────────────
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info?.message || 'Login failed' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({
        message: 'Login successful!',
        user: { id: user._id, name: user.name, email: user.email }
      });
    });
  })(req, res, next);
});

// ─── LOGOUT ──────────────────────────────────────────────────────
router.post('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logout ho gaye' });
  });
});

// ─── CURRENT USER ────────────────────────────────────────────────
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email } });
  } else {
    res.status(401).json({ user: null });
  }
});

export default router;