

// Passport.js API route handler for Next.js
import { createRouter, expressWrapper } from 'next-connect';
import passport from 'passport';
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import type { NextApiRequest, NextApiResponse } from 'next';

// --- Session Setup ---
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    httpOnly: true,
  },
});

// --- Passport Strategies ---
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    // TODO: Replace with your user lookup logic
    if (email === 'test@example.com' && password === 'password') {
      return done(null, { id: 1, email });
    }
    return done(null, false, { message: 'Invalid credentials' });
  }
));

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/api/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    // TODO: Replace with your user lookup/creation logic
    return done(null, { id: profile.id, email: profile.emails?.[0].value });
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj as any));


// --- API Route Handler ---
const handler = createRouter<NextApiRequest, NextApiResponse>();

handler.use(expressWrapper(sessionMiddleware));
handler.use(expressWrapper(passport.initialize()));
handler.use(expressWrapper(passport.session()));

// --- Auth Endpoints ---
handler.post('/api/auth/login', expressWrapper(passport.authenticate('local')), (req, res) => {
  // @ts-ignore
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

handler.get('/api/auth/logout', (req, res) => {
  // @ts-ignore
  if (typeof req.logout === 'function') {
    // @ts-ignore
    req.logout(() => res.redirect('/'));
  } else {
    res.redirect('/');
  }
});

handler.get('/api/auth/google', expressWrapper(passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' })));

handler.get('/api/auth/google/callback',
  expressWrapper(passport.authenticate('google', { failureRedirect: '/login' })),
  (req, res) => {
    res.redirect('/mode');
  }
);

// --- Add /api/auth/user endpoint at the very end, after all other routes ---
handler.get('/api/auth/user', (req, res) => {
  // @ts-ignore
  if (req.user) {
    // @ts-ignore
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});

export default handler.handler();
