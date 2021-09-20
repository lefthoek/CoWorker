import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './firebase-config';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const app = initializeApp(firebaseConfig);
export const auth = typeof window !== 'undefined' ? getAuth() : null;
export const db = typeof window !== 'undefined' ? getFirestore() : null;
