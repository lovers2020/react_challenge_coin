import { MdDarkMode } from "react-icons/md";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { isDarkAtom } from "../atoms";
import { useSetRecoilState } from "recoil";

const Container = styled.div`
	padding: 0px 20px;
	max-width: 580px;
	margin: 0 auto;
`;
const Header = styled.header`
	color: ${(props) => props.theme.accentColor};
	margin: 20px 0px;
	font-size: 48px;
	position: relative;
`;
const BackBtn = styled.button`
	font-size: 32px;
	width: 30px;
	height: 30px;
	background-color: transparent;
	border: none;
	color: ${(props) => props.theme.accentColor};
	cursor: pointer;
`;
const Title = styled.h1`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
	font-size: 32px;

	color: ${(props) => props.theme.textColor};
	text-align: center;
	display: block;
`;
const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: rgba(255, 255, 255, 0.6);
	padding: 10px 20px;
	border-radius: 10px;
`;
const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	span:first-child {
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`;
const Description = styled.p`
	margin: 20px 0px;
	color: ${(props) => props.theme.textColor};
`;
const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0px;
	gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 16px;
	font-weight: 400;
	background-color: rgba(255, 255, 255, 0.6);
	padding: 7px 0px;
	border-radius: 10px;
	color: ${(props) =>
		props.isActive ? props.theme.accentColor : props.theme.textColor};
	a {
		display: block;
	}
`;
interface RouterState {
	state: {
		name: string;
	};
}
interface InfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	contract: string;
	platform: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}

interface PriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}
interface RouteParams {
	coinId: string;
}

function Coin() {
	const { coinId } = useParams() as unknown as RouteParams;
	const { state } = useLocation() as RouterState;
	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

	const priceMatch = useMatch("/:coinId/price");
	const chartMatch = useMatch("/:coinId/chart");
	const navigator = useNavigate();
	const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
		["info", coinId],
		() => fetchCoinInfo(coinId),
		{
			refetchInterval: 900000,
		}
	);
	const { isLoading: pricedataLoading, data: priceData } =
		useQuery<PriceData>(["tickers", coinId], () =>
			fetchCoinTickers(coinId)
		);
	// const [loading, setLoading] = useState(true);
	// const [info, setInfo] = useState<InfoData>();
	// const [priceInfo, setPriceInfo] = useState<PriceData>();

	// useEffect(() => {
	//   (async () => {
	//     const infoData = await (
	//       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
	//     ).json();
	//     const priceData = await (
	//       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
	//     ).json();
	//     setInfo(infoData);
	//     setPriceInfo(priceData);
	//     setLoading(false);
	//   })();
	// }, [coinId]);
	return (
		<Container>
			<Helmet>
				<title>
					{state?.name
						? state.name
						: infoLoading
						? "Loading..."
						: infoData?.name}
				</title>
			</Helmet>
			<Header>
				<Title>
					<BackBtn onClick={() => navigator(-1)}>&larr;</BackBtn>
					<Link to="/">
						{state?.name
							? state.name
							: infoLoading
							? "Loading..."
							: infoData?.name}
					</Link>
					<button
						onClick={toggleDarkAtom}
						style={{
							fontSize: "24px",
							border: "none",
							cursor: "pointer",
							backgroundColor: "transparent",
							width: "24px",
							height: "24px",
						}}
					>
						<MdDarkMode />
					</button>
				</Title>
			</Header>
			{infoLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol</span>
							<span>${infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Price</span>
							<span>
								${priceData?.quotes.USD.price.toFixed(3)}
							</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>
					<Overview>
						<OverviewItem>
							<span>Total Suply</span>
							<span>{priceData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply</span>
							<span>{priceData?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Tabs>
						<Tab isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`} state={{ coinId }}>
								Chart
							</Link>
						</Tab>
						<Tab isActive={priceMatch !== null}>
							<Link to={`/${coinId}/price`} state={{ coinId }}>
								Price
							</Link>
						</Tab>
					</Tabs>
					<Outlet></Outlet>
				</>
			)}
		</Container>
	);
}

export default Coin;
