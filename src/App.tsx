import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Outlet } from "react-router-dom";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import reset from "styled-reset";

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
function App() {
	const isDark = useRecoilValue(isDarkAtom);
	return (
		<>
			<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
				<GlobalStyle />
				<Outlet />
			</ThemeProvider>
		</>
	);
}

export default App;
