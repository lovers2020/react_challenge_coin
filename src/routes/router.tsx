import { createBrowserRouter } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";
import Chart from "./Chart";
import Price from "./Price";
import App from "../App";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "",
				element: <Coins />,
			},
			{
				path: "/:coinId",
				element: <Coin />,
				children: [
					{
						path: "chart",
						element: <Chart />,
					},
					{
						path: "price",
						element: <Price />,
					},
				],
			},
		],
	},
	// basename :  {process.env.PUBLIC_URL}},
]);

export default router;
