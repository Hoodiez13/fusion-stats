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

//The cracks in our armor grew after years of careless ambition
//Exposing our weaknesses and showing sides of me that I never wanted to see
//Will all this just be an alluring memory
//Ive been chasing for sometime now
//Or can this be, Rebuilt, not better just different


//Im just feeling dark blue
//Sorry, man, its not you
//I guess Im just like this
//Up Late at night when

//I see life in greyscale
//When I see my plans fail
//Sorry Im just like this
//Please dont mind my mindset

//I dont like the things i used to say
//Im not sure why I ever felt that way
//Moving forward is much harder
//when the weight your pulling is a constant reminder of
//how ive been, not where im going
//what ive said, not how im growing