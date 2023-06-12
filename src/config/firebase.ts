import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyDcLzb8VdBQM2Wtta0Dg3kvBodnoWEBt5g',
  authDomain: 'mokichat01.firebaseapp.com',
  projectId: 'mokichat01',
  storageBucket: 'mokichat01.appspot.com',
  messagingSenderId: '27997724781',
  appId: '1:27997724781:web:d50759dcea5de4cba99f64'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
