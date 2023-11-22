import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { MdDarkMode } from "react-icons/md";

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;
const Header = styled.header`
	color: ${(props) => props.theme.accentColor};
	margin: 20px 0px;
	font-size: 48px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	button {
		position: absolute;
		right: 0;
		top: 15px;
	}
`;
const CoinList = styled.ul``;
const Coin = styled.li`
	display: flex;
	align-items: center;
	background-color: white;
	color: ${(props) => props.theme.textColor};
	padding: 0px 20px;
	margin-bottom: 10px;
	border-radius: 15px;
	a {
		padding: 20px;
		display: block;
		width: 100%;
		transition: color 0.2s ease-in;
	}
	&:hover {
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;
const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
	font-size: 32px;
	color: ${(props) => props.theme.textColor};
	text-align: center;
	display: block;
`;
const Img = styled.img`
	width: 32px;
	height: 32px;
`;

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

	return (
		<Container>
			<Helmet>
				<title>Coin</title>
			</Helmet>
			<Header>
				<Title>Coin</Title>
				<button
					onClick={toggleDarkAtom}
					style={{
						fontSize: "24px",
						border: "none",
						cursor: "pointer",
						backgroundColor: "transparent",
					}}
				>
					<MdDarkMode />
				</button>
			</Header>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinList>
					{data?.slice(0, 100).map((coin) => (
						<Coin key={coin.id}>
							<Img
								src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
							></Img>
							<Link
								to={`/${coin.id}`}
								state={{ name: coin.name }}
							>
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinList>
			)}
		</Container>
	);
}

export default Coins;
