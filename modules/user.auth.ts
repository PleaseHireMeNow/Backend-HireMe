import * as admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";
import { dbv2 } from "./db";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
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
  // parse bearer token from frontend
  const idToken = req.headers.authorization?.split(" ")[1] || "";

  try {
    // decode Token from frontend
    const decodedToken: DecodedIdToken = await admin
      .auth()
      .verifyIdToken(idToken);
    // pass user data to route
    // ? pass all of this or only necessary????
    req.user = decodedToken;

    // returend user data
    console.log("token is valid. User is: ", decodedToken);

    // * verify new user by checking if they have user in the DB
    // check if uid exists in the DB, if not it's a new user
    const userSnapshot = await dbv2
      .collection("users")
      .doc(decodedToken.uid)
      .get();

    console.log("userSnapshot is : ", userSnapshot.exists);

    if (userSnapshot.exists) {
      console.log("User has data in the database!");
    } else {
      console.log("This is a new user! Create a User in the DB");
      createNewUserData(decodedToken);
    }

    next();
  } catch (error) {
    console.log("Invalid User Token: ", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

const createNewUserData = async (decodedToken: DecodedIdToken) => {
  console.log("made it to create new user");

  const user_id = decodedToken.user_id;
  const username = decodedToken.name;
  const email = decodedToken.email;
  const picture = decodedToken.picture;

  let userData = {
    user_id,
    email,
    username,
    picture,
    // ! we can add more initilization data here!
  };

  await dbv2.collection("users").doc(user_id).set(userData);

  const userSnapshot = await dbv2
    .collection("users")
    .doc(decodedToken.uid)
    .get();

  console.log("userSnapshot is : ", userSnapshot.exists);
};
