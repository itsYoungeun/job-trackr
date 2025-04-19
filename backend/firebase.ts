import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccount = require(path.resolve(__dirname, './serviceAccountKey.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://job-trackr-100fc-default-rtdb.firebaseio.com"
  });
}

export const db = admin.firestore();
export const FieldValue = admin.firestore.FieldValue;
export default admin;