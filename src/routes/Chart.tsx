import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import { useRecoilValue } from "recoil";
import ReactApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";

interface ChartProps {
	state: {
		coinId: string;
	};
}
interface IHistorical {
	time_open: number;
	time_close: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

export default function Chart() {
	const { state } = useLocation() as ChartProps;
	console.log(state);
	const isDark = useRecoilValue(isDarkAtom);
	const { isLoading, data } = useQuery<IHistorical[]>(
		["ohlcv", state.coinId],
		() => fetchCoinHistory(state.coinId)
	);

	console.log(data);
	return (
		<div>
			{isLoading ? (
				"Loading chart..."
			) : (
				<ReactApexChart
					type="candlestick"
					series={
						[
							{
								data: [
									data?.map((price) => {
										return [
											price.time_close,
											price.open,
											price.high,
											price.low,
											price.close,
										];
									}),
								],
							},
						] as unknown as number[]
					}
					options={{
						theme: {
							mode: isDark ? "dark" : "light",
						},
						plotOptions: {
							candlestick: {
								colors: {
									upward: "green",
									downward: "red",
								},
								wick: {
									useFillColor: true,
								},
							},
						},
						chart: {
							height: 300,
							width: 500,
							toolbar: {
								show: false,
							},
							background: "transparent",
						},
						grid: {
							show: false,
						},
						yaxis: {
							show: true,
						},
						xaxis: {
							labels: {
								show: true,
								datetimeUTC: true,
								datetimeFormatter: { day: "dd MMM" },
							},
							axisTicks: {
								show: false,
							},
							axisBorder: {
								show: false,
							},
							type: "datetime",
							categories: data?.map((price) =>
								new Date(price.time_close * 1000).toUTCString()
							),
						},
						fill: {
							type: "gradient",
							gradient: {
								gradientToColors: ["#0be881"],
								stops: [0, 100],
							},
						},
						colors: ["#0fbcf9"],
						tooltip: {
							y: {
								formatter: (value) => `$${value.toFixed(2)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
}
