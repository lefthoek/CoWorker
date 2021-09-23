import { readable, writable } from 'svelte/store';
export const _countdown = () => {
	const { subscribe, set } = writable(0);
	const currentTime = Number(new Date());
	const deadline = Number(new Date(currentTime + 7 * 60 * 1000));
	setInterval(function () {
		const now = new Date().getTime();
		const distance: number = deadline - now;
		set(distance);
	});
	return { subscribe };
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
