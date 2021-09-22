import { db } from '../firebase';
import { collection, query, onSnapshot } from '@firebase/firestore';
import { readable } from 'svelte/store';

export const gameStore = readable([], function start(set) {
	let unsubscribe = () => null;
	if (db) {
		const q = query(collection(db, 'asks'));
		unsubscribe = onSnapshot(q, (snapshot) => {
			let asks = [];

			snapshot.forEach((doc) => {
				asks.push(doc.data());
			});

			return set(asks);
		});
	}
	return function stop() {
		unsubscribe();
	};
});

export default gameStore;
