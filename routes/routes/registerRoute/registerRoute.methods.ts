import { dbv2 } from "./../../../modules/db";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export const createNewUserData = async (decodedToken: DecodedIdToken) => {
  console.log("made it to create new user");

  // * data from decodedToken
  const user_id = decodedToken.user_id;
  const username = decodedToken.name;
  const email = decodedToken.email;
  const picture = decodedToken.picture;

  let userData = {
    user_id,
    email,
    username,
    picture,
    // ! we can add more initialization data here!
  };

  // create user doc in DB with id of user_id & set data
  await dbv2.collection("users").doc(user_id).set(userData);
};
