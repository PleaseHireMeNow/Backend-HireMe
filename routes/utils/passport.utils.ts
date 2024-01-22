import passport from "passport";
import passportGoogle from "passport-google-oauth20"
import dotenv from "dotenv"
const GoogleStrategy = passportGoogle.Strategy

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "oauth2/google/redirect",
        },
        (accessToken, refreshToken, profile, done) => {
            // get profile details
            // save in db
        }
    )
)
