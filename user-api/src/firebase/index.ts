import admin from 'firebase-admin'
import path from 'path'

const serviceAccount = require(path.join(process.cwd(), '/src/firebase/serviceAccountKey.json'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'mangatoon-423713.appspot.com'
})
