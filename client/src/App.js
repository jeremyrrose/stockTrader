import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './screens/Register';
import Login from './screens/Login';
import Account from './screens/Account';
import './App.css';
import './styles/app.scss';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      userName: null
    }
  }

  setUser = (user) => {
    this.setState({
      userId: user.id,
      userName: user.name
    })
  }

  setAccount = () => {

  }

  render() {

    const account = this.state.userId ? (<Account userId={this.state.userId} />) : (<Login setUser={this.setUser} />)

    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/register">
              <Register setUser={this.setUser} />
            </Route>
            <Route path="/account">
              {account}
            </Route>
            <Route path="/">
              <Login setUser={this.setUser} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
