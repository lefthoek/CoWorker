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
			return { ...ask, superconnectors: [], resolved: false };
		});
		set(mappedAsks);
	};

	const toggleResolve = (ask: Ask) => {
		updateDoc(createRef(ask), {
			resolved: !ask.resolved
		});
	};
	const changeSummary = ({ ask }: { ask: Ask }) => {
		updateDoc(createRef(ask), {
			summary: ask.summary
		});
	};

	const addSuperconnector = ({ ask, superconnector }: { ask: Ask; superconnector: Contestant }) => {
		const scsSet = new Set(ask.superconnectors);
		const superconnectors = Array.from(scsSet.add(superconnector));
		updateDoc(createRef(ask), {
			...ask,
			superconnectors
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
			({ contestant_id }) => superconnector.contestant_id !== contestant_id
		);
		updateDoc(createRef(ask), {
			...ask,
			superconnectors
		});
	};

	const changePoints = ({
		ask,
		action,
		points: np
	}: {
		ask: Ask;
		action: 'increase' | 'reduce' | 'set';
		points?: number;
	}) => {
		const points = np <= 1 ? 1 : np >= 99 ? 99 : np;
		switch (action) {
			case 'reduce': {
				return updateDoc(createRef(ask), {
					...ask,
					points: increment(-1)
				});
			}
			case 'increase': {
				return updateDoc(createRef(ask), {
					...ask,
					points: increment(1)
				});
			}
			case 'set': {
				return updateDoc(createRef(ask), {
					...ask,
					points
				});
			}
		}
	};
	return {
		subscribe: gStore.subscribe,
		toggleResolve,
		changePoints,
		changeSummary,
		addSuperconnector,
		removeSuperconnector,
		init,
		update
	};
};

const gameStore = _gameStore();

export default gameStore;
