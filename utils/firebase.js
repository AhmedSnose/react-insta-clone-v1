import {initializeApp , getApps ,getApp} from 'firebase/app'
// import 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBSbd8H3RL6GB9Cb4Bhkp29QmcVv7_2vXE",
  authDomain: "instagram-1f20d.firebaseapp.com",
  projectId: "instagram-1f20d",
  storageBucket: "instagram-1f20d.appspot.com",
  messagingSenderId: "225183725393",
  appId: "1:225183725393:web:a320ab05cba4c881794570"
}


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const sto = getStorage()

// sto ,auth,
export {app, sto, db};

