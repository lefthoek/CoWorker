import { readable, writable } from 'svelte/store';
export const _countdown = () => {
	const { subscribe, set } = writable(0);
	let interval: any;

	const start = () => {
		const currentTime = Number(new Date());
		const deadline = Number(new Date(currentTime + 7 * 60 * 1000));
		setInterval(() => {
			set(deadline);
		}, 1000);
	};

	const reset = () => {
		if (interval) {
			unsubscribe();
		}
		interval = start();
	};

	const unsubscribe = () => {
		clearInterval(interval);
	};

	return { subscribe, unsubscribe, reset };
};

export const countdown = _countdown();

export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});
