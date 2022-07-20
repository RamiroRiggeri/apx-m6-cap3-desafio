import * as admin from "firebase-admin";
import * as serviceAccount from "./key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://apx-dwf-m6-firebase-db003-default-rtdb.firebaseio.com",
});

const firestore = admin.firestore();

export { firestore };
