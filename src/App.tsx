import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import reset from "styled-reset";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
        font-size: 16px;
        font-family: 'Noto Sans';
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.textColor};
    
    }
  * {
    box-sizing:border-box;
  }
  a {
    text-decoration:none;
    color:inherit;
  }
`;
const router = createBrowserRouter([
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

	// basename :  {process.env.PUBLIC_URL}},
]);

function App() {
	const isDark = useRecoilValue(isDarkAtom);
	return (
		<>
			<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
				<GlobalStyle />
				<RouterProvider router={router} />
			</ThemeProvider>
		</>
	);
}

export default App;
