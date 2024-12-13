import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import RaidDetails from "./RaidDetails";
import RaidHome from "./RaidHome";
import { getToken } from "./API";
import AppNav from "./AppNav";
import RaidProvider from "./RaidContext";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { devStyle } from "./theme";

function App() {
  //getToken();

  return (
    <div className="App">
      <ThemeProvider theme={createTheme(devStyle)}>
        <CssBaseline />
        <BrowserRouter>
          <RaidProvider>
            <AppNav />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/fusion-stats">
                <Home />
              </Route>
              <Route exact path="/raid/:id">
                <RaidHome />
              </Route>
              <Route exact path="/raiddetails/:id">
                <RaidDetails />
              </Route>
            </Switch>
          </RaidProvider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
