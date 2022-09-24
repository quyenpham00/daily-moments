import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAkGpvNMwsxzyssGPApcPBoO18QEEUE4WQ',
  authDomain: 'daily-moments-7b7c8.firebaseapp.com',
  projectId: 'daily-moments-7b7c8',
  storageBucket: 'daily-moments-7b7c8.appspot.com',
  messagingSenderId: '1013120926556',
  appId: '1:1013120926556:web:dda7075e6b282659243799',
}

const app = firebase.initializeApp(firebaseConfig)

export const auth = app.auth()
export const firestore = app.firestore()
export const storage = app.storage()
