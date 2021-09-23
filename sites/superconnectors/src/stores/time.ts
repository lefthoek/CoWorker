import { readable, writable } from 'svelte/store';
export const _countdown = () => {
	const { subscribe, set } = writable(0);
	let interval: any;

	const start = () => {
		const currentTime = Number(new Date());
		const deadline = Number(new Date(currentTime + 7 * 60 * 1000));

		interval = setInterval(() => {
			const currentTime = Number(new Date());
			const newTime = deadline - currentTime;
			if (newTime === 0) {
				clearInterval(interval);
				return set(null);
			}
			return set(deadline - currentTime);
		}, 1000);
	};
	const stop = () => {
		if (interval) {
			clearInterval(interval);
			set(null);
		}
	};

	const reset = () => {
		stop();
		start();
	};

	return { subscribe, start, stop, reset };
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
