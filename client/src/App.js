import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Film from './Components/Film';
import Form from './Components/Form';

class App extends Component {
	render() {
	    return (
			<BrowserRouter>
				<div className="App">
					<Switch>
						<Route exact path='/' component={Home}/>
						<Route path='/add_film' component={Form} />
						<Route path='/:film_id' component={Film} />
					</Switch>
				</div>
			</BrowserRouter>
	    );
    }
}

export default App;