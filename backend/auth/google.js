const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Load Google credentials from environment variables
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; 
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: '/meeting/google/callback', // Redirect after successful authentication
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'], // Requesting access to user's Google Calendar
  accessType: 'offline', // This ensures the refresh token is included for long-term access
  prompt: 'consent', // Force consent every time to ensure refresh token is returned
},
function(accessToken, refreshToken, profile, done) {
  // You can store profile info, access tokens, and refresh tokens in your DB
  profile.accessToken = accessToken;
  profile.refreshToken = refreshToken;

  // Example: Store user profile and tokens in the session
  return done(null, profile);
}));

// Store user info in the session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

