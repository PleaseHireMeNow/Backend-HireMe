import * as admin from "firebase-admin"
import { Request, Response, NextFunction } from 'express';

// Middleware to validate the user
export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const idToken = req.headers.authorization && req.headers.authorization.split(' ')[1];

  try {
    // const decodedToken = await admin.auth().verifyIdToken(idToken);
    // req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

