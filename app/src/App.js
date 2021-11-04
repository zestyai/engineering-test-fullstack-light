import './App.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropList from './views/PropList';
import { orange } from '@mui/material/colors';
import CssBaseline from "@mui/material/CssBaseline";
import {Provider} from "react-redux";
import store from "./store";
import PropDetails from './views/PropDetails';
import Splash from "./views/Splash";
import FindProps from './views/FindProps';
import {Header} from "./components/Header";

const theme = createTheme({
  status: {
    danger: orange[500]
  },
  h1: {
    fontSize: "24px"
  }
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <div>
          <Header />
          <Router>
            <Switch>
              <Route exact path="/" component={Splash} />
              <Route path="/list" component={PropList} />
              <Route path="/detail/:pid" component={PropDetails} />
              <Route path="/find" component={FindProps} />
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
