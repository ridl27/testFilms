import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Film from './Components/Film';
import Form from './Components/Form';
import { connect } from 'react-redux';
import { getFilms } from './actions/films';

class App extends Component {
	// state = {
	// 	initialFilms: this.props.films,
	// 	films: this.props.films,
	// }
	// componentWillReceiveProps(nextProps) {
	// 	this.setState({
	// 		initialFilms: nextProps.films,
	// 		films: nextProps.films,
	// 	});
	// }

	componentDidMount() {
		this.props.getFilms();
	}
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/add_film' component={Form} />
						<Route path='/:film_id' component={Film} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

const dispatchToProps = (dispatch) => ({
	getFilms: () => dispatch(getFilms())
})

export default connect(null, dispatchToProps)(App);