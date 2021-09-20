import { writable } from 'svelte/store';
import { app } from '../firebase';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const authStore = () => {
	const { subscribe, set } = writable(null);
	let auth = typeof window !== 'undefined' ? getAuth(app) : null;
	if (!auth) {
		return { subscribe, login: () => {}, logout: () => {} };
	}

	const login = () => signInWithEmailAndPassword(auth, '', '').then((u) => set(u));

	const logout = () => signOut(auth).then((u) => set(u));

	return { login, subscribe, logout };
};

export default authStore();
