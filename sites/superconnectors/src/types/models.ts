export type SuperConnector = { first_name: string };
export type Contestant = {
	first_name: string;
	last_name: string;
	score: number;
	contestant_id: number;
};
export type Ask = {
	team: string;
	summary: string;
	points: number;
	resolved: boolean;
	superconnectors?: SuperConnector[];
};
