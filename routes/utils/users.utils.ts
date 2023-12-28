import { collection, getDocs } from "firebase/firestore";
import { User } from "../../types/models/Questions";
import { db } from "../../modules/db";

export const getUsersInfo = async () => {
  const usersInfoRef = collection(db, "users");
  let userList: User[] = [];
  try {
    const usersSnapshot = await getDocs(usersInfoRef);

    usersSnapshot.forEach(doc => {
      const userData = doc.data() as User;
      userList.push(userData);
    });
  } finally {
    return userList;
  }
};

export const matchingUser = async (userId: string) => {
  const users = await getUsersInfo()
  return users.find(user => user.username === userId) as User;
}
