import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './firebase-config';
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
