import express from 'express';
import passport from "passport"


const router = express.Router();

// TODO import db

// The application requests authorization from the user by redirecting the user to the authorization server.
// The authorization server authenticates the user and obtains the user's consent, permitting the application to access protected resources via an API.
// The authorization server redirects the user back to the application with an authorization code, representing the authorization obtained from the user.
// The application exchanges the authorization code for an access token.
// The application uses the access token to request protected resources.

router.get(
    '/oauth2/google',
    passport.authenticate('google', {
        scope: [ 'email', 'profile' ],
    })
)

router.get("oauth2/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("This is the callback route");
});

export default router