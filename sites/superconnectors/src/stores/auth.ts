import { writable } from 'svelte/store';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from '@firebase/auth';

const authStore = () => {
	const { subscribe, set } = writable(null);
	if (!auth) {
		return { subscribe, login: () => {}, logout: () => {} };
	}

	const login = ({ email, password }: { email: string; password: string }) =>
		signInWithEmailAndPassword(auth, email, password).then((u) => set(u));

	const logout = () => signOut(auth).then((u) => set(u));

	return { login, subscribe, logout };
};

export default authStore();
