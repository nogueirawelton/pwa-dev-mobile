import { child, get, ref } from "firebase/database";
import { db } from "../../firebase";
import { parseFirebaseUserData } from "../../utils/parseFirebaseUserData";

export async function getUserRealtimeData(userID: string) {
  const realtimeUserData = await get(child(ref(db), `/users/${userID}`));

  return parseFirebaseUserData(realtimeUserData.val());
}
