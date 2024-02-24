import * as admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

// Middleware to validate the user
export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // parse bearer token from frontend
  const idToken = req.headers.authorization?.split(" ")[1] || "";

  try {
    // decode Token from frontend
    const decodedToken: DecodedIdToken = await admin
      .auth()
      .verifyIdToken(idToken);

    // pass user data to route
    req.user = decodedToken;

    // if all checks out, continue to route
    next();
  } catch (error) {
    console.log("Invalid User Token: ", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};
