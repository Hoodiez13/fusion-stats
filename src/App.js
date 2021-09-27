import { Route, Switch } from 'react-router';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Raids from './Raids';
import RaidDetails from './RaidDetails';
import { getToken } from './API';

function App() {

  //getToken()

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' ><Raids/></Route>
          <Route exact path='/raid/:id'><RaidDetails/></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
