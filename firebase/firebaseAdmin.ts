import * as firebaseAdmin from 'firebase-admin';

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        }),
    });
}

export default firebaseAdmin;