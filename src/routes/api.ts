const BASE_URL = `https://api.coinpaprika.com/v1`;
const NICO_API = `https://ohlcv-api.nomadcoders.workers.dev?coinId=`;

export async function fetchCoins() {
	const response = await (await fetch(`${BASE_URL}/coins`)).json();
	return response;
}

export async function fetchCoinInfo(coinId: string) {
	const response = await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
	return response;
}
export async function fetchCoinTickers(coinId: string) {
	const response = await (
		await fetch(`${BASE_URL}/tickers/${coinId}`)
	).json();
	return response;
}

export async function fetchCoinHistory(id: string) {
	const response = await (
		await fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${id}`)
	).json();
	return response;
}
