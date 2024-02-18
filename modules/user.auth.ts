import * as admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: any; // You can replace `any` with a more specific type for your user object
  }
}
// Middleware to validate the user
export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.headers.authorization);
  const idToken = req.headers.authorization?.split(" ")[1] || "";

  // testing ID token from Gabes acct
  // let idToken =
  // "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlYzU4NjcwNGNhOTZiZDcwMzZiMmYwZDI4MGY5NDlmM2E5NzZkMzgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiR2FicmllbGxlIEdsYXNjbyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLLVF4bXcyZXVOTmRYcXBRV3BlMnp5a2RLUnFLY1JHY19OckpHc3V5Rk9FQWFVPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2hpcmVtZW5vdy1jODU0NiIsImF1ZCI6ImhpcmVtZW5vdy1jODU0NiIsImF1dGhfdGltZSI6MTcwODI5MTE3MywidXNlcl9pZCI6Imp1bkZNQmNJSlNPc1RPTWNsdDhkZ2lGRUNPaTEiLCJzdWIiOiJqdW5GTUJjSUpTT3NUT01jbHQ4ZGdpRkVDT2kxIiwiaWF0IjoxNzA4MjkxMTczLCJleHAiOjE3MDgyOTQ3NzMsImVtYWlsIjoiZ2FiZWdsYXNjb0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwODY2MDY2NDQ1NzI5OTMwNTUwNiJdLCJlbWFpbCI6WyJnYWJlZ2xhc2NvQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.CVR1wOXVlXmSIweLAfjJhizSKuw0MAby7I23rAVkqf2yYYIA_9x2maoDzlkiH-zFuQFHVgLUhQ2WdpLi1rBilGnb-bvDwDeK7UJRZLjujYuzSF2WBYeOcQFN0w_Wm3sa_rVO_ihFJsaMDfZKXnLjJhbkpi9-UmbwAe8hd_eZ_KbymPhWeIcyY-Ya6sqAiizCZEQIYyVtn_jsu6P54pvfMXsTUOVQloyz2ehNUJiWH9x8M_DOpo4-eRo7bubxAk1BV7MIIQzMKJuqDcBzCGd2W0jxWjtZlTpolhOe3nJyGPjuXn-r1pANTPF1qKmv6Kuh_iafhbQOUmMLQLAPavLkUg"

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    console.log("token is valid. User is: ", decodedToken);

    next();
  } catch (error) {
    console.log("Invalid User Token: ", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};
