import { writable } from 'svelte/store';
import type { Ask, Contestant } from '$types/models';
import { db } from '../firebase';
import { doc, setDoc, updateDoc, increment } from '@firebase/firestore';
import gStore from '$stores/gameData';

export const _gameStore = () => {
	const { update } = writable([]);

	const createRef = ({ team }: Ask) => doc(db, 'asks', team);

	const set = (asks: Ask[]) => {
		for (const ask of asks) {
			setDoc(doc(db, 'asks', ask.team), ask);
		}
	};

	const init = (asks: Ask[]) => {
		const mappedAsks = asks.map((ask: Ask) => {
			return { ...ask, superconnectors: [], points: 0, resolved: false };
		});
		set(mappedAsks);
	};

	const toggleResolve = (ask: Ask) => {
		updateDoc(createRef(ask), {
			resolved: !ask.resolved
		});
	};

	const addSuperconnector = ({ ask, superconnector }: { ask: Ask; superconnector: Contestant }) => {
		const scsSet = new Set(ask.superconnectors);
		const superconnectors = Array.from(scsSet.add(superconnector));
		updateDoc(createRef(ask), {
			...ask,
			superconnectors,
			points: superconnectors.length ? superconnectors.length * 10 : 0
		});
	};

	const removeSuperconnector = ({
		ask,
		superconnector
	}: {
		ask: Ask;
		superconnector: Contestant;
	}) => {
		const superconnectors = ask.superconnectors.filter(
			({ first_name }) => superconnector.first_name !== first_name
		);
		updateDoc(createRef(ask), {
			...ask,
			superconnectors,
			points: superconnectors.length ? superconnectors.length * 10 : 0
		});
	};

	return {
		subscribe: gStore.subscribe,
		toggleResolve,
		addSuperconnector,
		removeSuperconnector,
		init,
		update
	};
};

const gameStore = _gameStore();

export default gameStore;
