import { useQuery } from "react-query";
import { fetchCoinTickers } from "./api";
import { PriceData } from "./Coin";
import { ChartProps } from "./Chart";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const PriceContainer = styled.div`
	background-color: rgba(255, 255, 255, 0.6);
	border-radius: 10px;
	padding: 2rem;
`;
const PriceTitle = styled.div`
	margin: 0.5rem 0;
`;
export default function Price() {
	const { state } = useLocation() as ChartProps;
	const { data, isLoading } = useQuery<PriceData>(
		["tickers", state.coinId],
		() => fetchCoinTickers(state.coinId)
	);
	console.log(data);
	return (
		<>
			<PriceContainer>
				<PriceTitle>
					Current Price : {data?.quotes.USD.price.toFixed(3)}
				</PriceTitle>
				<PriceTitle>
					15m ago : {data?.quotes.USD.percent_change_15m}%
				</PriceTitle>
				<PriceTitle>
					30m ago : {data?.quotes.USD.percent_change_30m}%
				</PriceTitle>
				<PriceTitle>
					1h ago : {data?.quotes.USD.percent_change_1h}%
				</PriceTitle>
				<PriceTitle>
					6h ago : {data?.quotes.USD.percent_change_6h}%
				</PriceTitle>
				<PriceTitle>
					12h ago : {data?.quotes.USD.percent_change_12h}%
				</PriceTitle>
				<PriceTitle>
					24h ago : {data?.quotes.USD.percent_change_24h}%
				</PriceTitle>
			</PriceContainer>
		</>
	);
}
