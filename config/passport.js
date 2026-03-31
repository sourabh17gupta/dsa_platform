const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/user/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const username = profile.displayName;
        const email = profile.emails?.[0]?.value;

        // 🔹 1. Check if user already exists with googleId
        let user = await User.findOne({ googleId });

        if (user) {
          return done(null, user); // login
        }

        // 🔹 2. Check if user exists with same email
        user = await User.findOne({ email });

        if (!email) {
  return done(new Error("Email not provided by Google"), null);
}

        if (user) {
          // Link Google account
          user.googleId = googleId;
          await user.save();
          return done(null, user);
        }

        // 🔹 3. Create new user
        user = await User.create({
          username,
          email,
          googleId,
        });

        return done(null, user);

      } catch (error) {
        return done(error, null);
      }
    }
  )
);