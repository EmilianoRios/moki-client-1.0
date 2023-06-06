import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyAAqmwATunGrEasJbtRWJAkAFmh4__AFy4',
  authDomain: 'mokichat-e59a0.firebaseapp.com',
  projectId: 'mokichat-e59a0',
  storageBucket: 'mokichat-e59a0.appspot.com',
  messagingSenderId: '423440858895',
  appId: '1:423440858895:web:f6606a192d029a7fcc487a'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
