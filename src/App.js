import { Route, Switch } from 'react-router';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Home from './Home';
import RaidDetails from './RaidDetails';
import RaidHome from './RaidHome';
import { getToken } from './API';
import AppNav from './AppNav';
import RaidProvider from './RaidContext';

function App() {

  //getToken()

  return (
    <div className="App">
      <BrowserRouter>
        <RaidProvider>
          <AppNav/>
          <Switch>
            <Route exact path='/' ><Home/></Route>
            <Route exact path='/fusion-stats' ><Home/></Route>
            <Route exact path='/raid/:id'><RaidHome/></Route>
            <Route exact path='/raiddetails/:id'><RaidDetails/></Route>
          </Switch>
        </RaidProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

